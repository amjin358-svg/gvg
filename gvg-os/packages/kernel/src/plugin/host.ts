/**
 * @gvg/kernel/plugin/host — boot + authoring surface
 *
 * Use `@gvg/kernel/plugin` for the canonical plugin core.
 * Use this path for loader, define helpers, and composition.
 */

export {
  scanPlugins,
  bootPlugin,
  startPluginHost,
  createPluginHost,
  PluginHost,
  PluginLoader,
  createPluginLoader,
  loadPlugin,
  shutdownPlugin,
  unloadPlugin,
  getPlugin,
  listPlugins,
  clearPlugins,
  registerPlugin,
} from "./PluginLoader";
export type {
  BootStage,
  PluginBootRecord,
  BootReport,
  PluginHostOptions,
} from "./PluginLoader";

export {
  PluginDiscovery,
  discoverPlugins,
  filterDiscoveredPlugins,
} from "./PluginDiscovery";
export type {
  PluginDiscoveryOptions,
  PluginDiscoveryResult,
} from "./PluginDiscovery";

export {
  PluginActivationManager,
  createPluginActivationManager,
} from "./PluginActivationManager";
export type {
  PluginActivationHooks,
  PluginLifecycleHooks,
} from "./PluginActivationManager";

export {
  createGVGPlugin,
  createDefaultAppContext,
} from "./PluginContext";
export type {
  AppContext,
  PluginContext,
  GVGPlugin,
  GvgPlugin,
  CreateGVGPluginInput,
} from "./PluginContext";

export {
  definePlugin,
  defineDashboardWidget,
  defineManifest,
} from "./define";
export type {
  DashboardWidget,
  DashboardWidgetSize,
  DefinePluginInput,
  GVGPluginWithWidgets,
} from "./define";

export {
  defineNavigation,
  flattenNavigation,
  filterNavigationByRoles,
  mergeNavigation,
  registerPluginNavigation,
  unregisterPluginNavigation,
  getAllNavigation,
  resolveNavigation,
} from "./navigation";
export type {
  NavigationItem,
  PluginNavItem,
  NavigationRuntime,
} from "./navigation";

export {
  defineRoute,
  mergeRoutes,
  filterRoutesByRoles,
  filterRoutesByAuth,
  matchRoute,
  registerPluginRoutes,
  unregisterPluginRoutes,
  getAllRoutes,
  resolveRoutes,
} from "./routes";
export type {
  RouteDefinition,
  PluginRoute,
  RoutesRuntime,
} from "./routes";

export {
  definePermission,
  mergePermissions,
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  filterPermissionsByPrefix,
  registerPluginPermissions,
  unregisterPluginPermissions,
  getAllPermissions,
  resolvePermissions,
} from "./permissions";
export type {
  PermissionDefinition,
  PermissionsRuntime,
} from "./permissions";

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

export {
  PluginRegistry,
  createPluginRuntime,
  registerPluginWidgets,
  getAllWidgets,
  clearPluginRuntime,
  register,
  unregister,
  resolve,
  list,
  clearRegistry,
} from "./PluginRegistry";
export type {
  PluginRuntimeState,
  RegistryEntry,
} from "./PluginRegistry";

export {
  PluginContributionRuntime,
  createPluginContributionRuntime,
} from "./PluginContributionRuntime";
export type { PluginRuntimeSnapshot } from "./PluginContributionRuntime";
