/**
 * @gvg/kernel/plugin/PluginContributionRuntime
 *
 * Mutable contribution bag (navigation · routes · permissions · widgets).
 * Distinct from PluginRuntime, which boots filesystem-discovered plugins.
 */

import type { DashboardWidget } from "./define";
import {
  getAllNavigation,
  registerPluginNavigation,
  unregisterPluginNavigation,
} from "./navigation";
import type { NavigationItem } from "./navigation";
import {
  getAllPermissions,
  registerPluginPermissions,
  unregisterPluginPermissions,
} from "./permissions";
import type { PermissionDefinition } from "./permissions";
import {
  clearPluginRuntime,
  createPluginRuntime,
  getAllWidgets,
  registerPluginWidgets,
  type PluginRuntimeState,
} from "./PluginRegistry";
import {
  getAllRoutes,
  registerPluginRoutes,
  unregisterPluginRoutes,
} from "./routes";
import type { RouteDefinition } from "./routes";
import type { PluginEventBus } from "./PluginEvents";
import { createPluginEventBus } from "./PluginEvents";

export type PluginRuntimeSnapshot = {
  navigation: NavigationItem[];
  routes: RouteDefinition[];
  permissions: PermissionDefinition[];
  widgets: DashboardWidget[];
};

export class PluginContributionRuntime {
  private state: PluginRuntimeState;
  readonly events: PluginEventBus;

  constructor(
    state: PluginRuntimeState = createPluginRuntime(),
    events: PluginEventBus = createPluginEventBus(),
  ) {
    this.state = state;
    this.events = events;
  }

  static create(): PluginContributionRuntime {
    return new PluginContributionRuntime();
  }

  getState(): PluginRuntimeState {
    return this.state;
  }

  setState(state: PluginRuntimeState): void {
    this.state = state;
  }

  clear(): void {
    clearPluginRuntime(this.state);
    this.events.clear();
  }

  registerNavigation(pluginId: string, items: NavigationItem[]): void {
    registerPluginNavigation(this.state, pluginId, items);
  }

  unregisterNavigation(pluginId: string): void {
    unregisterPluginNavigation(this.state, pluginId);
  }

  registerRoutes(pluginId: string, routes: RouteDefinition[]): void {
    registerPluginRoutes(this.state, pluginId, routes);
  }

  unregisterRoutes(pluginId: string): void {
    unregisterPluginRoutes(this.state, pluginId);
  }

  registerPermissions(
    pluginId: string,
    permissions: PermissionDefinition[],
  ): void {
    registerPluginPermissions(this.state, pluginId, permissions);
  }

  unregisterPermissions(pluginId: string): void {
    unregisterPluginPermissions(this.state, pluginId);
  }

  registerWidgets(pluginId: string, widgets: DashboardWidget[]): void {
    registerPluginWidgets(this.state, pluginId, widgets);
  }

  snapshot(): PluginRuntimeSnapshot {
    return {
      navigation: getAllNavigation(this.state),
      routes: getAllRoutes(this.state),
      permissions: getAllPermissions(this.state),
      widgets: getAllWidgets(this.state),
    };
  }
}

export function createPluginContributionRuntime(
  state?: PluginRuntimeState,
): PluginContributionRuntime {
  return new PluginContributionRuntime(state);
}
