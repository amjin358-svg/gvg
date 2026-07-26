/**
 * @gvg/core/runtime/RuntimeContext
 *
 * Composed runtime bag: application + tenant + workspace + request.
 */

import { AsyncLocalStorage } from "node:async_hooks";
import {
  bootstrapApplicationContext,
  getApplicationContext,
  type ApplicationContext,
} from "./ApplicationContext";
import {
  getRequestContext,
  type RequestContext,
} from "./RequestContext";
import {
  getActiveTenantContext,
  type TenantContext,
} from "./TenantContext";
import {
  getActiveWorkspaceContext,
  type WorkspaceContext,
} from "./WorkspaceContext";

export type RuntimeContext = {
  application: ApplicationContext;
  tenant: TenantContext | null;
  workspace: WorkspaceContext | null;
  request: RequestContext | null;
};

const als = new AsyncLocalStorage<RuntimeContext>();

export function createRuntimeContext(
  partial: Partial<RuntimeContext> = {},
): RuntimeContext {
  return {
    application:
      partial.application ??
      getApplicationContext() ??
      bootstrapApplicationContext(),
    tenant: partial.tenant ?? getActiveTenantContext(),
    workspace: partial.workspace ?? getActiveWorkspaceContext(),
    request: partial.request ?? getRequestContext(),
  };
}

export function getRuntimeContext(): RuntimeContext | null {
  return als.getStore() ?? null;
}

export function requireRuntimeContext(): RuntimeContext {
  const ctx = getRuntimeContext();
  if (!ctx) throw new Error("No active runtime context");
  return ctx;
}

/** Snapshot current layered contexts into a RuntimeContext (not ALS-bound). */
export function snapshotRuntimeContext(): RuntimeContext {
  return createRuntimeContext();
}

export function runWithRuntimeContext<T>(
  ctx: RuntimeContext,
  fn: () => T,
): T {
  return als.run(ctx, fn);
}

export async function runWithRuntimeContextAsync<T>(
  ctx: RuntimeContext,
  fn: () => Promise<T>,
): Promise<T> {
  return als.run(ctx, fn);
}

/** Bind a fresh runtime snapshot around `fn`. */
export function withRuntimeContext<T>(
  partial: Partial<RuntimeContext>,
  fn: () => T,
): T {
  return runWithRuntimeContext(createRuntimeContext(partial), fn);
}
