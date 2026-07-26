/**
 * @gvg/core/runtime — application / tenant / workspace / request contexts
 */

export {
  createApplicationContext,
  setApplicationContext,
  getApplicationContext,
  requireApplicationContext,
  bootstrapApplicationContext,
  resetApplicationContext,
} from "./ApplicationContext";
export type { ApplicationContext } from "./ApplicationContext";

export {
  createRuntimeContext,
  getRuntimeContext,
  requireRuntimeContext,
  snapshotRuntimeContext,
  runWithRuntimeContext,
  runWithRuntimeContextAsync,
  withRuntimeContext,
} from "./RuntimeContext";
export type { RuntimeContext } from "./RuntimeContext";

export {
  createTenantContext,
  getActiveTenantContext,
  requireActiveTenantContext,
  setActiveTenantContext,
  runWithTenantContext,
  runWithTenantContextAsync,
} from "./TenantContext";

export {
  createWorkspaceContext,
  getActiveWorkspaceContext,
  requireActiveWorkspaceContext,
  setActiveWorkspaceContext,
  bindWorkspaceContext,
  runWithWorkspaceContext,
  runWithWorkspaceContextAsync,
  resetWorkspaceContext,
} from "./WorkspaceContext";
export type { WorkspaceContext } from "./WorkspaceContext";

export {
  createRequestContext,
  getRequestContext,
  requireRequestContext,
  runWithRequestContext,
  runWithRequestContextAsync,
  withRequestContext,
} from "./RequestContext";
export type { RequestContext } from "./RequestContext";
