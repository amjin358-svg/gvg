/**
 * permissions.ts — define / merge / check / resolve
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  definePermission,
  filterPermissionsByPrefix,
  hasAllPermissions,
  hasAnyPermission,
  hasPermission,
  mergePermissions,
  registerPluginPermissions,
  resolvePermissions,
  unregisterPluginPermissions,
} from "./permissions";

describe("permissions", () => {
  it("defines and merges by key", () => {
    const a = definePermission("marketplace.read");
    const b = definePermission({
      key: "marketplace.write",
      description: "Write catalog",
    });
    assert.equal(a.key, "marketplace.read");
    assert.equal(b.description, "Write catalog");

    const merged = mergePermissions(
      ["marketplace.read", "trade.read"],
      [{ key: "marketplace.read" }, "warehouse.read"],
    );
    assert.deepEqual(
      merged.map((p) => p.key),
      ["marketplace.read", "trade.read", "warehouse.read"],
    );
  });

  it("checks grants including wildcard", () => {
    const grants = ["marketplace.read", "trade.write"];
    assert.equal(hasPermission(grants, "marketplace.read"), true);
    assert.equal(hasPermission(grants, "marketplace.write"), false);
    assert.equal(hasAllPermissions(grants, ["marketplace.read"]), true);
    assert.equal(
      hasAllPermissions(grants, ["marketplace.read", "missing"]),
      false,
    );
    assert.equal(hasAnyPermission(grants, ["missing", "trade.write"]), true);
    assert.equal(hasPermission(["*"], "anything"), true);
  });

  it("filters by prefix and resolves runtime", () => {
    const runtime = { permissions: new Map() };
    registerPluginPermissions(runtime, "marketplace", [
      "marketplace.read",
      "marketplace.write",
    ]);
    registerPluginPermissions(runtime, "trade", ["trade.read"]);

    const all = resolvePermissions(runtime);
    assert.equal(all.length, 3);
    assert.equal(
      filterPermissionsByPrefix(all, "marketplace.").length,
      2,
    );
    assert.equal(resolvePermissions(runtime, ["trade"]).length, 1);

    unregisterPluginPermissions(runtime, "trade");
    assert.equal(resolvePermissions(runtime).length, 2);
  });
});
