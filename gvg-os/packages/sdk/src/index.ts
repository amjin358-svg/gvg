/**
 * @gvg/sdk — Plugin SDK for GVG OS
 *
 * Authoring helpers:
 *   definePlugin()
 *   defineRoute()
 *   definePermission()
 *   defineNavigation()
 *   defineDashboardWidget()
 */

export {
  definePlugin,
  defineRoute,
  definePermission,
  defineNavigation,
  defineDashboardWidget,
  defineManifest,
  createGVGPlugin,
  loadPlugin,
  shutdownPlugin,
  unloadPlugin,
  getPlugin,
  listPlugins,
  clearPlugins,
  scanPlugins,
  bootPlugin,
  startPluginHost,
  createPluginHost,
  createPluginLoader,
  PluginHost,
  PluginLoader,
} from "@gvg/kernel/plugin/host";

export type {
  GVGPlugin,
  GvgPlugin,
  GVGPluginWithWidgets,
  AppContext,
  PluginContext,
  RouteDefinition,
  NavigationItem,
  PermissionDefinition,
  DashboardWidget,
  DashboardWidgetSize,
  DefinePluginInput,
  CreateGVGPluginInput,
  BootStage,
  PluginBootRecord,
  BootReport,
  PluginHostOptions,
  PluginRuntimeState,
} from "@gvg/kernel/plugin/host";

export type { PluginManifest } from "@gvg/kernel/plugin";

export const name = "@gvg/sdk";
export const version = "0.1.0";
