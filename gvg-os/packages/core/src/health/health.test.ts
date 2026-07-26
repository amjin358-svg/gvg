/**
 * Health module smoke test
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createHealthService,
  createHealthResult,
  predicateIndicator,
} from "./index";

describe("@gvg/core/health", () => {
  it("reports up when critical indicators pass", async () => {
    const health = createHealthService({ includePing: true });
    health.register(
      predicateIndicator("cache", () => true, { name: "Cache" }),
    );

    const status = await health.check();
    assert.equal(status.status, "up");
    assert.equal(status.ready, true);
    assert.equal(status.live, true);
    assert.ok(status.components.some((c) => c.id === "ping"));
    assert.ok(status.components.some((c) => c.id === "cache"));
  });

  it("fails readiness when a critical indicator is down", async () => {
    const health = createHealthService({ includePing: false });
    health.register(
      predicateIndicator("database", async () => false, {
        name: "Database",
        critical: true,
      }),
    );

    const readiness = await health.readiness();
    assert.equal(readiness.ready, false);
    assert.equal(readiness.status, "down");
  });

  it("allows degraded non-critical components", async () => {
    const health = createHealthService({ includePing: true });
    health.register({
      id: "search",
      name: "Search",
      critical: false,
      check: () =>
        createHealthResult("degraded", { message: "index rebuilding" }),
    });

    const status = await health.check();
    assert.equal(status.status, "degraded");
    assert.equal(status.ready, true);
  });
});
