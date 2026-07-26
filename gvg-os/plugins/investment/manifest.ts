import type { PluginManifest } from "@gvg/sdk";

/**
 * Investment plugin manifest
 * @gvg/plugin-investment
 */
export const manifest = {
  id: "investment",
  name: "Investment",
  nameZh: "投資",
  version: "0.1.0",
  description: "Investment desk and portfolio views",
  tags: ["investment"],
} as const satisfies PluginManifest;

export type Manifest = typeof manifest;
export default manifest;
