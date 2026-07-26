/**
 * Runtime context smoke test
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  bootstrapApplicationContext,
  createRequestContext,
  createTenantContext,
  createWorkspaceContext,
  getActiveTenantContext,
  getRequestContext,
  resetApplicationContext,
  runWithTenantContext,
  runWithWorkspaceContext,
  snapshotRuntimeContext,
  withRequestContext,
} from "./index";
import { createTenant } from "../tenant";
import { WORKSPACE_OPTIONS } from "../workspace";

describe("@gvg/core/runtime", () => {
  it("application + tenant + workspace + request", () => {
    resetApplicationContext();
    const app = bootstrapApplicationContext({ name: "GVG OS Test" });
    assert.equal(app.name, "GVG OS Test");

    const tenant = createTenant({
      id: "org-gvg",
      slug: "gvg",
      name: "Global Vista Group",
      plan: "enterprise",
      locale: "en",
      timezone: "UTC",
    });
    const tenantCtx = createTenantContext(tenant, ["marketplace"]);

    runWithTenantContext(tenantCtx, () => {
      assert.equal(getActiveTenantContext()?.tenant.id, "org-gvg");

      const ws = WORKSPACE_OPTIONS[0]!;
      runWithWorkspaceContext(createWorkspaceContext(ws), () => {
        withRequestContext({ path: "/api/orders", method: "GET" }, () => {
          const req = getRequestContext();
          assert.ok(req?.requestId);
          assert.equal(req?.path, "/api/orders");
          assert.equal(req?.correlationId, req?.requestId);

          const snap = snapshotRuntimeContext();
          assert.equal(snap.application.name, "GVG OS Test");
          assert.equal(snap.tenant?.tenant.slug, "gvg");
          assert.equal(snap.workspace?.workspace.id, ws.id);
          assert.equal(snap.request?.method, "GET");
        });
      });
    });

    assert.equal(getRequestContext(), null);
    assert.ok(createRequestContext().requestId);
  });
});
