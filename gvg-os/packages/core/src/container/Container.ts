/**
 * @gvg/core/container/Container
 *
 * Lightweight DI container: register providers → resolve tokens.
 */

import { getInjectDeps } from "./Inject";
import {
  isAliasProvider,
  isClassProvider,
  isFactoryProvider,
  isValueProvider,
  tokenKey,
  type InjectionToken,
  type Provider,
  type ProviderLifetime,
  type ProviderRecord,
} from "./Provider";

export class Container {
  private readonly providers = new Map<string, ProviderRecord>();
  private readonly singletons = new Map<string, unknown>();
  private readonly scoped = new Map<string, unknown>();
  private readonly resolving = new Set<string>();
  private readonly parent?: Container;

  constructor(parent?: Container) {
    this.parent = parent;
  }

  /** Register a provider (last write wins). */
  register<T>(provider: Provider<T>): this {
    const key = tokenKey(provider.token);
    const lifetime: ProviderLifetime = provider.lifetime ?? "singleton";
    this.providers.set(key, { provider, lifetime });
    this.singletons.delete(key);
    this.scoped.delete(key);
    return this;
  }

  registerAll(providers: Provider[]): this {
    for (const provider of providers) this.register(provider);
    return this;
  }

  has(token: InjectionToken): boolean {
    return this.findRecord(token) !== null;
  }

  resolve<T>(token: InjectionToken<T>): T {
    const key = tokenKey(token);
    const found = this.findRecord(token);

    if (!found) {
      if (typeof token === "function") {
        return this.construct(token as new (...args: never[]) => T);
      }
      throw new Error(`No provider for token: ${key}`);
    }

    const { record, owner } = found;

    if (record.lifetime === "singleton") {
      if (owner.singletons.has(key)) {
        return owner.singletons.get(key) as T;
      }
      const instance = this.create(record.provider);
      owner.singletons.set(key, instance);
      return instance as T;
    }

    if (record.lifetime === "scoped") {
      // Scoped instances bind to the resolving container (request scope).
      if (this.scoped.has(key)) {
        return this.scoped.get(key) as T;
      }
      const instance = this.create(record.provider);
      this.scoped.set(key, instance);
      return instance as T;
    }

    return this.create(record.provider) as T;
  }

  /** Try resolve; return undefined if missing. */
  tryResolve<T>(token: InjectionToken<T>): T | undefined {
    try {
      return this.resolve(token);
    } catch {
      return undefined;
    }
  }

  /** Create a child container (shares parent providers; own scoped cache). */
  createChild(): Container {
    return new Container(this);
  }

  /** Clear scoped instances (e.g. end of request). */
  clearScope(): void {
    this.scoped.clear();
  }

  clearSingletons(): void {
    this.singletons.clear();
  }

  clear(): void {
    this.providers.clear();
    this.singletons.clear();
    this.scoped.clear();
    this.resolving.clear();
  }

  listTokens(): string[] {
    const keys = new Set<string>(this.providers.keys());
    if (this.parent) {
      for (const key of this.parent.listTokens()) keys.add(key);
    }
    return Array.from(keys);
  }

  private findRecord(
    token: InjectionToken,
  ): { record: ProviderRecord; owner: Container } | null {
    const key = tokenKey(token);
    const local = this.providers.get(key);
    if (local) return { record: local, owner: this };
    return this.parent?.findRecord(token) ?? null;
  }

  private create<T>(provider: Provider<T>): T {
    const key = tokenKey(provider.token);
    if (this.resolving.has(key)) {
      throw new Error(`Circular dependency detected: ${key}`);
    }
    this.resolving.add(key);
    try {
      if (isValueProvider(provider)) {
        return provider.useValue;
      }
      if (isAliasProvider(provider)) {
        return this.resolve(provider.useExisting);
      }
      if (isFactoryProvider(provider)) {
        if (provider.deps?.length) {
          for (const dep of provider.deps) this.resolve(dep);
        }
        return provider.useFactory((t) => this.resolve(t));
      }
      if (isClassProvider(provider)) {
        return this.construct(provider.useClass, provider.deps);
      }
      throw new Error(`Invalid provider for token: ${key}`);
    } finally {
      this.resolving.delete(key);
    }
  }

  private construct<T>(
    Ctor: new (...args: never[]) => T,
    deps?: InjectionToken[],
  ): T {
    const tokens = deps ?? getInjectDeps(Ctor);
    const args = tokens.map((token) => this.resolve(token)) as never[];
    return new Ctor(...args);
  }
}

let root: Container | null = null;

export function getContainer(): Container {
  if (!root) root = new Container();
  return root;
}

export function setContainer(container: Container | null): void {
  root = container;
}

export function resetContainer(): void {
  root?.clear();
  root = null;
}

export function createContainer(parent?: Container): Container {
  return new Container(parent);
}
