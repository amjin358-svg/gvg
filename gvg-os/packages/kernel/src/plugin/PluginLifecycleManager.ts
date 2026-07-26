/**
 * @gvg/kernel/plugin/PluginLifecycleManager
 *
 * Public status transitions on a PluginRuntimeContext:
 *   enable · disable · unload
 */

import { PluginError } from "../errors/PluginError";
import type { GVGPlugin } from "./PluginContext";
import type { PluginRuntimeState } from "./PluginRegistry";
import { registerPluginNavigation } from "./navigation";
import { registerPluginPermissions } from "./permissions";
import { registerPluginRoutes } from "./routes";
import { registerPluginWidgets } from "./PluginRegistry";
import type { PluginRuntimeContext } from "./PluginRuntimeContext";
import { PluginState } from "./PluginState";

export class PluginLifecycleManager {
  enable(context: PluginRuntimeContext): void {
    context.state = PluginState.Enabled;
    context.loadedAt = new Date();
  }

  disable(context: PluginRuntimeContext): void {
    context.state = PluginState.Disabled;
  }

  unload(context: PluginRuntimeContext): void {
    context.state = PluginState.Unloaded;
  }
}

export function createPluginLifecycleManager(): PluginLifecycleManager {
  return new PluginLifecycleManager();
}

/**
 * Register navigation, routes, permissions, widgets into runtime.
 */
export function registerPluginContributions(
  plugin: GVGPlugin,
  runtime: PluginRuntimeState,
): void {
  registerPluginNavigation(runtime, plugin.id, plugin.navigation());
  registerPluginRoutes(runtime, plugin.id, plugin.routes());
  registerPluginPermissions(runtime, plugin.id, plugin.permissions());
  registerPluginWidgets(runtime, plugin.id, plugin.widgets?.() ?? []);
}

/** Remove a plugin's contributions from runtime (Disable / Reload). */
export function unregisterPluginContributions(
  pluginId: string,
  runtime: PluginRuntimeState,
): void {
  runtime.navigation.delete(pluginId);
  runtime.routes.delete(pluginId);
  runtime.permissions.delete(pluginId);
  runtime.widgets.delete(pluginId);
}

/**
 * Order plugins so dependencies boot before dependents.
 * Throws if a cycle is detected.
 */
export function sortPluginsByDependencies(plugins: GVGPlugin[]): GVGPlugin[] {
  const byId = new Map(plugins.map((p) => [p.id, p]));
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const ordered: GVGPlugin[] = [];

  function visit(id: string): void {
    if (visited.has(id)) return;
    if (visiting.has(id)) {
      throw new PluginError(`Circular plugin dependency involving ${id}`, {
        pluginId: id,
        stage: "register",
      });
    }
    const plugin = byId.get(id);
    if (!plugin) return;

    visiting.add(id);
    for (const dep of plugin.manifest.dependencies ?? []) {
      if (byId.has(dep)) visit(dep);
    }
    visiting.delete(id);
    visited.add(id);
    ordered.push(plugin);
  }

  for (const plugin of plugins) visit(plugin.id);
  return ordered;
}
