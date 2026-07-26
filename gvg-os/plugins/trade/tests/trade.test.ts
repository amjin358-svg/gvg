import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { manifest } from "../manifest";
import { permissions } from "../permissions";
import { TRADE_MODULES } from "../modules";
import { routes } from "../routes";

describe("trade plugin", () => {
  it("exposes manifest id", () => {
    assert.equal(manifest.id, "trade");
  });

  it("defines trade module tree", () => {
    assert.deepEqual(
      TRADE_MODULES.map((m) => m.label),
      [
        "PO",
        "Shipment",
        "Customs",
        "Invoice",
        "Packing List",
        "Tracking",
        "Documents",
      ],
    );
  });

  it("registers routes for each module", () => {
    for (const m of TRADE_MODULES) {
      assert.ok(
        routes.some((r) => r.path === m.href),
        `missing route for ${m.id}`,
      );
    }
  });

  it("declares trade permissions", () => {
    assert.ok((permissions as readonly string[]).includes("trade:read"));
    assert.ok((permissions as readonly string[]).includes("po.read"));
    assert.ok((permissions as readonly string[]).includes("shipment.read"));
  });

  it("exposes Shipment · Containers · Invoices", async () => {
    const { getTradeStats } = await import("../stats");
    const stats = await getTradeStats();
    assert.deepEqual(
      stats.map((s) => s.label),
      ["Shipment", "Containers", "Invoices"],
    );
    assert.ok(stats[0]!.value >= 3);
    assert.ok(stats[1]!.value >= 3);
    assert.ok(stats[2]!.value >= 2);
  });
});
