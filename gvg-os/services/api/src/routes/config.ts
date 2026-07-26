/**
 * GET /api/config
 * PATCH /api/config  { settings?: Partial<CoreSettings>, app?: Partial<GvgConfig> }
 */

import {
  getAppConfig,
  getSettings,
  setAppConfig,
  setSettings,
  getEnvironmentInfo,
  type CoreSettings,
} from "@gvg/core/config";
import type { GvgConfig } from "@gvg/kernel/config";

export function getConfigView() {
  const settings = getSettings();
  const app = getAppConfig();
  const env = getEnvironmentInfo();
  return {
    env: env.env,
    settings,
    app: {
      env: app.env,
      appName: app.appName,
      apiBaseUrl: app.apiBaseUrl,
      websiteUrl: app.websiteUrl,
      features: app.features,
    },
    checkedAt: new Date().toISOString(),
  };
}

export function patchConfig(input: {
  settings?: Partial<CoreSettings>;
  app?: Partial<GvgConfig>;
}) {
  if (input.settings) setSettings(input.settings);
  if (input.app) setAppConfig(input.app);
  return getConfigView();
}
