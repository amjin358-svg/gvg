/**
 * @gvg/core/services/StorageService
 */

import {
  deleteObject,
  getObject,
  getStorage,
  listObjects,
  putObject,
  type ObjectStorage,
  type PutObjectInput,
  type StorageObject,
} from "../storage";

export class StorageService {
  constructor(private readonly store: ObjectStorage = getStorage()) {}

  put(input: PutObjectInput): Promise<StorageObject> {
    return this.store.put(input);
  }

  get(key: string) {
    return this.store.get(key);
  }

  delete(key: string): Promise<boolean> {
    return this.store.delete(key);
  }

  list(prefix?: string): Promise<StorageObject[]> {
    return this.store.list(prefix);
  }

  exists(key: string): Promise<boolean> {
    return this.store.exists(key);
  }

  /** Convenience using default process storage helpers */
  static put = putObject;
  static get = getObject;
  static delete = deleteObject;
  static list = listObjects;
}

export function createStorageService(store?: ObjectStorage): StorageService {
  return new StorageService(store);
}
