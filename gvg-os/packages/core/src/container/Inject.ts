/**
 * @gvg/core/container/Inject
 *
 * Explicit injection metadata (no reflect-metadata required).
 */

import type { InjectionToken } from "./Provider";

const INJECT_DEPS = Symbol.for("gvg.container.injectDeps");

export type InjectableClass<T = unknown> = (new (...args: never[]) => T) & {
  [INJECT_DEPS]?: InjectionToken[];
};

/** Attach constructor dependency tokens to a class. */
export function Injectable(
  ...deps: InjectionToken[]
): <T extends new (...args: never[]) => unknown>(target: T) => T {
  return (target) => {
    (target as InjectableClass)[INJECT_DEPS] = deps;
    return target;
  };
}

/** Read deps registered via @Injectable(...tokens) or defineInject. */
export function getInjectDeps(
  target: InjectableClass | (new (...args: never[]) => unknown),
): InjectionToken[] {
  return (target as InjectableClass)[INJECT_DEPS] ?? [];
}

/** Imperative alternative to the decorator. */
export function defineInject(
  target: InjectableClass | (new (...args: never[]) => unknown),
  deps: InjectionToken[],
): void {
  (target as InjectableClass)[INJECT_DEPS] = [...deps];
}

/**
 * Parameter decorator stub for API familiarity.
 * Prefer `Injectable(TokenA, TokenB)` or `deps` on the provider —
 * TypeScript needs `experimentalDecorators` + emit metadata for true param inject.
 */
export function Inject(
  token: InjectionToken,
): (
  target: object,
  propertyKey: string | symbol | undefined,
  parameterIndex: number,
) => void {
  return (target, _propertyKey, parameterIndex) => {
    const ctor = target as InjectableClass;
    const deps = [...(ctor[INJECT_DEPS] ?? [])];
    deps[parameterIndex] = token;
    ctor[INJECT_DEPS] = deps;
  };
}

export { INJECT_DEPS };
