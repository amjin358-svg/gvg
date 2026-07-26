/**
 * @gvg/core/cache — 快取抽象層
 */

export type CacheEntry<T = unknown> = {
  value: T;
  expiresAt?: number;
};

export interface CacheStore {
  get<T = unknown>(key: string): Promise<T | undefined>;
  set<T = unknown>(key: string, value: T, ttlMs?: number): Promise<void>;
  delete(key: string): Promise<boolean>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
}

export class MemoryCache implements CacheStore {
  private readonly store = new Map<string, CacheEntry>();

  async get<T = unknown>(key: string): Promise<T | undefined> {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt != null && entry.expiresAt <= Date.now()) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value as T;
  }

  async set<T = unknown>(key: string, value: T, ttlMs?: number): Promise<void> {
    this.store.set(key, {
      value,
      expiresAt: ttlMs != null ? Date.now() + ttlMs : undefined,
    });
  }

  async delete(key: string): Promise<boolean> {
    return this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }

  async keys(): Promise<string[]> {
    const now = Date.now();
    for (const [key, entry] of this.store) {
      if (entry.expiresAt != null && entry.expiresAt <= now) {
        this.store.delete(key);
      }
    }
    return Array.from(this.store.keys());
  }
}

const defaultCache = new MemoryCache();

export function getCache(): CacheStore {
  return defaultCache;
}

export async function cacheGet<T = unknown>(key: string): Promise<T | undefined> {
  return defaultCache.get<T>(key);
}

export async function cacheSet<T = unknown>(
  key: string,
  value: T,
  ttlMs?: number,
): Promise<void> {
  return defaultCache.set(key, value, ttlMs);
}

export async function cacheDelete(key: string): Promise<boolean> {
  return defaultCache.delete(key);
}

export async function cacheClear(): Promise<void> {
  return defaultCache.clear();
}

export async function cacheRemember<T>(
  key: string,
  ttlMs: number,
  factory: () => Promise<T> | T,
): Promise<T> {
  const hit = await defaultCache.get<T>(key);
  if (hit !== undefined) return hit;
  const value = await factory();
  await defaultCache.set(key, value, ttlMs);
  return value;
}
