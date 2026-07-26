import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { API_CONTRACTS } from "../../api/contracts";
import { getPlatformHealth } from "../../backend/services/health";
import { USER_ROLES } from "../../types/roles";

describe("platform foundation", () => {
  it("exposes all enterprise roles", () => {
    assert.equal(USER_ROLES.length, 11);
    assert.ok(USER_ROLES.includes("super_admin"));
    assert.ok(USER_ROLES.includes("ai_agent"));
  });

  it("returns healthy platform status", () => {
    const health = getPlatformHealth();
    assert.equal(health.status, "ok");
    assert.equal(health.version, "1.0.0");
  });

  it("documents core API contracts", () => {
    assert.ok(API_CONTRACTS.some((route) => route.path === "/api/health"));
    assert.ok(API_CONTRACTS.some((route) => route.path === "/api/ai/procurement"));
  });
});
