import getBindingIdentifiers from "../retrievers/getBindingIdentifiers.ts";
import {
  isExpression,
  isExpressionStatement,
  isVariableDeclaration,
  isIfStatement,
  isBlockStatement,
  isEmptyStatement,
} from "../validators/generated/index.ts";
import {
  sequenceExpression,
  assignmentExpression,
  conditionalExpression,
} from "../builders/generated/index.ts";
import cloneNode from "../clone/cloneNode.ts";
import type * as t from "../index.ts";
import { buildUndefinedNode } from "../index.ts";

export type DeclarationInfo = {
  kind: "var";
  id: t.Identifier;
};

export default function gatherSequenceExpressions(
  nodes: ReadonlyArray<t.Node>,
  declars: Array<DeclarationInfo>,
) {
  if (!process.env.BABEL_8_BREAKING) {
    if (arguments[2] instanceof Array) {
      declars = arguments[2];
    }
  }

  const exprs: t.Expression[] = [];
  let ensureLastUndefined = true;

  for (const node of nodes) {
    // if we encounter emptyStatement before a non-emptyStatement
    // we want to disregard that
    if (!isEmptyStatement(node)) {
      ensureLastUndefined = false;
    }

    if (isExpression(node)) {
      exprs.push(node);
    } else if (isExpressionStatement(node)) {
      exprs.push(node.expression);
    } else if (isVariableDeclaration(node)) {
      if (node.kind !== "var") return; // bailed

      for (const declar of node.declarations) {
        const bindings = getBindingIdentifiers(declar);
        for (const key of Object.keys(bindings)) {
          declars.push({
            kind: node.kind,
            id: cloneNode(bindings[key]),
          });
        }

        if (declar.init) {
          exprs.push(assignmentExpression("=", declar.id, declar.init));
        }
      }

      ensureLastUndefined = true;
    } else if (isIfStatement(node)) {
      const consequent = node.consequent
        ? gatherSequenceExpressions([node.consequent], declars)
        : buildUndefinedNode();
      const alternate = node.alternate
        ? gatherSequenceExpressions([node.alternate], declars)
        : buildUndefinedNode();
      if (!consequent || !alternate) return; // bailed

      exprs.push(conditionalExpression(node.test, consequent, alternate));
    } else if (isBlockStatement(node)) {
      const body = gatherSequenceExpressions(node.body, declars);
      if (!body) return; // bailed

      exprs.push(body);
    } else if (isEmptyStatement(node)) {
      // empty statement so ensure the last item is undefined if we're last
      // checks if emptyStatement is first
      if (nodes.indexOf(node) === 0) {
        ensureLastUndefined = true;
      }
    } else {
      // bailed, we can't turn this statement into an expression
      return;
    }
  }

  if (ensureLastUndefined) {
    exprs.push(buildUndefinedNode());
  }

  if (exprs.length === 1) {
    return exprs[0];
  } else {
    return sequenceExpression(exprs);
  }
}
