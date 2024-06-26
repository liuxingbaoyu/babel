/* @minVersion 7.0.0-beta.0 */

// Based on https://github.com/WebReflection/babel-plugin-transform-builtin-classes

import getPrototypeOf from "getPrototypeOf";
import setPrototypeOf from "setPrototypeOf";
import isNativeFunction from "isNativeFunction";
import construct from "construct";

export default function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true,
      },
    });

    return setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}
