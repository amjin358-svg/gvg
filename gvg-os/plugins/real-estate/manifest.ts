import type { PluginManifest } from "@gvg/sdk";

/**
 * Real Estate plugin manifest
 * @gvg/plugin-real-estate
 */
export const manifest = {
  id: "real-estate",
  name: "Real Estate",
  nameZh: "不動產",
  version: "0.1.0",
  description: "Property and real-estate trade modules",
  tags: ["real-estate"],
} as const satisfies PluginManifest;

export type Manifest = typeof manifest;
export default manifest;
