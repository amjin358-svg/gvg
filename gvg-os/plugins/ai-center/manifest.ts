import type { PluginManifest } from "@gvg/sdk";

/**
 * AI Center plugin manifest
 * @gvg/plugin-ai-center
 */
export const manifest = {
  id: "ai-center",
  name: "AI Center",
  nameZh: "AI 中心",
  version: "0.1.0",
  description: "AI Brain console and agent workflows",
  tags: ["ai"],
} as const satisfies PluginManifest;

export type Manifest = typeof manifest;
export default manifest;
