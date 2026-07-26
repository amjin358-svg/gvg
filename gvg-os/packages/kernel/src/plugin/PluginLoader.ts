/**
 * @gvg/kernel/plugin/PluginLoader
 *
 * Application Boot
 *   ↓
 * Scan plugins/
 *   ↓
 * Load manifest
 *   ↓
 * Validate
 *   ↓
 * Register
 *   ↓
 * Boot
 */

import { PluginError } from "../errors/PluginError";
import {
  createDefaultAppContext,
  type AppContext,
  type GVGPlugin,
} from "./PluginContext";
import {
  discoverPlugins,
  scanPlugins,
} from "./PluginDiscovery";
import {
  assertValidPlugin,
  loadManifest,
} from "./ManifestValidator";
import type { PluginManifest } from "./PluginManifest";
import {
  createPluginActivationManager,
  type PluginActivationManager,
} from "./PluginActivationManager";
import {
  registerPluginContributions,
  sortPluginsByDependencies,
} from "./PluginLifecycleManager";
import {
  clearPluginRuntime,
  createPluginRuntime,
  PluginRegistry,
  type PluginRuntimeState,
} from "./PluginRegistry";
import {
  composeRuntime,
  type ComposedShell,
  type CompositionStage,
} from "./RuntimeComposer";

export { scanPlugins } from "./PluginDiscovery";
export {
  loadManifest,
  validatePlugin,
  validateManifest,
  assertValidPlugin,
  ManifestValidator,
} from "./ManifestValidator";
export type {
  ManifestValidationIssue,
  ManifestValidationResult,
  PluginValidationIssue,
  PluginValidationResult,
} from "./ManifestValidator";
export {
  PluginLifecycleManager,
  createPluginLifecycleManager,
  registerPluginContributions,
  unregisterPluginContributions,
  sortPluginsByDependencies,
} from "./PluginLifecycleManager";
export {
  PluginActivationManager,
  createPluginActivationManager,
} from "./PluginActivationManager";
export type {
  PluginActivationHooks,
  PluginLifecycleHooks,
} from "./PluginActivationManager";
export type {
  PluginLifecycleState,
  PluginLifecycleRecord,
  PluginLifecycleOp,
} from "./PluginState";
export {
  composeRuntime,
  generateMenu,
  generateRoutes,
  generateDashboard,
  injectPermissions,
  createRuntimeComposer,
  RuntimeComposer,
  COMPOSITION_STAGES,
} from "./RuntimeComposer";
export type {
  ComposedShell,
  CompositionStage,
  ComposeOptions,
} from "./RuntimeComposer";

export type BootStage =
  | "boot"
  | "load_plugins"
  | "generate_menu"
  | "generate_routes"
  | "generate_dashboard"
  | "inject_permission"
  | "ready"
  | "error"
  /** @deprecated use boot */
  | "application_boot"
  /** @deprecated use boot */
  | "start"
  /** @deprecated folded into load_plugins */
  | "scan"
  /** @deprecated folded into load_plugins */
  | "load_manifest"
  /** @deprecated folded into load_plugins */
  | "validate"
  /** @deprecated folded into load_plugins */
  | "register"
  /** @deprecated folded into load_plugins */
  | "boot_plugin"
  /** @deprecated folded into load_plugins */
  | "register_navigation"
  /** @deprecated folded into load_plugins */
  | "register_routes"
  /** @deprecated folded into load_plugins */
  | "register_permissions"
  /** @deprecated folded into load_plugins */
  | "register_widgets";

export type PluginBootRecord = {
  pluginId: string;
  manifest: PluginManifest;
  stage: BootStage;
  error?: string;
};

export type BootReport = {
  stage: BootStage;
  scanned: string[];
  booted: PluginBootRecord[];
  failed: PluginBootRecord[];
  runtime: PluginRuntimeState;
  /** Shell composition after Load Plugins */
  composed: ComposedShell;
};

export type PluginHostOptions = {
  app?: Partial<AppContext>;
  exclude?: string[];
  include?: string[];
  roles?: string[];
  onStage?: (stage: BootStage, detail?: Record<string, unknown>) => void;
  lifecycle?: PluginActivationManager;
};

export function registerPlugin(
  plugin: GVGPlugin,
  runtime: PluginRuntimeState,
): void {
  registerPluginContributions(plugin, runtime);
}

/**
 * Per-plugin pipeline:
 * Load manifest → Validate → Register → Boot
 */
export async function bootPlugin(
  plugin: GVGPlugin,
  runtime: PluginRuntimeState,
  app: AppContext,
  onStage?: PluginHostOptions["onStage"],
  lifecycle?: PluginActivationManager,
): Promise<PluginBootRecord> {
  const manager =
    lifecycle ??
    createPluginActivationManager({
      onTransition(pluginId, state) {
        if (state === "registering") onStage?.("register", { id: pluginId });
        if (state === "booting") onStage?.("boot_plugin", { id: pluginId });
      },
    });

  const record: PluginBootRecord = {
    pluginId: plugin.id,
    manifest: plugin.manifest,
    stage: "load_manifest",
  };

  try {
    onStage?.("load_manifest", {
      id: plugin.id,
      version: plugin.version,
    });
    const manifest = loadManifest(plugin);
    record.manifest = manifest;

    onStage?.("validate", { id: plugin.id });
    record.stage = "validate";
    assertValidPlugin(plugin);

    record.stage = "register";
    const life = await manager.activate(plugin, app, runtime);
    if (life.state !== "ready") {
      record.stage = "error";
      record.error = life.error ?? "lifecycle failed";
      return record;
    }

    record.stage = "ready";
    return record;
  } catch (err) {
    record.stage = "error";
    record.error = err instanceof Error ? err.message : String(err);
    return record;
  }
}

/**
 * Boot → Load Plugins → Generate Menu → Generate Routes →
 * Generate Dashboard → Inject Permission → Ready
 */
export async function startPluginHost(
  plugins: GVGPlugin[],
  options: PluginHostOptions = {},
): Promise<BootReport> {
  const onStage = options.onStage;

  onStage?.("boot");
  onStage?.("application_boot");
  onStage?.("start");

  const runtime = createPluginRuntime();
  const app = createDefaultAppContext(options.app);
  const lifecycle =
    options.lifecycle ??
    createPluginActivationManager({
      onTransition(pluginId, state) {
        if (state === "registering") onStage?.("register", { id: pluginId });
        if (state === "booting") onStage?.("boot_plugin", { id: pluginId });
      },
    });

  onStage?.("load_plugins", { count: plugins.length });
  onStage?.("scan", { count: plugins.length });

  const discovery = discoverPlugins(plugins, {
    include: options.include,
    exclude: options.exclude,
  });
  const scanned = sortPluginsByDependencies(discovery.plugins);
  onStage?.("load_plugins", {
    count: scanned.length,
    scanned: scanned.map((p) => p.id),
    skipped: discovery.skipped,
  });

  const booted: PluginBootRecord[] = [];
  const failed: PluginBootRecord[] = [];

  for (const plugin of scanned) {
    const record = await bootPlugin(plugin, runtime, app, onStage, lifecycle);
    if (record.stage === "ready") booted.push(record);
    else failed.push(record);
  }

  if (failed.length && !booted.length) {
    onStage?.("error", { booted: 0, failed: failed.length });
    return {
      stage: "error",
      scanned: scanned.map((p) => p.id),
      booted,
      failed,
      runtime,
      composed: { menu: [], routes: [], dashboard: [], permissions: [] },
    };
  }

  const composed = composeRuntime(runtime, {
    roles: options.roles,
    onStage(stage: CompositionStage, detail) {
      onStage?.(stage, detail);
    },
  });

  onStage?.("ready", {
    booted: booted.length,
    failed: failed.length,
    menu: composed.menu.length,
    routes: composed.routes.length,
    dashboard: composed.dashboard.length,
    permissions: composed.permissions.length,
  });

  return {
    stage: "ready",
    scanned: scanned.map((p) => p.id),
    booted,
    failed,
    runtime,
    composed,
  };
}

export class PluginLoader {
  private readonly registry = new PluginRegistry();
  private report: BootReport | null = null;
  private lifecycle = createPluginActivationManager();

  catalog(plugins: GVGPlugin[]): this {
    for (const p of scanPlugins(plugins)) {
      if (!this.registry.get(p.id)) this.registry.add(p);
    }
    return this;
  }

  async start(options: PluginHostOptions = {}): Promise<BootReport> {
    this.registry.clearRuntime();
    this.lifecycle = createPluginActivationManager({
      onTransition(pluginId, state) {
        if (state === "registering") options.onStage?.("register", { id: pluginId });
        if (state === "booting") options.onStage?.("boot_plugin", { id: pluginId });
      },
    });
    this.report = await startPluginHost(this.registry.list(), {
      ...options,
      lifecycle: this.lifecycle,
    });
    this.registry.setRuntime(this.report.runtime);
    return this.report;
  }

  getComposed(): ComposedShell | null {
    return this.report?.composed ?? null;
  }

  getLifecycle(): PluginActivationManager {
    return this.lifecycle;
  }

  getReport(): BootReport | null {
    return this.report;
  }

  getRuntime(): PluginRuntimeState {
    return this.registry.getRuntime();
  }

  navigation() {
    return this.registry.navigation();
  }

  routes() {
    return this.registry.routes();
  }

  permissions() {
    return this.registry.permissions();
  }

  widgets() {
    return this.registry.widgets();
  }

  get(id: string): GVGPlugin | undefined {
    return this.registry.get(id);
  }

  list(): GVGPlugin[] {
    return this.registry.list();
  }

  async shutdown(): Promise<void> {
    const ready = this.registry
      .list()
      .filter((p) => this.report?.booted.some((b) => b.pluginId === p.id));
    await this.lifecycle.shutdownAll(ready);
    this.registry.clearRuntime();
    this.report = null;
    this.lifecycle.clear();
  }
}

/** @deprecated alias — prefer PluginLoader */
export class PluginHost extends PluginLoader {}

export function createPluginHost(plugins: GVGPlugin[] = []): PluginHost {
  return new PluginHost().catalog(plugins);
}

export function createPluginLoader(plugins: GVGPlugin[] = []): PluginLoader {
  return new PluginLoader().catalog(plugins);
}

const loaded = new Map<string, GVGPlugin>();
const defaultHost = createPluginHost();

export async function loadPlugin(
  plugin: GVGPlugin,
  app: AppContext,
): Promise<void> {
  if (loaded.has(plugin.id)) {
    throw new PluginError(`Plugin already loaded: ${plugin.id}`, {
      pluginId: plugin.id,
      stage: "boot",
    });
  }

  const runtime = createPluginRuntime();
  const record = await bootPlugin(plugin, runtime, app);
  if (record.stage !== "ready") {
    throw new PluginError(
      `Failed to boot plugin ${plugin.id}: ${record.error ?? record.stage}`,
      { pluginId: plugin.id, stage: record.stage },
    );
  }

  loaded.set(plugin.id, plugin);
  defaultHost.catalog([plugin]);
}

export async function shutdownPlugin(id: string): Promise<boolean> {
  const plugin = loaded.get(id);
  if (!plugin) return false;
  await plugin.onShutdown?.();
  return loaded.delete(id);
}

export function unloadPlugin(id: string): boolean {
  return loaded.delete(id);
}

export function getPlugin(id: string): GVGPlugin | undefined {
  return loaded.get(id);
}

export function listPlugins(): GVGPlugin[] {
  return Array.from(loaded.values());
}

export function clearPlugins(): void {
  loaded.clear();
  clearPluginRuntime(createPluginRuntime());
}
