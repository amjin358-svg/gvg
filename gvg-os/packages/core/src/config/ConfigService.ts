/**
 * @gvg/core/config/ConfigService
 *
 * Domain/runtime settings layered on top of @gvg/kernel config.
 */

import {
  getConfig as getKernelConfig,
  setConfig as setKernelConfig,
  resetConfig as resetKernelConfig,
  type GvgConfig,
} from "@gvg/kernel/config";

export type CoreSettings = {
  locale: string;
  timezone: string;
  currency: string;
  pageSize: number;
  /** Nested keys, e.g. "trade.incotermsDefault" */
  values: Record<string, unknown>;
};

const defaults: CoreSettings = {
  locale: "en-US",
  timezone: "UTC",
  currency: "USD",
  pageSize: 25,
  values: {},
};

let settings: CoreSettings = { ...defaults, values: {} };

export function getSettings(): CoreSettings {
  return {
    ...settings,
    values: { ...settings.values },
  };
}

export function setSettings(patch: Partial<CoreSettings>): CoreSettings {
  settings = {
    ...settings,
    ...patch,
    values: { ...settings.values, ...patch.values },
  };
  return getSettings();
}

export function getSetting<T = unknown>(
  key: string,
  fallback?: T,
): T | undefined {
  if (key in settings && key !== "values") {
    return (settings as Record<string, unknown>)[key] as T;
  }
  if (key in settings.values) {
    return settings.values[key] as T;
  }
  return fallback;
}

export function setSetting(key: string, value: unknown): void {
  if (
    key === "locale" ||
    key === "timezone" ||
    key === "currency" ||
    key === "pageSize"
  ) {
    setSettings({ [key]: value } as Partial<CoreSettings>);
    return;
  }
  setSettings({ values: { [key]: value } });
}

export function resetSettings(): void {
  settings = { ...defaults, values: {} };
}

/** Kernel app config helpers */
export function getAppConfig(): GvgConfig {
  return getKernelConfig();
}

export function setAppConfig(patch: Partial<GvgConfig>): GvgConfig {
  return setKernelConfig(patch);
}

export function resetAppConfig(): void {
  resetKernelConfig();
}

export class ConfigService {
  static get = getSettings;
  static set = setSettings;
  static getSetting = getSetting;
  static setSetting = setSetting;
  static reset = resetSettings;
  static getApp = getAppConfig;
  static setApp = setAppConfig;
  static resetApp = resetAppConfig;
}
