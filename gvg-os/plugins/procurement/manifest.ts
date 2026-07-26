import type { PluginManifest } from "@gvg/sdk";

/**
 * Procurement plugin manifest
 * @gvg/plugin-procurement
 */
export const manifest = {
  id: "procurement",
  name: "Procurement",
  nameZh: "全球採購",
  version: "0.1.0",
  description: "RFQ, sourcing, OEM/ODM procurement",
  tags: ["procurement", "sourcing"],
} as const satisfies PluginManifest;

export type Manifest = typeof manifest;
export default manifest;
