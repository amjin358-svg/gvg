/**
 * Marketplace module tree
 *
 * Primary commerce pipeline:
 * Marketplace → Products → Supplier → RFQ → Procurement
 *
 * Supporting modules:
 * Category · Brand · Favorite · AI Search
 */

import {
  MARKETPLACE_PIPELINE,
  type MarketplacePipelineStageId,
} from "./pipeline";

export type MarketplaceModuleId =
  | "product"
  | "category"
  | "brand"
  | "supplier"
  | "rfq"
  | "procurement"
  | "favorite"
  | "ai-search";

export type MarketplaceModule = {
  id: MarketplaceModuleId;
  label: string;
  labelZh: string;
  href: string;
  description: string;
  /** Part of the primary Marketplace → … → Procurement funnel */
  pipeline?: boolean;
  pipelineOrder?: number;
};

/** Primary funnel modules (ordered). */
export const MARKETPLACE_FLOW_MODULES: MarketplaceModule[] = [
  {
    id: "product",
    label: "Products",
    labelZh: "產品",
    href: "/marketplace/products",
    description: "Catalog products and SKUs",
    pipeline: true,
    pipelineOrder: 1,
  },
  {
    id: "supplier",
    label: "Supplier",
    labelZh: "供應商",
    href: "/marketplace/suppliers",
    description: "Supplier profiles and capabilities",
    pipeline: true,
    pipelineOrder: 2,
  },
  {
    id: "rfq",
    label: "RFQ",
    labelZh: "詢價",
    href: "/marketplace/rfq",
    description: "Request for quotation workflows",
    pipeline: true,
    pipelineOrder: 3,
  },
  {
    id: "procurement",
    label: "Procurement",
    labelZh: "採購",
    href: "/marketplace/procurement",
    description: "Sourcing and procurement desk",
    pipeline: true,
    pipelineOrder: 4,
  },
];

/** Supporting catalog / discovery modules. */
export const MARKETPLACE_SUPPORT_MODULES: MarketplaceModule[] = [
  {
    id: "category",
    label: "Category",
    labelZh: "分類",
    href: "/marketplace/categories",
    description: "Product categories and taxonomy",
  },
  {
    id: "brand",
    label: "Brand",
    labelZh: "品牌",
    href: "/marketplace/brands",
    description: "Brand directory",
  },
  {
    id: "favorite",
    label: "Favorite",
    labelZh: "收藏",
    href: "/marketplace/favorites",
    description: "Saved products and suppliers",
  },
  {
    id: "ai-search",
    label: "AI Search",
    labelZh: "AI 搜尋",
    href: "/marketplace/ai-search",
    description: "Intelligent catalog search",
  },
];

/** All modules — pipeline first, then support. */
export const MARKETPLACE_MODULES: MarketplaceModule[] = [
  ...MARKETPLACE_FLOW_MODULES,
  ...MARKETPLACE_SUPPORT_MODULES,
];

export function getMarketplaceModule(
  id: MarketplaceModuleId,
): MarketplaceModule | undefined {
  return MARKETPLACE_MODULES.find((m) => m.id === id);
}

export function getMarketplaceFlowModules(): MarketplaceModule[] {
  return [...MARKETPLACE_FLOW_MODULES];
}

/** Map pipeline stage id → module id (marketplace root has no module). */
export function pipelineStageToModule(
  stage: MarketplacePipelineStageId,
): MarketplaceModuleId | null {
  if (stage === "marketplace") return null;
  if (stage === "products") return "product";
  return stage;
}

export function describeMarketplacePipeline(): string {
  return MARKETPLACE_PIPELINE.map((s) => s.label).join(" → ");
}

export default MARKETPLACE_MODULES;
