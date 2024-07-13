/* @minVersion 7.24.4 */

import set from "./set.ts";
import getPrototypeOf from "./getPrototypeOf.ts";

export default function _superPropertySet(
  classArg: any,
  property: string,
  value: any,
  receiver: any,
  isStrict: boolean,
  prototype?: 1,
) {
  return set(
    getPrototypeOf(prototype ? classArg.prototype : classArg),
    property,
    value,
    receiver,
    isStrict,
  );
}
