/**
 * @gvg/core/services/CacheService
 */

import {
  cacheClear,
  cacheDelete,
  cacheGet,
  cacheRemember,
  cacheSet,
  getCache,
  type CacheStore,
} from "../cache";

export class CacheService {
  constructor(private readonly store: CacheStore = getCache()) {}

  get<T = unknown>(key: string): Promise<T | undefined> {
    return this.store.get<T>(key);
  }

  set<T = unknown>(key: string, value: T, ttlMs?: number): Promise<void> {
    return this.store.set(key, value, ttlMs);
  }

  delete(key: string): Promise<boolean> {
    return this.store.delete(key);
  }

  clear(): Promise<void> {
    return this.store.clear();
  }

  keys(): Promise<string[]> {
    return this.store.keys();
  }

  async remember<T>(
    key: string,
    ttlMs: number,
    factory: () => Promise<T> | T,
  ): Promise<T> {
    const hit = await this.store.get<T>(key);
    if (hit !== undefined) return hit;
    const value = await factory();
    await this.store.set(key, value, ttlMs);
    return value;
  }

  static get = cacheGet;
  static set = cacheSet;
  static delete = cacheDelete;
  static clear = cacheClear;
  static remember = cacheRemember;
}

export function createCacheService(store?: CacheStore): CacheService {
  return new CacheService(store);
}
