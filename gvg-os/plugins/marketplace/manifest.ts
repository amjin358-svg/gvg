import type { PluginManifest } from "@gvg/sdk";

/**
 * Marketplace plugin manifest
 * @gvg/plugin-marketplace
 */
export const manifest = {
  id: "marketplace",
  name: "Marketplace",
  nameZh: "市集",
  version: "0.1.0",
  description: "Product discovery, brands, categories, and marketplace browsing",
  tags: ["commerce", "products"],
} as const satisfies PluginManifest;

export type MarketplaceManifest = typeof manifest;

export default manifest;
