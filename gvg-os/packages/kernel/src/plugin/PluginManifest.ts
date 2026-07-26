/**
 * @gvg/kernel/plugin/PluginManifest
 *
 * Required surface validated at boot:
 *   id · version · dependencies · permissions · routes · navigation
 */

export type {
  NavigationItem,
  PluginNavItem,
} from "./navigation";

export type {
  RouteDefinition,
  PluginRoute,
} from "./routes";

export type { PermissionDefinition } from "./permissions";

/** Fields ManifestValidator checks */
export const MANIFEST_FIELDS = [
  "id",
  "version",
  "dependencies",
  "permissions",
  "routes",
  "navigation",
] as const;

export type ManifestField = (typeof MANIFEST_FIELDS)[number];

/**
 * Canonical plugin manifest (declarative catalog entry).
 * Rich route/nav objects live on plugin.routes() / plugin.navigation().
 */
export interface PluginManifest {
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: string;
  dependencies?: string[];
  permissions?: string[];
  /** Declared route paths, e.g. "/marketplace" */
  routes?: string[];
  /** Declared navigation hrefs, e.g. "/marketplace/products" */
  navigation?: string[];
  enabled?: boolean;
  /** Optional localized name */
  nameZh?: string;
  /** Optional catalog tags */
  tags?: string[];
}

export function isValidManifest(
  manifest: PluginManifest | null | undefined,
): manifest is PluginManifest {
  return Boolean(manifest?.id && manifest.version && manifest.name);
}

/** Normalize manifest route declarations to path strings. */
export function manifestRoutePaths(
  routes: PluginManifest["routes"],
): string[] {
  return (routes ?? []).map((r) => r.trim()).filter(Boolean);
}

/** Normalize manifest navigation declarations to href strings. */
export function manifestNavigationHrefs(
  navigation: PluginManifest["navigation"],
): string[] {
  return (navigation ?? []).map((n) => n.trim()).filter(Boolean);
}
