/**
 * @gvg/core/container/Provider
 *
 * Provider contracts for the DI container.
 */

export type InjectionToken<T = unknown> = string | symbol | (new (...args: never[]) => T);

export type ProviderLifetime = "singleton" | "transient" | "scoped";

export type Factory<T> = (resolve: <U>(token: InjectionToken<U>) => U) => T;

export type ValueProvider<T = unknown> = {
  token: InjectionToken<T>;
  useValue: T;
  lifetime?: ProviderLifetime;
};

export type FactoryProvider<T = unknown> = {
  token: InjectionToken<T>;
  useFactory: Factory<T>;
  lifetime?: ProviderLifetime;
  /** Explicit dependency tokens (resolved before factory) */
  deps?: InjectionToken[];
};

export type ClassProvider<T = unknown> = {
  token: InjectionToken<T>;
  useClass: new (...args: never[]) => T;
  lifetime?: ProviderLifetime;
  deps?: InjectionToken[];
};

export type AliasProvider<T = unknown> = {
  token: InjectionToken<T>;
  useExisting: InjectionToken<T>;
  lifetime?: ProviderLifetime;
};

export type Provider<T = unknown> =
  | ValueProvider<T>
  | FactoryProvider<T>
  | ClassProvider<T>
  | AliasProvider<T>;

export type ProviderRecord<T = unknown> = {
  provider: Provider<T>;
  lifetime: ProviderLifetime;
};

export function isValueProvider(p: Provider): p is ValueProvider {
  return "useValue" in p;
}

export function isFactoryProvider(p: Provider): p is FactoryProvider {
  return "useFactory" in p;
}

export function isClassProvider(p: Provider): p is ClassProvider {
  return "useClass" in p;
}

export function isAliasProvider(p: Provider): p is AliasProvider {
  return "useExisting" in p;
}

export function tokenKey(token: InjectionToken): string {
  if (typeof token === "string") return token;
  if (typeof token === "symbol") return token.toString();
  return `class:${token.name || "Anonymous"}`;
}

/** Create a typed string/symbol token */
export function createToken<T = unknown>(description: string): InjectionToken<T> {
  return Symbol(description) as InjectionToken<T>;
}
