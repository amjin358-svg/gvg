import type { PluginManifest } from "@gvg/sdk";

/**
 * Warehouse plugin manifest
 * @gvg/plugin-warehouse
 */
export const manifest = {
  id: "warehouse",
  name: "Warehouse",
  nameZh: "倉儲",
  version: "0.1.0",
  description: "WMS, inventory levels, warehouse ops",
  tags: ["warehouse", "inventory"],
} as const satisfies PluginManifest;

export type Manifest = typeof manifest;
export default manifest;
