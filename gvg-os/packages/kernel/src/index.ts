/**
 * @gvg/kernel — GVG OS kernel
 *
 * packages/kernel/src/
 * ├── application/   Application · Bootstrap · Lifecycle
 * ├── plugin/        PluginRuntime · Discovery · Lifecycle · Manifest
 * ├── event/         EventBus · EventEmitter · Events
 * ├── config/        Config · Environment
 * ├── logger/        Logger
 * └── errors/        BaseError · PluginError
 */

export {
  Application,
  createApp,
  Bootstrap,
  Lifecycle,
} from "./application";
export type {
  ApplicationOptions,
  KernelApp,
  KernelAppOptions,
  BootstrapOptions,
  BootstrapResult,
  LifecycleState,
} from "./application";

/** Canonical plugin core */
export * from "./plugin";

/** Boot + authoring helpers (not in the plugin core barrel) */
export {
  definePlugin,
  defineRoute,
  definePermission,
  defineNavigation,
  defineDashboardWidget,
  defineManifest,
  createGVGPlugin,
  createDefaultAppContext,
  loadPlugin,
  shutdownPlugin,
  unloadPlugin,
  getPlugin,
  listPlugins,
  clearPlugins,
  bootPlugin,
  startPluginHost,
  createPluginHost,
  createPluginLoader,
  PluginHost,
  PluginLoader,
  registerPlugin,
  flattenNavigation,
  filterNavigationByRoles,
  mergeNavigation,
  resolveNavigation,
  unregisterPluginNavigation,
  mergeRoutes,
  filterRoutesByRoles,
  filterRoutesByAuth,
  matchRoute,
  resolveRoutes,
  unregisterPluginRoutes,
  mergePermissions,
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
  filterPermissionsByPrefix,
  resolvePermissions,
  unregisterPluginPermissions,
  composeRuntime,
  generateMenu,
  generateRoutes,
  generateDashboard,
  injectPermissions,
  createRuntimeComposer,
  RuntimeComposer,
  COMPOSITION_STAGES,
  createPluginActivationManager,
  PluginActivationManager,
  register,
  unregister,
  resolve,
  list,
  clearRegistry,
  PluginContributionRuntime,
  createPluginContributionRuntime,
} from "./plugin/host";
export type {
  GVGPlugin,
  GvgPlugin,
  GVGPluginWithWidgets,
  AppContext,
  PluginContext,
  PluginRoute,
  PluginNavItem,
  DashboardWidget,
  DashboardWidgetSize,
  DefinePluginInput,
  CreateGVGPluginInput,
  BootStage,
  PluginBootRecord,
  BootReport,
  PluginHostOptions,
  PluginLifecycleHooks,
  PluginActivationHooks,
  ComposedShell,
  CompositionStage,
  ComposeOptions,
  PluginRuntimeSnapshot,
  NavigationRuntime,
  RoutesRuntime,
  PermissionsRuntime,
} from "./plugin/host";

export {
  EventBus,
  eventBus,
  EventEmitter,
  createDomainEvent,
  on,
  off,
  emit,
  clearEventHandlers,
} from "./event";
export type { DomainEvent, DomainEventType, EventHandler } from "./event";

export {
  Config,
  getConfig,
  setConfig,
  resetConfig,
  resolveEnvironment,
  isProduction,
} from "./config";
export type { GvgConfig, GvgEnv } from "./config";

export {
  createLogger,
  logger,
  setLogLevel,
  LoggerService,
} from "./logger";
export type { Logger, LogLevel, LogContext } from "./logger";

export { BaseError, isBaseError, PluginError, isPluginError } from "./errors";
export type { ErrorCode } from "./errors";
