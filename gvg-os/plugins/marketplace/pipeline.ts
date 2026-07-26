/**
 * Marketplace commerce pipeline (canonical)
 *
 * Marketplace
 *   ↓
 * Products
 *   ↓
 * Supplier
 *   ↓
 * RFQ
 *   ↓
 * Procurement
 */

export type MarketplacePipelineStageId =
  | "marketplace"
  | "products"
  | "supplier"
  | "rfq"
  | "procurement";

export type MarketplacePipelineStage = {
  id: MarketplacePipelineStageId;
  label: string;
  labelZh: string;
  href: string;
  description: string;
  /** Next stage in the commerce funnel (null at terminal) */
  next: MarketplacePipelineStageId | null;
  /** Owning domain folder under plugins/marketplace/ */
  module: "root" | "product" | "supplier" | "rfq" | "procurement";
};

export const MARKETPLACE_PIPELINE: MarketplacePipelineStage[] = [
  {
    id: "marketplace",
    label: "Marketplace",
    labelZh: "市集",
    href: "/marketplace",
    description: "Entry — discover verticals and start sourcing",
    next: "products",
    module: "root",
  },
  {
    id: "products",
    label: "Products",
    labelZh: "產品",
    href: "/marketplace/products",
    description: "Browse catalog SKUs and product detail",
    next: "supplier",
    module: "product",
  },
  {
    id: "supplier",
    label: "Supplier",
    labelZh: "供應商",
    href: "/marketplace/suppliers",
    description: "Match capable suppliers for selected products",
    next: "rfq",
    module: "supplier",
  },
  {
    id: "rfq",
    label: "RFQ",
    labelZh: "詢價",
    href: "/marketplace/rfq",
    description: "Request quotations from shortlisted suppliers",
    next: "procurement",
    module: "rfq",
  },
  {
    id: "procurement",
    label: "Procurement",
    labelZh: "採購",
    href: "/marketplace/procurement",
    description: "Negotiate, award, and convert to purchase flow",
    next: null,
    module: "procurement",
  },
];

export function getPipelineStage(
  id: MarketplacePipelineStageId,
): MarketplacePipelineStage | undefined {
  return MARKETPLACE_PIPELINE.find((s) => s.id === id);
}

export function getNextPipelineStage(
  id: MarketplacePipelineStageId,
): MarketplacePipelineStage | null {
  const current = getPipelineStage(id);
  if (!current?.next) return null;
  return getPipelineStage(current.next) ?? null;
}

export function getPipelineIndex(id: MarketplacePipelineStageId): number {
  return MARKETPLACE_PIPELINE.findIndex((s) => s.id === id);
}

/** Stages from entry through `id` (inclusive). */
export function getPipelinePath(
  id: MarketplacePipelineStageId,
): MarketplacePipelineStage[] {
  const index = getPipelineIndex(id);
  if (index < 0) return [];
  return MARKETPLACE_PIPELINE.slice(0, index + 1);
}

export function isPipelineComplete(id: MarketplacePipelineStageId): boolean {
  return id === "procurement";
}

export default MARKETPLACE_PIPELINE;
