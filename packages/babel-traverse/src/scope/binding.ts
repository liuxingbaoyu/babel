import type NodePath from "../path/index.ts";
import type * as t from "@babel/types";
import type Scope from "./index.ts";

export type BindingKind =
  | "var" /* var declarator */
  | "let" /* let declarator, class declaration id, catch clause parameters */
  | "const" /* const/using declarator */
  | "module" /* import specifiers */
  | "hoisted" /* function declaration id */
  | "param" /* function declaration parameters */
  | "local" /* function expression id, class expression id */
  | "unknown"; /* export specifiers */
/**
 * This class is responsible for a binding inside of a scope.
 *
 * It tracks the following:
 *
 *  * Node path.
 *  * Amount of times referenced by other nodes.
 *  * Paths to nodes that reassign or modify this binding.
 *  * The kind of binding. (Is it a parameter, declaration etc)
 */

export default class Binding {
  identifier: t.Identifier;
  scope: Scope;
  path: NodePath;
  kind: BindingKind;

  constructor({
    identifier,
    scope,
    path,
    kind,
  }: {
    identifier: t.Identifier;
    scope: Scope;
    path: NodePath;
    kind: BindingKind;
  }) {
    this.identifier = identifier;
    this.scope = scope;
    this.path = path;
    this.kind = kind;

    if ((kind === "var" || kind === "hoisted") && isDeclaredInLoop(path)) {
      this.reassign(path);
    }

    if (!process.env.BABEL_8_BREAKING) {
      // @ts-expect-error Removed in Babel 8
      this.clearValue();
    }
  }

  constantViolations: Array<NodePath> = [];
  constant: boolean = true;

  referencePaths: Array<NodePath> = [];
  referenced: boolean = false;
  references: number = 0;

  /**
   * Register a constant violation with the provided `path`.
   */

  reassign(path: NodePath) {
    this.constant = false;
    if (this.constantViolations.includes(path)) {
      return;
    }
    this.constantViolations.push(path);
  }

  /**
   * Increment the amount of references to this binding.
   */

  reference(path: NodePath) {
    if (this.referencePaths.includes(path)) {
      return;
    }
    this.referenced = true;
    this.references++;
    this.referencePaths.push(path);
  }

  /**
   * Decrement the amount of references to this binding.
   */

  dereference() {
    this.references--;
    this.referenced = !!this.references;
  }
}

if (!process.env.BABEL_8_BREAKING) {
  // @ts-expect-error Removed in Babel 8
  Binding.prototype.deoptValue = function () {
    // @ts-expect-error Removed in Babel 8
    this.clearValue();
    // @ts-expect-error Removed in Babel 8
    this.hasDeoptedValue = true;
  };
  // @ts-expect-error Removed in Babel 8
  Binding.prototype.setValue = function (value) {
    // @ts-expect-error Removed in Babel 8
    if (this.hasDeoptedValue) return;
    // @ts-expect-error Removed in Babel 8
    this.hasValue = true;
    // @ts-expect-error Removed in Babel 8
    this.value = value;
  };
  // @ts-expect-error Removed in Babel 8
  Binding.prototype.clearValue = function () {
    // @ts-expect-error Removed in Babel 8
    this.hasDeoptedValue = false;
    // @ts-expect-error Removed in Babel 8
    this.hasValue = false;
    // @ts-expect-error Removed in Babel 8
    this.value = null;
  };
}

function isDeclaredInLoop(path: NodePath) {
  for (
    let { parentPath, key } = path;
    parentPath;
    { parentPath, key } = parentPath
  ) {
    if (parentPath.isFunctionParent()) return false;
    if (
      parentPath.isWhile() ||
      parentPath.isForXStatement() ||
      (parentPath.isForStatement() && key === "body")
    ) {
      return true;
    }
  }
  return false;
}
