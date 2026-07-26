/**
 * GET /api/system
 */

import { BRAND, name as coreName, version as coreVersion } from "@gvg/core";
import {
  getEnvironmentInfo,
  getAppConfig,
} from "@gvg/core/config";

const startedAt = new Date().toISOString();
const startedMs = Date.now();

export function getSystem() {
  const env = getEnvironmentInfo();
  const app = getAppConfig();
  return {
    service: "@gvg/api",
    brand: BRAND,
    core: { name: coreName, version: coreVersion },
    app: {
      name: app.appName,
      apiBaseUrl: app.apiBaseUrl,
      websiteUrl: app.websiteUrl,
    },
    env: env.env,
    nodeEnv: env.nodeEnv,
    startedAt,
    uptimeSec: Math.floor((Date.now() - startedMs) / 1000),
    checkedAt: new Date().toISOString(),
  };
}
