/**
 * @gvg/core/container/Singleton
 *
 * Lazy singleton helpers (standalone + container lifetime support).
 */

export type SingletonFactory<T> = () => T;

const singletons = new Map<string, unknown>();

/** Process-wide lazy singleton by key. */
export function singleton<T>(key: string, factory: SingletonFactory<T>): T {
  if (!singletons.has(key)) {
    singletons.set(key, factory());
  }
  return singletons.get(key) as T;
}

export function hasSingleton(key: string): boolean {
  return singletons.has(key);
}

export function clearSingleton(key: string): boolean {
  return singletons.delete(key);
}

export function clearAllSingletons(): void {
  singletons.clear();
}

/**
 * Memoize a zero-arg factory as a singleton instance.
 * Useful for module-level service accessors.
 */
export function lazySingleton<T>(factory: SingletonFactory<T>): () => T {
  let instance: T | undefined;
  let created = false;
  return () => {
    if (!created) {
      instance = factory();
      created = true;
    }
    return instance as T;
  };
}

/** Mark a provider definition as singleton lifetime. */
export function asSingleton<T extends { lifetime?: string }>(
  provider: T,
): T & { lifetime: "singleton" } {
  return { ...provider, lifetime: "singleton" };
}
