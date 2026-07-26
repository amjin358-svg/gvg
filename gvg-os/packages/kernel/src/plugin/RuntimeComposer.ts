/**
 * @gvg/kernel/plugin/RuntimeComposer
 *
 * OS composition pipeline (after plugins load):
 *
 *   Boot
 *     ↓
 *   Load Plugins
 *     ↓
 *   Generate Menu
 *     ↓
 *   Generate Routes
 *     ↓
 *   Generate Dashboard
 *     ↓
 *   Inject Permission
 *     ↓
 *   Ready
 */

import type { DashboardWidget } from "./define";
import { resolveNavigation, type NavigationItem } from "./navigation";
import {
  getAllPermissions,
  type PermissionDefinition,
} from "./permissions";
import { resolveRoutes, type RouteDefinition } from "./routes";
import {
  getAllWidgets,
  type PluginRuntimeState,
} from "./PluginRegistry";

export const COMPOSITION_STAGES = [
  "boot",
  "load_plugins",
  "generate_menu",
  "generate_routes",
  "generate_dashboard",
  "inject_permission",
  "ready",
] as const;

export type CompositionStage = (typeof COMPOSITION_STAGES)[number];

export type ComposedShell = {
  menu: NavigationItem[];
  routes: RouteDefinition[];
  dashboard: DashboardWidget[];
  permissions: PermissionDefinition[];
};

export type ComposeOptions = {
  roles?: string[];
  onStage?: (
    stage: CompositionStage,
    detail?: Record<string, unknown>,
  ) => void;
};

/** Generate Menu from plugin navigation contributions. */
export function generateMenu(
  runtime: PluginRuntimeState,
  roles?: string[],
): NavigationItem[] {
  return resolveNavigation(runtime, roles);
}

/** Generate Routes from plugin route contributions. */
export function generateRoutes(
  runtime: PluginRuntimeState,
  roles?: string[],
): RouteDefinition[] {
  return resolveRoutes(runtime, roles);
}

/** Generate Dashboard from plugin widget contributions. */
export function generateDashboard(
  runtime: PluginRuntimeState,
): DashboardWidget[] {
  return getAllWidgets(runtime);
}

/** Inject Permission — merge plugin permission keys into the shell. */
export function injectPermissions(
  runtime: PluginRuntimeState,
): PermissionDefinition[] {
  return getAllPermissions(runtime);
}

/**
 * Run composition stages against a populated plugin runtime.
 * Call after Load Plugins completes.
 */
export function composeRuntime(
  runtime: PluginRuntimeState,
  options: ComposeOptions = {},
): ComposedShell {
  const { onStage, roles } = options;

  onStage?.("generate_menu");
  const menu = generateMenu(runtime, roles);
  onStage?.("generate_menu", { count: menu.length });

  onStage?.("generate_routes");
  const routes = generateRoutes(runtime, roles);
  onStage?.("generate_routes", { count: routes.length });

  onStage?.("generate_dashboard");
  const dashboard = generateDashboard(runtime);
  onStage?.("generate_dashboard", { count: dashboard.length });

  onStage?.("inject_permission");
  const permissions = injectPermissions(runtime);
  onStage?.("inject_permission", { count: permissions.length });

  return { menu, routes, dashboard, permissions };
}

export class RuntimeComposer {
  compose(
    runtime: PluginRuntimeState,
    options: ComposeOptions = {},
  ): ComposedShell {
    return composeRuntime(runtime, options);
  }
}

export function createRuntimeComposer(): RuntimeComposer {
  return new RuntimeComposer();
}
