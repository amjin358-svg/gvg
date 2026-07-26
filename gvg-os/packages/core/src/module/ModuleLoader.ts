/**
 * @gvg/core/module/ModuleLoader
 *
 * Discover → Register → Load → Enable
 * Respects metadata.dependencies topological order.
 */

import { isModuleEnabled } from "../featureFlag/modules";
import {
  createDefaultModuleContext,
  type GvgModule,
  type ModuleContext,
  type ModuleRecord,
} from "./Module";
import { moduleFlagKey } from "./ModuleMetadata";
import {
  createModuleRegistry,
  getModuleRegistry,
  type ModuleRegistry,
} from "./ModuleRegistry";

export type ModuleLoadReport = {
  loaded: string[];
  enabled: string[];
  skipped: string[];
  failed: Array<{ id: string; error: string }>;
};

export type ModuleLoaderOptions = {
  registry?: ModuleRegistry;
  context?: ModuleContext;
  /** When true, only enable modules whose feature flag is on */
  respectFlags?: boolean;
};

export class ModuleLoader {
  readonly registry: ModuleRegistry;
  private readonly context: ModuleContext;
  private readonly respectFlags: boolean;

  constructor(options: ModuleLoaderOptions = {}) {
    this.registry = options.registry ?? getModuleRegistry();
    this.context = options.context ?? createDefaultModuleContext();
    this.respectFlags = options.respectFlags ?? true;
  }

  /** Register one or more modules (idempotent skip if already present). */
  async registerAll(modules: GvgModule[]): Promise<void> {
    for (const mod of modules) {
      if (this.registry.has(mod.metadata.id)) continue;
      this.registry.register(mod);
      await mod.register?.(this.context);
    }
  }

  /**
   * Load + enable modules in dependency order.
   * Missing dependencies cause the dependent module to fail.
   */
  async load(modules?: GvgModule[]): Promise<ModuleLoadReport> {
    if (modules?.length) {
      await this.registerAll(modules);
    }

    const report: ModuleLoadReport = {
      loaded: [],
      enabled: [],
      skipped: [],
      failed: [],
    };

    const ordered = sortModulesByDependencies(this.registry.list());

    for (const mod of ordered) {
      const id = mod.metadata.id;
      try {
        if (this.respectFlags && !this.isFlagEnabled(mod)) {
          this.registry.setStatus(id, "disabled");
          report.skipped.push(id);
          continue;
        }

        for (const dep of mod.metadata.dependencies ?? []) {
          const depRecord = this.registry.getRecord(dep);
          if (!depRecord || depRecord.status === "error") {
            throw new Error(`Missing or failed dependency: ${dep}`);
          }
          if (
            depRecord.status !== "loaded" &&
            depRecord.status !== "enabled"
          ) {
            throw new Error(`Dependency not loaded: ${dep}`);
          }
        }

        await mod.onLoad?.(this.context);
        this.registry.setStatus(id, "loaded");
        report.loaded.push(id);

        await mod.onEnable?.(this.context);
        this.registry.setStatus(id, "enabled");
        report.enabled.push(id);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        this.registry.setStatus(id, "error", message);
        report.failed.push({ id, error: message });
      }
    }

    return report;
  }

  async enable(id: string): Promise<ModuleRecord> {
    const record = this.registry.getRecord(id);
    if (!record) throw new Error(`Unknown module: ${id}`);
    await record.module.onEnable?.(this.context);
    return this.registry.setStatus(id, "enabled");
  }

  async disable(id: string): Promise<ModuleRecord> {
    const record = this.registry.getRecord(id);
    if (!record) throw new Error(`Unknown module: ${id}`);
    await record.module.onDisable?.(this.context);
    return this.registry.setStatus(id, "disabled");
  }

  async unload(id: string): Promise<boolean> {
    const record = this.registry.getRecord(id);
    if (!record) return false;
    await record.module.onUnload?.(this.context);
    return this.registry.unregister(id);
  }

  async unloadAll(): Promise<void> {
    const ids = this.registry
      .list()
      .map((m) => m.metadata.id)
      .reverse();
    for (const id of ids) {
      await this.unload(id);
    }
  }

  private isFlagEnabled(mod: GvgModule): boolean {
    const key = moduleFlagKey(mod.metadata);
    if (key.startsWith("module.")) {
      return isModuleEnabled(mod.metadata.id);
    }
    return isModuleEnabled(mod.metadata.id);
  }
}

/** Kahn topological sort; throws on cycles. */
export function sortModulesByDependencies(modules: GvgModule[]): GvgModule[] {
  const byId = new Map(modules.map((m) => [m.metadata.id, m]));
  const indegree = new Map<string, number>();
  const graph = new Map<string, string[]>();

  for (const mod of modules) {
    const id = mod.metadata.id;
    indegree.set(id, indegree.get(id) ?? 0);
    for (const dep of mod.metadata.dependencies ?? []) {
      if (!byId.has(dep)) {
        // Missing deps are handled at load time; treat as no edge for sort.
        continue;
      }
      const list = graph.get(dep) ?? [];
      list.push(id);
      graph.set(dep, list);
      indegree.set(id, (indegree.get(id) ?? 0) + 1);
    }
  }

  const queue = modules
    .map((m) => m.metadata.id)
    .filter((id) => (indegree.get(id) ?? 0) === 0);
  const ordered: GvgModule[] = [];

  while (queue.length > 0) {
    const id = queue.shift()!;
    const mod = byId.get(id);
    if (mod) ordered.push(mod);
    for (const next of graph.get(id) ?? []) {
      const nextDeg = (indegree.get(next) ?? 0) - 1;
      indegree.set(next, nextDeg);
      if (nextDeg === 0) queue.push(next);
    }
  }

  if (ordered.length !== modules.length) {
    throw new Error("Module dependency cycle detected");
  }

  return ordered;
}

export function createModuleLoader(
  options: ModuleLoaderOptions = {},
): ModuleLoader {
  return new ModuleLoader(options);
}

export function createIsolatedModuleLoader(
  options: Omit<ModuleLoaderOptions, "registry"> = {},
): ModuleLoader {
  return new ModuleLoader({
    ...options,
    registry: createModuleRegistry(),
  });
}
