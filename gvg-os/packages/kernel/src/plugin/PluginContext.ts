/** @gvg/kernel/plugin/PluginContext */

import type {
  NavigationItem,
  PermissionDefinition,
  PluginManifest,
  RouteDefinition,
} from "./PluginManifest";

export type AppContext = {
  api: unknown;
  auth: unknown;
  events: { emit: (name: string, payload?: unknown) => void };
  ui: { registerSlot: (slot: string, node: unknown) => void };
  config: Record<string, unknown>;
  logger?: { info: (msg: string, meta?: Record<string, unknown>) => void };
};

/** @deprecated use AppContext */
export type PluginContext = AppContext;

/**
 * Canonical GVG plugin interface
 */
export interface GVGPlugin {
  id: string;
  name: string;
  version: string;

  manifest: PluginManifest;

  register(app: AppContext): void;

  routes(): RouteDefinition[];

  navigation(): NavigationItem[];

  permissions(): PermissionDefinition[];

  /** Optional dashboard widgets contributed by the plugin */
  widgets?(): import("./define").DashboardWidget[];

  onInstall?(): Promise<void>;

  onEnable?(): Promise<void>;

  onDisable?(): Promise<void>;

  onUpdate?(fromVersion?: string): Promise<void>;

  onReload?(): Promise<void>;

  onBoot?(): Promise<void>;

  onShutdown?(): Promise<void>;
}

/** @deprecated alias — prefer GVGPlugin */
export type GvgPlugin = GVGPlugin;

export type CreateGVGPluginInput = {
  manifest: PluginManifest;
  routes: RouteDefinition[];
  navigation: NavigationItem[];
  permissions: Array<string | PermissionDefinition>;
  widgets?: import("./define").DashboardWidget[];
  register?: (app: AppContext) => void;
  onInstall?: () => Promise<void>;
  onEnable?: () => Promise<void>;
  onDisable?: () => Promise<void>;
  onUpdate?: (fromVersion?: string) => Promise<void>;
  onReload?: () => Promise<void>;
  onBoot?: () => Promise<void>;
  onShutdown?: () => Promise<void>;
};

/**
 * Pass-through for an already-built plugin object.
 * Prefer `definePlugin` from `./define` for declarative authoring.
 */
export function definePlugin(plugin: GVGPlugin): GVGPlugin {
  return plugin;
}

export function createGVGPlugin(input: CreateGVGPluginInput): GVGPlugin {
  const permissionDefs: PermissionDefinition[] = input.permissions.map((p) =>
    typeof p === "string" ? { key: p } : p,
  );

  const widgets = (input.widgets ?? []).map((w) => ({
    ...w,
    pluginId: w.pluginId ?? input.manifest.id,
  }));

  return {
    id: input.manifest.id,
    name: input.manifest.name,
    version: input.manifest.version,
    manifest: input.manifest,
    register(app) {
      input.register?.(app);
      app.events.emit("plugin.registered", { id: input.manifest.id });
    },
    routes: () => input.routes,
    navigation: () => input.navigation,
    permissions: () => permissionDefs,
    widgets: () => widgets,
    onInstall: input.onInstall,
    onEnable: input.onEnable,
    onDisable: input.onDisable,
    onUpdate: input.onUpdate,
    onReload: input.onReload,
    onBoot: input.onBoot,
    onShutdown: input.onShutdown,
  };
}

export function createDefaultAppContext(
  partial: Partial<AppContext> = {},
): AppContext {
  return {
    api: partial.api ?? {},
    auth: partial.auth ?? {},
    events: partial.events ?? {
      emit(name, payload) {
        void name;
        void payload;
      },
    },
    ui: partial.ui ?? {
      registerSlot() {
        /* no-op */
      },
    },
    config: partial.config ?? {},
    logger: partial.logger,
  };
}
