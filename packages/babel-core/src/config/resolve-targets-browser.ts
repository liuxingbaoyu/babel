import type { ValidatedOptions } from "./validation/options";
import getTargets, {
  type InputTargets,
} from "@babel/helper-compilation-targets";

import type { Targets } from "@babel/helper-compilation-targets";

export function resolveBrowserslistConfigFile(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  browserslistConfigFile: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  configFilePath: string,
): string | void {
  return undefined;
}

export function resolveTargets(
  options: ValidatedOptions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  root: string,
): Targets {
  const optTargets = options.targets;
  let targets: InputTargets;

  if (typeof optTargets === "string" || Array.isArray(optTargets)) {
    targets = { browsers: optTargets };
  }
  if (targets && targets.esmodules) {
    targets = { ...targets, esmodules: "intersect" };
  }

  return getTargets(targets, {
    ignoreBrowserslistConfig: true,
    browserslistEnv: options.browserslistEnv,
  });
}
