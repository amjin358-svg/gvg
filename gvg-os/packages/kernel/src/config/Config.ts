/** @gvg/kernel/config/Config */

import { resolveEnvironment, type GvgEnv } from "./Environment";

export type GvgConfig = {
  env: GvgEnv;
  appName: string;
  apiBaseUrl: string;
  websiteUrl: string;
  features: Record<string, boolean>;
};

const defaults: GvgConfig = {
  env: "development",
  appName: "GVG OS",
  apiBaseUrl: "/api",
  websiteUrl: "https://globalvistagroup.com",
  features: {},
};

let current: GvgConfig = {
  ...defaults,
  env: resolveEnvironment(),
};

export function getConfig(): GvgConfig {
  return current;
}

export function setConfig(patch: Partial<GvgConfig>): GvgConfig {
  current = {
    ...current,
    ...patch,
    features: { ...current.features, ...patch.features },
  };
  return current;
}

export function resetConfig(): void {
  current = { ...defaults, features: {}, env: resolveEnvironment() };
}

export class Config {
  static get(): GvgConfig {
    return getConfig();
  }

  static set(patch: Partial<GvgConfig>): GvgConfig {
    return setConfig(patch);
  }

  static reset(): void {
    resetConfig();
  }

  static feature(key: string): boolean {
    return Boolean(getConfig().features[key]);
  }
}
