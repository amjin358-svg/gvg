/**
 * @gvg/core/config — 全域設定管理
 *
 * config/
 * ├── ConfigService.ts
 * ├── Environment.ts
 * ├── FeatureFlag.ts
 * └── License.ts
 */

export {
  getSettings,
  setSettings,
  getSetting,
  setSetting,
  resetSettings,
  getAppConfig,
  setAppConfig,
  resetAppConfig,
  ConfigService,
} from "./ConfigService";
export type { CoreSettings } from "./ConfigService";

export {
  resolveEnvironment,
  isProduction,
  isDevelopment,
  isPreview,
  isStaging,
  getEnvironmentInfo,
  applyEnvironment,
  requireEnv,
  getEnv,
} from "./Environment";
export type { GvgEnv, EnvironmentInfo } from "./Environment";

export {
  registerFeatureFlag,
  registerFeatureFlags,
  enableFeature,
  disableFeature,
  isFeatureEnabled,
  listFeatureFlags,
  clearFeatureFlags,
  FeatureFlagService,
} from "./FeatureFlag";
export type { FeatureFlag, FeatureFlagSource } from "./FeatureFlag";

export {
  createLicense,
  setLicense,
  getLicense,
  requireLicense,
  clearLicense,
  isLicenseValid,
  hasEntitlement,
  assertEntitlement,
  planEntitlements,
  LicenseService,
} from "./License";
export type {
  License,
  LicensePlan,
  LicenseStatus,
  LicenseEntitlement,
} from "./License";
