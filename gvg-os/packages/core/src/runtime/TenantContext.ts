/**
 * @gvg/core/runtime/TenantContext
 *
 * Request / runtime scoped tenant. Syncs with @gvg/core/tenant store.
 */

import { AsyncLocalStorage } from "node:async_hooks";
import {
  getTenantContext as getGlobalTenant,
  setTenantContext as setGlobalTenant,
  type Tenant,
  type TenantContext,
} from "../tenant";

export type { TenantContext };

const als = new AsyncLocalStorage<TenantContext>();

export function createTenantContext(
  tenant: Tenant,
  features: string[] = [],
): TenantContext {
  return { tenant, features };
}

export function getActiveTenantContext(): TenantContext | null {
  return als.getStore() ?? getGlobalTenant();
}

export function requireActiveTenantContext(): TenantContext {
  const ctx = getActiveTenantContext();
  if (!ctx) throw new Error("No active tenant context");
  return ctx;
}

export function setActiveTenantContext(ctx: TenantContext | null): void {
  setGlobalTenant(ctx);
}

/** Run `fn` within a tenant scope (AsyncLocalStorage + global sync). */
export function runWithTenantContext<T>(
  ctx: TenantContext,
  fn: () => T,
): T {
  setGlobalTenant(ctx);
  return als.run(ctx, fn);
}

export async function runWithTenantContextAsync<T>(
  ctx: TenantContext,
  fn: () => Promise<T>,
): Promise<T> {
  setGlobalTenant(ctx);
  return als.run(ctx, fn);
}
