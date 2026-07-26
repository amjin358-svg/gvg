/**
 * @gvg/core — GVG OS core domain + platform services
 *
 * packages/core/
 * ├── runtime/         # Application / Tenant / Workspace / Request context
 * ├── module/          # Module metadata · registry · loader
 * ├── container/       # DI container · provider · inject
 * ├── config/          # ConfigService · Environment · FeatureFlag · License
 * ├── event/           # Pipeline · Dispatcher · Subscriber
 * ├── services/        # Audit · Storage · Cache · Mail · Notification · Search
 * ├── health/          # HealthService · HealthIndicator · StatusProvider
 * ├── application/     # Application → … → Ready pipeline
 * ├── audit/           # 稽核紀錄
 * ├── telemetry/       # 使用與效能追蹤
 * ├── cache/           # 快取抽象層
 * ├── storage/         # 檔案儲存抽象層
 * ├── notification/    # 通知中心
 * ├── workflow/        # 工作流程引擎
 * ├── scheduler/       # 排程服務
 * ├── auth/
 * ├── tenant/
 * ├── workspace/
 * ├── navigation/
 * ├── permission/
 * └── featureFlag/
 */

export { BRAND } from "./brand";
export type { BrandInfo } from "./brand";

export { USER_ROLES, ROLE_LABELS } from "./roles";
export type { UserRole, OrganizationId, UserId, SessionUser } from "./roles";

export type {
  ProductCategory,
  TradeService,
  OrderStatus,
  RfqStatus,
  QuoteStatus,
  Brand,
  Category,
  Product,
  Rfq,
  Quote,
  Order,
  Warehouse,
  LogisticsShipment,
  NavItem,
  PlatformModule,
} from "./domain";

export { slugify, formatMoney, assertNever } from "./utils";

export {
  login,
  logout,
  createSession,
  readSession,
  writeSession,
  clearSession,
  setSessionWorkspace,
  setPluginsLoaded,
  isAuthenticated,
  hasWorkspace,
  hasPluginsLoaded,
  resolveAuthPath,
  AUTH_STORAGE_KEY,
  WORKSPACE_STORAGE_KEY,
} from "./auth";
export type { AuthUser, AuthSession } from "./auth";

export {
  createApplicationContext,
  setApplicationContext,
  getApplicationContext,
  requireApplicationContext,
  bootstrapApplicationContext,
  resetApplicationContext,
  createRuntimeContext,
  getRuntimeContext,
  requireRuntimeContext,
  snapshotRuntimeContext,
  runWithRuntimeContext,
  runWithRuntimeContextAsync,
  withRuntimeContext,
  createTenantContext,
  getActiveTenantContext,
  requireActiveTenantContext,
  setActiveTenantContext,
  runWithTenantContext,
  runWithTenantContextAsync,
  createWorkspaceContext,
  getActiveWorkspaceContext,
  requireActiveWorkspaceContext,
  setActiveWorkspaceContext,
  bindWorkspaceContext,
  runWithWorkspaceContext,
  runWithWorkspaceContextAsync,
  resetWorkspaceContext,
  createRequestContext,
  getRequestContext,
  requireRequestContext,
  runWithRequestContext,
  runWithRequestContextAsync,
  withRequestContext,
} from "./runtime";
export type {
  ApplicationContext,
  RuntimeContext,
  WorkspaceContext,
  RequestContext,
} from "./runtime";

export {
  defineModuleMetadata,
  moduleFlagKey,
  defineModule,
  createDefaultModuleContext,
  ModuleRegistry,
  getModuleRegistry,
  resetModuleRegistry,
  createModuleRegistry,
  ModuleLoader,
  createModuleLoader,
  createIsolatedModuleLoader,
  sortModulesByDependencies,
} from "./module";
export type {
  ModuleKind,
  ModuleStatus,
  ModuleMetadata,
  GvgModule,
  Module,
  ModuleContext,
  ModuleRecord,
  DefineModuleInput,
  ModuleLoadReport,
  ModuleLoaderOptions,
} from "./module";

export {
  createToken,
  tokenKey,
  singleton,
  hasSingleton,
  clearSingleton,
  clearAllSingletons,
  lazySingleton,
  asSingleton,
  Injectable,
  Inject,
  getInjectDeps,
  defineInject,
  Container,
  getContainer,
  setContainer,
  resetContainer,
  createContainer,
} from "./container";
export type {
  InjectionToken,
  ProviderLifetime,
  Factory,
  ValueProvider,
  FactoryProvider,
  ClassProvider,
  AliasProvider,
  Provider,
  ProviderRecord,
  SingletonFactory,
  InjectableClass,
} from "./container";

export {
  setTenantContext,
  getTenantContext,
  requireTenant,
  createTenant,
} from "./tenant";
export type { Tenant, TenantPlan, TenantContext } from "./tenant";

export {
  setCurrentWorkspace,
  getCurrentWorkspaceId,
  createWorkspace,
  listWorkspaces,
  getWorkspace,
  getCurrentWorkspace,
  selectWorkspace,
  WORKSPACE_OPTIONS,
} from "./workspace";
export type { Workspace, WorkspaceKind, WorkspaceMembership } from "./workspace";

export {
  getNav,
  getNavForRole,
  defineNav,
  WORKSPACE_NAV,
  getWorkspaceNav,
  getEnabledWorkspaceNav,
  getEnabledMenuItems,
  getWorkspaceModule,
  MENU_ITEMS,
  menu,
  defaultMenu,
} from "./navigation";
export type {
  AppShell,
  NavTree,
  WorkspaceModuleId,
  WorkspaceNavItem,
  MenuItem,
} from "./navigation";

export { permissionsFor, can, assertCan } from "./permission";
export type { Permission } from "./permission";

export {
  defineFlag,
  defineFlags,
  isEnabled,
  setFlag,
  listFlags,
  clearFlags,
  MODULE_FLAGS,
  seedModuleFlags,
  isModuleEnabled,
  listEnabledModules,
  listDisabledModules,
} from "./featureFlag";
export type { FeatureFlag, ModuleFlagKey } from "./featureFlag";

export {
  getSettings,
  setSettings,
  getSetting,
  setSetting,
  resetSettings,
  getAppConfig,
  setAppConfig,
  resetAppConfig,
  ConfigService,
  resolveEnvironment,
  isProduction,
  isDevelopment,
  isPreview,
  isStaging,
  getEnvironmentInfo,
  applyEnvironment,
  requireEnv,
  getEnv,
  registerFeatureFlag,
  registerFeatureFlags,
  enableFeature,
  disableFeature,
  isFeatureEnabled,
  listFeatureFlags,
  clearFeatureFlags,
  FeatureFlagService,
  createLicense,
  setLicense,
  getLicense,
  requireLicense,
  clearLicense,
  isLicenseValid,
  hasEntitlement,
  assertEntitlement,
  planEntitlements,
  LicenseService,
} from "./config";
export type {
  CoreSettings,
  GvgEnv,
  EnvironmentInfo,
  FeatureFlagSource,
  License,
  LicensePlan,
  LicenseStatus,
  LicenseEntitlement,
} from "./config";

export {
  createEventEnvelope,
  SubscriberRegistry,
  createSubscriberRegistry,
  Dispatcher,
  getDispatcher,
  setDispatcher,
  resetDispatcher,
  createDispatcher,
  EventPipeline,
  createEventPipeline,
  timingMiddleware,
  auditMiddleware,
} from "./event";
export type {
  EventName,
  EventEnvelope,
  EventHandler,
  Subscription,
  SubscribeOptions,
  DispatchResult,
  DispatcherOptions,
  PipelineContext,
  PipelineMiddleware,
  EventPipelineOptions,
} from "./event";

export {
  AuditLog,
  recordAudit,
  listAudit,
  clearAudit,
  createAuditEntry,
} from "./audit";
export type {
  AuditAction,
  AuditActor,
  AuditEntry,
} from "./audit";

export {
  Telemetry,
  trackEvent,
  trackTiming,
  trackError,
  incrementCounter,
  measureAsync,
  listTelemetry,
  clearTelemetry,
} from "./telemetry";
export type { TelemetryKind, TelemetryEvent } from "./telemetry";

export {
  MemoryCache,
  getCache,
  cacheGet,
  cacheSet,
  cacheDelete,
  cacheClear,
  cacheRemember,
} from "./cache";
export type { CacheEntry, CacheStore } from "./cache";

export {
  MemoryStorage,
  getStorage,
  putObject,
  getObject,
  deleteObject,
  listObjects,
} from "./storage";
export type { StorageObject, PutObjectInput, ObjectStorage } from "./storage";

export {
  sendNotification,
  listNotifications,
  markNotificationRead,
  clearNotifications,
  createNotification,
} from "./notification";
export type {
  Notification,
  NotificationChannel,
  NotificationSeverity,
  NotificationStatus,
} from "./notification";

export {
  AuditService,
  createAuditService,
  StorageService,
  createStorageService,
  CacheService,
  createCacheService,
  MailService,
  MemoryMailTransport,
  createMailService,
  NotificationService,
  createNotificationService,
  SearchService,
  createSearchService,
} from "./services";
export type {
  MailAddress,
  MailMessage,
  SendMailInput,
  MailTransport,
  SearchDocument,
  SearchHit,
  SearchQuery,
} from "./services";

export {
  createHealthResult,
  defineHealthIndicator,
  pingIndicator,
  predicateIndicator,
  aggregateStatus,
  buildSystemStatus,
  StaticStatusProvider,
  HealthService,
  getHealthService,
  setHealthService,
  resetHealthService,
  createHealthService,
} from "./health";
export type {
  HealthStatus,
  HealthCheckResult,
  HealthIndicator,
  ComponentStatus,
  SystemStatus,
  StatusProvider,
  HealthServiceOptions,
} from "./health";

export {
  APPLICATION_PIPELINE,
  describeApplicationPipeline,
  runApplicationPipeline,
  ApplicationPipeline,
} from "./application";
export type {
  ApplicationPipelineStage,
  ApplicationPipelineOptions,
  ApplicationPipelineResult,
} from "./application";

export {
  WorkflowEngine,
  defineWorkflow,
  getWorkflowDefinition,
  startWorkflow,
  getWorkflow,
  listWorkflows,
  completeWorkflowStep,
  failWorkflow,
  clearWorkflows,
} from "./workflow";
export type {
  WorkflowStatus,
  WorkflowStepStatus,
  WorkflowStepDef,
  WorkflowDefinition,
  WorkflowStepState,
  WorkflowInstance,
} from "./workflow";

export {
  Scheduler,
  registerJobHandler,
  scheduleJob,
  getJob,
  listJobs,
  cancelJob,
  tickScheduler,
  clearScheduler,
} from "./scheduler";
export type {
  ScheduleStatus,
  ScheduledJob,
  JobHandler,
} from "./scheduler";

export {
  GvgError,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  validationError,
  internalError,
  isGvgError,
} from "./errors";
export type { ErrorCode } from "./errors";

/** Kernel re-exports for convenience */
export {
  createApp,
  getConfig,
  setConfig,
  resetConfig,
  definePlugin,
  createGVGPlugin,
  createPluginHost,
  createDomainEvent,
  on,
  off,
  emit,
  register,
  resolve,
  list,
  createLogger,
  logger,
} from "@gvg/kernel";

export const name = "@gvg/core";
export const version = "0.1.0";
