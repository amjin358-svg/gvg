/**
 * @gvg/core/runtime/ApplicationContext
 *
 * Process-level application identity (singleton for the running OS instance).
 */

import { resolveEnvironment, type GvgEnv } from "@gvg/kernel/config";

export type ApplicationContext = {
  appId: string;
  name: string;
  version: string;
  env: GvgEnv;
  startedAt: string;
};

let active: ApplicationContext | null = null;

export function createApplicationContext(
  input: Partial<ApplicationContext> & Pick<ApplicationContext, "name"> = {
    name: "GVG OS",
  },
): ApplicationContext {
  return {
    appId: input.appId ?? "gvg-os",
    name: input.name,
    version: input.version ?? "0.1.0",
    env: input.env ?? resolveEnvironment(),
    startedAt: input.startedAt ?? new Date().toISOString(),
  };
}

export function setApplicationContext(ctx: ApplicationContext | null): void {
  active = ctx;
}

export function getApplicationContext(): ApplicationContext | null {
  return active;
}

export function requireApplicationContext(): ApplicationContext {
  if (!active) throw new Error("No active application context");
  return active;
}

/** Initialize once at boot; returns existing instance if already set. */
export function bootstrapApplicationContext(
  input?: Partial<ApplicationContext> & Pick<ApplicationContext, "name">,
): ApplicationContext {
  if (active) return active;
  active = createApplicationContext(input ?? { name: "GVG OS" });
  return active;
}

export function resetApplicationContext(): void {
  active = null;
}
