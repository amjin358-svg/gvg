/**
 * @gvg/core/runtime/RequestContext
 *
 * Per-request / per-invocation correlation context.
 */

import { AsyncLocalStorage } from "node:async_hooks";
import type { UserId } from "../roles";

export type RequestContext = {
  requestId: string;
  correlationId?: string;
  method?: string;
  path?: string;
  userId?: UserId;
  locale?: string;
  ip?: string;
  userAgent?: string;
  startedAt: string;
  meta?: Record<string, unknown>;
};

const als = new AsyncLocalStorage<RequestContext>();

export function createRequestContext(
  input: Partial<RequestContext> = {},
): RequestContext {
  const requestId = input.requestId ?? crypto.randomUUID();
  return {
    requestId,
    correlationId: input.correlationId ?? requestId,
    method: input.method,
    path: input.path,
    userId: input.userId,
    locale: input.locale,
    ip: input.ip,
    userAgent: input.userAgent,
    startedAt: input.startedAt ?? new Date().toISOString(),
    meta: input.meta ? { ...input.meta } : undefined,
  };
}

export function getRequestContext(): RequestContext | null {
  return als.getStore() ?? null;
}

export function requireRequestContext(): RequestContext {
  const ctx = getRequestContext();
  if (!ctx) throw new Error("No active request context");
  return ctx;
}

export function runWithRequestContext<T>(
  ctx: RequestContext,
  fn: () => T,
): T {
  return als.run(ctx, fn);
}

export async function runWithRequestContextAsync<T>(
  ctx: RequestContext,
  fn: () => Promise<T>,
): Promise<T> {
  return als.run(ctx, fn);
}

/** Convenience: create + run in one step */
export function withRequestContext<T>(
  input: Partial<RequestContext>,
  fn: () => T,
): T {
  return runWithRequestContext(createRequestContext(input), fn);
}
