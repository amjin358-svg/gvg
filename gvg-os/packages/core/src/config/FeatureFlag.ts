/**
 * @gvg/core/config/FeatureFlag
 *
 * Config-layer feature flag façade over @gvg/core/featureFlag + kernel features.
 */

import {
  clearFlags,
  defineFlag,
  defineFlags,
  isEnabled,
  listFlags,
  setFlag,
  type FeatureFlag,
} from "../featureFlag/store";
import { getAppConfig, setAppConfig } from "./ConfigService";

export type { FeatureFlag };

export type FeatureFlagSource = "store" | "kernel" | "merged";

/** Register or update a core feature flag. */
export function registerFeatureFlag(flag: FeatureFlag): FeatureFlag {
  defineFlag(flag);
  return flag;
}

export function registerFeatureFlags(flags: FeatureFlag[]): void {
  defineFlags(flags);
}

export function enableFeature(key: string): void {
  setFlag(key, true);
  setAppConfig({ features: { [key]: true } });
}

export function disableFeature(key: string): void {
  setFlag(key, false);
  setAppConfig({ features: { [key]: false } });
}

/**
 * Evaluate a feature.
 * Prefers the dedicated flag store; falls back to kernel `features` map.
 */
export function isFeatureEnabled(
  key: string,
  tenantId?: string,
): boolean {
  const flags = listFlags();
  if (flags.some((f) => f.key === key)) {
    return isEnabled(key, tenantId);
  }
  return Boolean(getAppConfig().features[key]);
}

export function listFeatureFlags(
  source: FeatureFlagSource = "merged",
): FeatureFlag[] {
  const storeFlags = listFlags();
  if (source === "store") return storeFlags;

  const kernelFlags: FeatureFlag[] = Object.entries(
    getAppConfig().features,
  ).map(([key, enabled]) => ({
    key,
    enabled,
    description: "kernel.features",
  }));

  if (source === "kernel") return kernelFlags;

  const byKey = new Map<string, FeatureFlag>();
  for (const flag of kernelFlags) byKey.set(flag.key, flag);
  for (const flag of storeFlags) byKey.set(flag.key, flag);
  return Array.from(byKey.values());
}

export function clearFeatureFlags(): void {
  clearFlags();
}

export class FeatureFlagService {
  static register = registerFeatureFlag;
  static registerAll = registerFeatureFlags;
  static enable = enableFeature;
  static disable = disableFeature;
  static isEnabled = isFeatureEnabled;
  static list = listFeatureFlags;
  static clear = clearFeatureFlags;
}
