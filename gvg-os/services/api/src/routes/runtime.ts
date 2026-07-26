/**
 * GET /api/runtime
 */

import {
  bootstrapApplicationContext,
  getActiveTenantContext,
  getActiveWorkspaceContext,
  getRequestContext,
  snapshotRuntimeContext,
} from "@gvg/core";

export function getRuntime() {
  bootstrapApplicationContext({ name: "GVG OS" });
  const snap = snapshotRuntimeContext();
  return {
    application: snap.application,
    tenant: snap.tenant ?? getActiveTenantContext(),
    workspace: snap.workspace ?? getActiveWorkspaceContext(),
    request: snap.request ?? getRequestContext(),
    checkedAt: new Date().toISOString(),
  };
}
