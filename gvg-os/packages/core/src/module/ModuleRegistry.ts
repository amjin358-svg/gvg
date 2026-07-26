/**
 * @gvg/core/module/ModuleRegistry
 *
 * In-memory catalog of registered OS modules.
 */

import type { GvgModule, ModuleRecord } from "./Module";
import type { ModuleMetadata, ModuleStatus } from "./ModuleMetadata";

export class ModuleRegistry {
  private readonly modules = new Map<string, ModuleRecord>();

  register(module: GvgModule): ModuleRecord {
    const id = module.metadata.id;
    if (this.modules.has(id)) {
      throw new Error(`Module already registered: ${id}`);
    }
    const record: ModuleRecord = {
      module,
      status: "registered",
    };
    this.modules.set(id, record);
    return record;
  }

  unregister(id: string): boolean {
    return this.modules.delete(id);
  }

  has(id: string): boolean {
    return this.modules.has(id);
  }

  get(id: string): GvgModule | undefined {
    return this.modules.get(id)?.module;
  }

  getRecord(id: string): ModuleRecord | undefined {
    return this.modules.get(id);
  }

  getMetadata(id: string): ModuleMetadata | undefined {
    return this.modules.get(id)?.module.metadata;
  }

  list(): GvgModule[] {
    return Array.from(this.modules.values()).map((r) => r.module);
  }

  listRecords(): ModuleRecord[] {
    return Array.from(this.modules.values());
  }

  listByStatus(status: ModuleStatus): GvgModule[] {
    return this.listRecords()
      .filter((r) => r.status === status)
      .map((r) => r.module);
  }

  setStatus(id: string, status: ModuleStatus, error?: string): ModuleRecord {
    const record = this.modules.get(id);
    if (!record) throw new Error(`Unknown module: ${id}`);
    record.status = status;
    if (error) record.error = error;
    else delete record.error;
    if (status === "loaded") record.loadedAt = new Date().toISOString();
    if (status === "enabled") record.enabledAt = new Date().toISOString();
    return record;
  }

  clear(): void {
    this.modules.clear();
  }
}

let singleton: ModuleRegistry | null = null;

export function getModuleRegistry(): ModuleRegistry {
  if (!singleton) singleton = new ModuleRegistry();
  return singleton;
}

export function resetModuleRegistry(): void {
  singleton?.clear();
  singleton = null;
}

export function createModuleRegistry(): ModuleRegistry {
  return new ModuleRegistry();
}
