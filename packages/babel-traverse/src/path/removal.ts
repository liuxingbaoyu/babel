// This file contains methods responsible for removing a node.

import { hooks } from "./lib/removal-hooks";
import { path as pathCache } from "../cache";
import NodePath, { REMOVED, SHOULD_SKIP } from "./index";

export function remove(this: NodePath) {
  this._assertUnremoved();

  this.resync();
  if (!this.opts?.noScope) {
    this._removeFromScope();
  }

  if (this._callRemovalHooks()) {
    this._markRemoved();
    return;
  }

  this.shareCommentsWithSiblings();
  this._remove();
  this._markRemoved();
}

export function _removeFromScope(this: NodePath) {
  const bindingIds = this.getBindingIdentifiers();
  const bindings = [];
  const willRemove = [];

  for (const name of Object.keys(bindingIds)) {
    const binding = this.scope.getBinding(name);
    if (binding != undefined) {
      bindings.push(binding.identifier);
    }
  }

  if (this.isIdentifier() && bindings.includes(this.node)) {
    willRemove.push(this.node.name);
  }

  this.traverse({
    Identifier(p) {
      if (bindings.includes(p.node)) {
        willRemove.push(p.node.name);
      }
    },
  });

  for (const binding of bindings) {
    if (willRemove.includes(binding.name)) {
      this.scope.removeBinding(binding.name);
    } else {
      let scope = this.scope;
      do {
        if (scope.uids[binding.name]) {
          scope.uids[binding.name] = false;
        }
      } while ((scope = scope.parent));
    }
  }
}

export function _callRemovalHooks(this: NodePath) {
  for (const fn of hooks) {
    if (fn(this, this.parentPath)) return true;
  }
}

export function _remove(this: NodePath) {
  if (Array.isArray(this.container)) {
    this.container.splice(this.key as number, 1);
    this.updateSiblingKeys(this.key as number, -1);
  } else {
    this._replaceWith(null);
  }
}

export function _markRemoved(this: NodePath) {
  // this.shouldSkip = true; this.removed = true;
  this._traverseFlags |= SHOULD_SKIP | REMOVED;
  if (this.parent) pathCache.get(this.parent).delete(this.node);
  this.node = null;
}

export function _assertUnremoved(this: NodePath) {
  if (this.removed) {
    throw this.buildCodeFrameError(
      "NodePath has been removed so is read-only.",
    );
  }
}
