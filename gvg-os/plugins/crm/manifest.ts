import type { PluginManifest } from "@gvg/sdk";

/**
 * CRM plugin manifest
 * @gvg/plugin-crm
 */
export const manifest = {
  id: "crm",
  name: "CRM",
  nameZh: "客戶關係",
  version: "0.1.0",
  description: "Accounts, contacts, opportunities",
  tags: ["crm"],
} as const satisfies PluginManifest;

export type Manifest = typeof manifest;
export default manifest;
