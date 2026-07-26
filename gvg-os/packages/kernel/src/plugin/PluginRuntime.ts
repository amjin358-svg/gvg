/**
 * @gvg/kernel/plugin/PluginRuntime
 *
 * Discovers manifests under a plugin root, enables each, and tracks contexts.
 */

import { PluginDiscovery } from "./PluginDiscovery";
import { PluginLifecycleManager } from "./PluginLifecycleManager";
import type { PluginRuntimeContext } from "./PluginRuntimeContext";
import { PluginState } from "./PluginState";

export class PluginRuntime {
  private contexts: PluginRuntimeContext[] = [];

  private lifecycle = new PluginLifecycleManager();

  boot(pluginPath: string): void {
    const manifests = PluginDiscovery.discover(pluginPath);

    for (const manifest of manifests) {
      const context: PluginRuntimeContext = {
        manifest,
        state: PluginState.Loaded,
        path: pluginPath,
      };

      this.lifecycle.enable(context);
      this.contexts.push(context);
    }
  }

  plugins(): PluginRuntimeContext[] {
    return this.contexts;
  }
}

export function createPluginRuntimeFacade(): PluginRuntime {
  return new PluginRuntime();
}

export {
  createPluginRuntime,
  clearPluginRuntime,
  registerPluginNavigation,
  registerPluginRoutes,
  registerPluginPermissions,
  registerPluginWidgets,
  getAllNavigation,
  getAllRoutes,
  getAllPermissions,
  getAllWidgets,
  PluginRegistry,
} from "./PluginRegistry";

export type { PluginRuntimeState, RegistryEntry } from "./PluginRegistry";
