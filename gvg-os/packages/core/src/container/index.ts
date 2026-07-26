/**
 * @gvg/core/container — lightweight DI container
 */

export {
  createToken,
  tokenKey,
  isValueProvider,
  isFactoryProvider,
  isClassProvider,
  isAliasProvider,
} from "./Provider";
export type {
  InjectionToken,
  ProviderLifetime,
  Factory,
  ValueProvider,
  FactoryProvider,
  ClassProvider,
  AliasProvider,
  Provider,
  ProviderRecord,
} from "./Provider";

export {
  singleton,
  hasSingleton,
  clearSingleton,
  clearAllSingletons,
  lazySingleton,
  asSingleton,
} from "./Singleton";
export type { SingletonFactory } from "./Singleton";

export {
  Injectable,
  Inject,
  getInjectDeps,
  defineInject,
  INJECT_DEPS,
} from "./Inject";
export type { InjectableClass } from "./Inject";

export {
  Container,
  getContainer,
  setContainer,
  resetContainer,
  createContainer,
} from "./Container";
