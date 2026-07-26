/**
 * Plugin catalog — scan target for PluginHost
 * Mirrors plugins/ discovery at boot.
 */

import type { GVGPlugin } from "@gvg/sdk";
import { plugin as marketplace } from "@gvg/plugin-marketplace";
import { plugin as trade } from "@gvg/plugin-trade";
import { plugin as procurement } from "@gvg/plugin-procurement";
import { plugin as warehouse } from "@gvg/plugin-warehouse";
import { plugin as crm } from "@gvg/plugin-crm";
import { plugin as aiCenter } from "@gvg/plugin-ai-center";
import { plugin as investment } from "@gvg/plugin-investment";
import { plugin as realEstate } from "@gvg/plugin-real-estate";

/** All discoverable GVG plugins under plugins/ */
export const PLUGIN_CATALOG: GVGPlugin[] = [
  marketplace,
  trade,
  procurement,
  warehouse,
  crm,
  aiCenter,
  investment,
  realEstate,
];

export {
  marketplace,
  trade,
  procurement,
  warehouse,
  crm,
  aiCenter,
  investment,
  realEstate,
};

export default PLUGIN_CATALOG;
