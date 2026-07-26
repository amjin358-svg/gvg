/**
 * GET /api/plugins
 *
 * Catalog metadata (flag-aware). Full plugin objects load via @gvg/plugins when available.
 */

import {
  isModuleEnabled,
  listEnabledModules,
  listDisabledModules,
} from "@gvg/core";

export type PluginCatalogEntry = {
  id: string;
  name: string;
  version: string;
  description: string;
  tags: string[];
};

/** Mirrors packages/plugins catalog without hard-linking every plugin package. */
export const PLUGIN_DIRECTORY: PluginCatalogEntry[] = [
  {
    id: "marketplace",
    name: "Marketplace",
    version: "0.1.0",
    description: "Product discovery, suppliers, RFQ, procurement",
    tags: ["commerce"],
  },
  {
    id: "trade",
    name: "Trade",
    version: "0.1.0",
    description: "Import/export, Incoterms, customs documentation",
    tags: ["ops"],
  },
  {
    id: "procurement",
    name: "Procurement",
    version: "0.1.0",
    description: "RFQ, sourcing, OEM/ODM procurement",
    tags: ["commerce"],
  },
  {
    id: "warehouse",
    name: "Warehouse",
    version: "0.1.0",
    description: "WMS, inventory levels, warehouse ops",
    tags: ["ops"],
  },
  {
    id: "crm",
    name: "CRM",
    version: "0.1.0",
    description: "Accounts, contacts, opportunities",
    tags: ["ops"],
  },
  {
    id: "ai-center",
    name: "AI Center",
    version: "0.1.0",
    description: "AI Brain console and agent workflows",
    tags: ["ai"],
  },
  {
    id: "investment",
    name: "Investment",
    version: "0.1.0",
    description: "Investment desk and portfolio tools",
    tags: ["finance"],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    version: "0.1.0",
    description: "Property and project operations",
    tags: ["ops"],
  },
];

export function getPlugins() {
  const plugins = PLUGIN_DIRECTORY.map((plugin) => ({
    ...plugin,
    enabled: isModuleEnabled(plugin.id),
  }));

  return {
    total: plugins.length,
    enabled: listEnabledModules(),
    disabled: listDisabledModules(),
    plugins,
    checkedAt: new Date().toISOString(),
  };
}
