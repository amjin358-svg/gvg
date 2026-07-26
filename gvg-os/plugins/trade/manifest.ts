import type { PluginManifest } from "@gvg/sdk";

/**
 * Trade plugin manifest
 * @gvg/plugin-trade
 */
export const manifest = {
  id: "trade",
  name: "Trade",
  nameZh: "國際貿易",
  version: "0.1.0",
  description: "Import/export, Incoterms, customs documentation",
  tags: ["trade", "logistics"],
} as const satisfies PluginManifest;

export type Manifest = typeof manifest;
export default manifest;
