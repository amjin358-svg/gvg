import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { manifest } from "../manifest";
import { searchProducts } from "../services";
import { permissions, canMarketplace } from "../permissions";
import {
  MARKETPLACE_MODULES,
  MARKETPLACE_FLOW_MODULES,
  describeMarketplacePipeline,
} from "../modules";
import {
  MARKETPLACE_PIPELINE,
  getNextPipelineStage,
} from "../pipeline";
import { routes } from "../routes";

describe("marketplace plugin", () => {
  it("exposes manifest id", () => {
    assert.equal(manifest.id, "marketplace");
  });

  it("defines commerce pipeline Marketplace → Products → Supplier → RFQ → Procurement", () => {
    assert.deepEqual(
      MARKETPLACE_PIPELINE.map((s) => s.label),
      ["Marketplace", "Products", "Supplier", "RFQ", "Procurement"],
    );
    assert.equal(
      describeMarketplacePipeline(),
      "Marketplace → Products → Supplier → RFQ → Procurement",
    );
    assert.equal(getNextPipelineStage("products")?.id, "supplier");
    assert.equal(getNextPipelineStage("procurement"), null);
  });

  it("orders primary flow modules Products → Supplier → RFQ → Procurement", () => {
    assert.deepEqual(
      MARKETPLACE_FLOW_MODULES.map((m) => m.label),
      ["Products", "Supplier", "RFQ", "Procurement"],
    );
  });

  it("defines marketplace module tree", () => {
    assert.deepEqual(
      MARKETPLACE_MODULES.map((m) => m.label),
      [
        "Products",
        "Supplier",
        "RFQ",
        "Procurement",
        "Category",
        "Brand",
        "Favorite",
        "AI Search",
      ],
    );
  });

  it("registers routes for each module", () => {
    for (const m of MARKETPLACE_MODULES) {
      assert.ok(
        routes.some((r) => r.path === m.href),
        `missing route for ${m.id}`,
      );
    }
  });

  it("declares marketplace permissions", () => {
    assert.ok(permissions.includes("products.read"));
    assert.ok(permissions.includes("supplier.manage"));
    assert.ok(permissions.includes("rfq.create"));
    assert.ok(permissions.includes("ai.search"));
  });

  it("grants rfq.create to customers", () => {
    assert.equal(canMarketplace("customer", "rfq.create"), true);
    assert.equal(canMarketplace("guest", "rfq.create"), false);
  });

  it("searches catalog", async () => {
    const hits = await searchProducts("omega");
    assert.ok(hits.length >= 1);
  });

  it("exposes Total Products · Pending RFQ · New Suppliers", async () => {
    const { getMarketplaceStats } = await import("../stats");
    const stats = await getMarketplaceStats();
    assert.deepEqual(
      stats.map((s) => s.label),
      ["Total Products", "Pending RFQ", "New Suppliers"],
    );
    assert.ok(stats[0]!.value >= 2);
    assert.ok(stats[1]!.value >= 2);
    assert.ok(stats[2]!.value >= 1);
  });
});
