/** Compat re-exports for @gvg/kernel/plugin/runtime */

export {
  PluginRuntime,
  createPluginRuntimeFacade,
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
} from "./PluginRuntime";
export {
  PluginContributionRuntime,
  createPluginContributionRuntime,
} from "./PluginContributionRuntime";
export type {
  PluginRuntimeState,
  RegistryEntry,
} from "./PluginRuntime";
export type { PluginRuntimeSnapshot } from "./PluginContributionRuntime";
