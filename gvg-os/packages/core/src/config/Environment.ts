/**
 * @gvg/core/config/Environment
 *
 * Runtime environment resolution for core services.
 */

import {
  isProduction as kernelIsProduction,
  resolveEnvironment as kernelResolveEnvironment,
  type GvgEnv,
} from "@gvg/kernel/config";
import { getAppConfig, setAppConfig } from "./ConfigService";

export type { GvgEnv };

export type EnvironmentInfo = {
  env: GvgEnv;
  nodeEnv: string | undefined;
  isProduction: boolean;
  isDevelopment: boolean;
  isPreview: boolean;
  isStaging: boolean;
};

export function resolveEnvironment(
  value: string | undefined = process.env.NODE_ENV,
): GvgEnv {
  return kernelResolveEnvironment(value);
}

export function isProduction(env: GvgEnv = resolveEnvironment()): boolean {
  return kernelIsProduction(env);
}

export function isDevelopment(env: GvgEnv = resolveEnvironment()): boolean {
  return env === "development";
}

export function isPreview(env: GvgEnv = resolveEnvironment()): boolean {
  return env === "preview";
}

export function isStaging(env: GvgEnv = resolveEnvironment()): boolean {
  return env === "staging";
}

export function getEnvironmentInfo(): EnvironmentInfo {
  const env = getAppConfig().env || resolveEnvironment();
  return {
    env,
    nodeEnv: process.env.NODE_ENV,
    isProduction: isProduction(env),
    isDevelopment: isDevelopment(env),
    isPreview: isPreview(env),
    isStaging: isStaging(env),
  };
}

/** Sync kernel app config env from process / override. */
export function applyEnvironment(env?: GvgEnv): GvgEnv {
  const resolved = env ?? resolveEnvironment();
  setAppConfig({ env: resolved });
  return resolved;
}

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function getEnv(name: string, fallback?: string): string | undefined {
  return process.env[name] ?? fallback;
}
