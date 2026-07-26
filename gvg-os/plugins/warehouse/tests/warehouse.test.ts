import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { manifest } from "../manifest";
import { permissions } from "../permissions";
import { WAREHOUSE_MODULES } from "../modules";
import { routes } from "../routes";

describe("warehouse plugin", () => {
  it("exposes manifest id", () => {
    assert.equal(manifest.id, "warehouse");
  });

  it("defines warehouse module tree", () => {
    assert.deepEqual(
      WAREHOUSE_MODULES.map((m) => m.label),
      [
        "Inventory",
        "Bin",
        "Barcode",
        "Picking",
        "Packing",
        "Receiving",
        "Shipping",
      ],
    );
  });

  it("registers routes for each module", () => {
    for (const m of WAREHOUSE_MODULES) {
      assert.ok(
        routes.some((r) => r.path === m.href),
        `missing route for ${m.id}`,
      );
    }
  });

  it("declares warehouse permissions", () => {
    assert.ok((permissions as readonly string[]).includes("warehouse:read"));
    assert.ok((permissions as readonly string[]).includes("inventory.read"));
    assert.ok((permissions as readonly string[]).includes("picking.read"));
  });
});
