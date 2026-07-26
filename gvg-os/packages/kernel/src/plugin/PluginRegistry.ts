/** @gvg/kernel/plugin/PluginRegistry */

import type { NavigationItem } from "./navigation";
import {
  getAllNavigation as getNavigationFromRuntime,
  registerPluginNavigation as registerNavigationIntoRuntime,
} from "./navigation";
import type { PermissionDefinition } from "./permissions";
import {
  getAllPermissions as getPermissionsFromRuntime,
  registerPluginPermissions as registerPermissionsIntoRuntime,
} from "./permissions";
import type { RouteDefinition } from "./routes";
import {
  getAllRoutes as getRoutesFromRuntime,
  registerPluginRoutes as registerRoutesIntoRuntime,
} from "./routes";
import type { GVGPlugin } from "./PluginContext";
import { PluginError } from "../errors/PluginError";

export type PluginRuntimeState = {
  navigation: Map<string, NavigationItem[]>;
  routes: Map<string, RouteDefinition[]>;
  permissions: Map<string, PermissionDefinition[]>;
  widgets: Map<string, import("./define").DashboardWidget[]>;
};

export type RegistryEntry<T = unknown> = {
  id: string;
  kind: "plugin" | "service" | "provider";
  version: string;
  value: T;
};

export class PluginRegistry {
  private readonly plugins = new Map<string, GVGPlugin>();
  private readonly services = new Map<string, RegistryEntry>();
  private runtime: PluginRuntimeState = PluginRegistry.createRuntime();

  static createRuntime(): PluginRuntimeState {
    return {
      navigation: new Map(),
      routes: new Map(),
      permissions: new Map(),
      widgets: new Map(),
    };
  }

  add(plugin: GVGPlugin): void {
    if (this.plugins.has(plugin.id)) {
      throw new PluginError(`Plugin already registered: ${plugin.id}`, {
        pluginId: plugin.id,
        stage: "register",
      });
    }
    this.plugins.set(plugin.id, plugin);
  }

  remove(id: string): boolean {
    this.runtime.navigation.delete(id);
    this.runtime.routes.delete(id);
    this.runtime.permissions.delete(id);
    this.runtime.widgets.delete(id);
    return this.plugins.delete(id);
  }

  get(id: string): GVGPlugin | undefined {
    return this.plugins.get(id);
  }

  list(): GVGPlugin[] {
    return Array.from(this.plugins.values());
  }

  clear(): void {
    this.plugins.clear();
    this.clearRuntime();
  }

  getRuntime(): PluginRuntimeState {
    return this.runtime;
  }

  setRuntime(runtime: PluginRuntimeState): void {
    this.runtime = runtime;
  }

  clearRuntime(): void {
    this.runtime.navigation.clear();
    this.runtime.routes.clear();
    this.runtime.permissions.clear();
    this.runtime.widgets.clear();
  }

  registerNavigation(pluginId: string, items: NavigationItem[]): void {
    registerNavigationIntoRuntime(this.runtime, pluginId, items);
  }

  registerRoutes(pluginId: string, routes: RouteDefinition[]): void {
    registerRoutesIntoRuntime(this.runtime, pluginId, routes);
  }

  registerPermissions(
    pluginId: string,
    permissions: PermissionDefinition[],
  ): void {
    registerPermissionsIntoRuntime(this.runtime, pluginId, permissions);
  }

  registerWidgets(
    pluginId: string,
    widgets: import("./define").DashboardWidget[],
  ): void {
    this.runtime.widgets.set(pluginId, widgets);
  }

  navigation(): NavigationItem[] {
    return Array.from(this.runtime.navigation.values()).flat();
  }

  routes(): RouteDefinition[] {
    return Array.from(this.runtime.routes.values()).flat();
  }

  permissions(): PermissionDefinition[] {
    return getPermissionsFromRuntime(this.runtime);
  }

  widgets(): import("./define").DashboardWidget[] {
    return Array.from(this.runtime.widgets.values())
      .flat()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  registerService<T>(entry: RegistryEntry<T>): void {
    if (this.services.has(entry.id)) {
      throw new PluginError(`Registry duplicate id: ${entry.id}`, {
        pluginId: entry.id,
        stage: "registry",
      });
    }
    this.services.set(entry.id, entry as RegistryEntry);
  }

  resolveService<T = unknown>(id: string): RegistryEntry<T> | undefined {
    return this.services.get(id) as RegistryEntry<T> | undefined;
  }

  listServices(kind?: RegistryEntry["kind"]): RegistryEntry[] {
    const all = Array.from(this.services.values());
    return kind ? all.filter((e) => e.kind === kind) : all;
  }

  clearServices(): void {
    this.services.clear();
  }

  unregisterService(id: string): boolean {
    return this.services.delete(id);
  }
}

/** Functional helpers used by older call sites */
export function createPluginRuntime(): PluginRuntimeState {
  return PluginRegistry.createRuntime();
}

export function registerPluginNavigation(
  runtime: PluginRuntimeState,
  pluginId: string,
  items: NavigationItem[],
): void {
  registerNavigationIntoRuntime(runtime, pluginId, items);
}

export function registerPluginRoutes(
  runtime: PluginRuntimeState,
  pluginId: string,
  routes: RouteDefinition[],
): void {
  registerRoutesIntoRuntime(runtime, pluginId, routes);
}

export function registerPluginPermissions(
  runtime: PluginRuntimeState,
  pluginId: string,
  permissions: PermissionDefinition[],
): void {
  registerPermissionsIntoRuntime(runtime, pluginId, permissions);
}

export function registerPluginWidgets(
  runtime: PluginRuntimeState,
  pluginId: string,
  widgets: import("./define").DashboardWidget[],
): void {
  runtime.widgets.set(pluginId, widgets);
}

export function getAllNavigation(
  runtime: PluginRuntimeState,
): NavigationItem[] {
  return getNavigationFromRuntime(runtime);
}

export function getAllRoutes(runtime: PluginRuntimeState): RouteDefinition[] {
  return getRoutesFromRuntime(runtime);
}

export function getAllPermissions(
  runtime: PluginRuntimeState,
): PermissionDefinition[] {
  return getPermissionsFromRuntime(runtime);
}

export function getAllWidgets(
  runtime: PluginRuntimeState,
): import("./define").DashboardWidget[] {
  return Array.from(runtime.widgets.values())
    .flat()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function clearPluginRuntime(runtime: PluginRuntimeState): void {
  runtime.navigation.clear();
  runtime.routes.clear();
  runtime.permissions.clear();
  runtime.widgets.clear();
}

const defaultRegistry = new PluginRegistry();

export function register<T>(entry: RegistryEntry<T>): void {
  defaultRegistry.registerService(entry);
}

export function unregister(id: string): boolean {
  return defaultRegistry.unregisterService(id);
}

export function resolve<T = unknown>(id: string): RegistryEntry<T> | undefined {
  return defaultRegistry.resolveService<T>(id);
}

export function list(kind?: RegistryEntry["kind"]): RegistryEntry[] {
  return defaultRegistry.listServices(kind);
}

export function clearRegistry(): void {
  defaultRegistry.clearServices();
}
