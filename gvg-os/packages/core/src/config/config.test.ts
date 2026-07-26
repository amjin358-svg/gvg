/**
 * Config module smoke test
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  ConfigService,
  FeatureFlagService,
  LicenseService,
  applyEnvironment,
  clearFeatureFlags,
  clearLicense,
  createLicense,
  getEnvironmentInfo,
  hasEntitlement,
  isFeatureEnabled,
  isLicenseValid,
  resetSettings,
  setLicense,
} from "./index";

describe("@gvg/core/config", () => {
  it("ConfigService settings", () => {
    resetSettings();
    ConfigService.setSetting("trade.incotermsDefault", "FOB");
    assert.equal(ConfigService.getSetting("trade.incotermsDefault"), "FOB");
    assert.equal(ConfigService.get().currency, "USD");
  });

  it("Environment helpers", () => {
    applyEnvironment("development");
    const info = getEnvironmentInfo();
    assert.equal(info.env, "development");
    assert.equal(info.isDevelopment, true);
    assert.equal(info.isProduction, false);
  });

  it("FeatureFlag façade", () => {
    clearFeatureFlags();
    FeatureFlagService.register({ key: "beta.rfq", enabled: true });
    assert.equal(isFeatureEnabled("beta.rfq"), true);
    FeatureFlagService.disable("beta.rfq");
    assert.equal(isFeatureEnabled("beta.rfq"), false);
  });

  it("License entitlements", () => {
    clearLicense();
    const license = createLicense({
      tenantId: "org-gvg",
      plan: "growth",
    });
    setLicense(license);
    assert.equal(isLicenseValid(), true);
    assert.equal(hasEntitlement("marketplace"), true);
    assert.equal(hasEntitlement("white-label"), false);
    assert.equal(LicenseService.has("ai-center"), true);
  });
});
