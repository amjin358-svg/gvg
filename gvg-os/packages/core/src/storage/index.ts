/**
 * @gvg/core/storage — 檔案儲存抽象層
 */

export type StorageObject = {
  key: string;
  contentType?: string;
  size: number;
  etag?: string;
  updatedAt: string;
  metadata?: Record<string, string>;
};

export type PutObjectInput = {
  key: string;
  body: string | Uint8Array;
  contentType?: string;
  metadata?: Record<string, string>;
};

export interface ObjectStorage {
  put(input: PutObjectInput): Promise<StorageObject>;
  get(key: string): Promise<{ object: StorageObject; body: Uint8Array } | null>;
  delete(key: string): Promise<boolean>;
  list(prefix?: string): Promise<StorageObject[]>;
  exists(key: string): Promise<boolean>;
}

type Stored = {
  object: StorageObject;
  body: Uint8Array;
};

function toBytes(body: string | Uint8Array): Uint8Array {
  if (typeof body === "string") {
    return new TextEncoder().encode(body);
  }
  return body;
}

export class MemoryStorage implements ObjectStorage {
  private readonly objects = new Map<string, Stored>();

  async put(input: PutObjectInput): Promise<StorageObject> {
    const body = toBytes(input.body);
    const object: StorageObject = {
      key: input.key,
      contentType: input.contentType ?? "application/octet-stream",
      size: body.byteLength,
      etag: crypto.randomUUID().slice(0, 8),
      updatedAt: new Date().toISOString(),
      metadata: input.metadata,
    };
    this.objects.set(input.key, { object, body });
    return object;
  }

  async get(
    key: string,
  ): Promise<{ object: StorageObject; body: Uint8Array } | null> {
    const stored = this.objects.get(key);
    if (!stored) return null;
    return { object: stored.object, body: stored.body };
  }

  async delete(key: string): Promise<boolean> {
    return this.objects.delete(key);
  }

  async list(prefix = ""): Promise<StorageObject[]> {
    return Array.from(this.objects.values())
      .map((s) => s.object)
      .filter((o) => o.key.startsWith(prefix))
      .sort((a, b) => a.key.localeCompare(b.key));
  }

  async exists(key: string): Promise<boolean> {
    return this.objects.has(key);
  }
}

const defaultStorage = new MemoryStorage();

export function getStorage(): ObjectStorage {
  return defaultStorage;
}

export async function putObject(input: PutObjectInput): Promise<StorageObject> {
  return defaultStorage.put(input);
}

export async function getObject(key: string) {
  return defaultStorage.get(key);
}

export async function deleteObject(key: string): Promise<boolean> {
  return defaultStorage.delete(key);
}

export async function listObjects(prefix?: string): Promise<StorageObject[]> {
  return defaultStorage.list(prefix);
}
