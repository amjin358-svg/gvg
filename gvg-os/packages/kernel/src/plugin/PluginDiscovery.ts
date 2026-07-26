/**
 * @gvg/kernel/plugin/PluginDiscovery
 *
 * Boot stage: Scan plugins/
 *
 * Filesystem discovery reads each `plugins/<name>/plugin.json`.
 * In-memory helpers scan an assembled GVGPlugin catalog for boot.
 */

import fs from "node:fs";
import path from "node:path";
import { PluginError } from "../errors/PluginError";
import { ManifestValidator } from "./ManifestValidator";
import type { PluginManifest } from "./PluginManifest";
import type { GVGPlugin } from "./PluginContext";

export type PluginDiscoveryOptions = {
  /** Only these plugin ids (if set) */
  include?: string[];
  /** Drop these plugin ids */
  exclude?: string[];
};

export type PluginDiscoveryResult = {
  /** Plugins that passed scan + filters */
  plugins: GVGPlugin[];
  /** Ids that were accepted */
  scanned: string[];
  /** Ids present in catalog but filtered out */
  skipped: string[];
};

export class PluginDiscovery {
  /**
   * Scan `pluginRoot` for folders containing `plugin.json`.
   * Validates each manifest before returning.
   */
  static discover(pluginRoot: string): PluginManifest[] {
    const manifests: PluginManifest[] = [];

    if (!fs.existsSync(pluginRoot)) {
      return manifests;
    }

    const folders = fs.readdirSync(pluginRoot);

    for (const folder of folders) {
      const dir = path.join(pluginRoot, folder);
      if (!fs.statSync(dir).isDirectory()) continue;

      const manifestFile = path.join(dir, "plugin.json");
      if (!fs.existsSync(manifestFile)) continue;

      const manifest = JSON.parse(
        fs.readFileSync(manifestFile, "utf8"),
      ) as PluginManifest;

      ManifestValidator.validate(manifest);
      manifests.push(manifest);
    }

    return manifests;
  }
}

/**
 * Scan a plugin catalog: drop invalid entries, reject duplicate ids.
 */
export function scanPlugins(plugins: GVGPlugin[]): GVGPlugin[] {
  const seen = new Set<string>();
  const scanned: GVGPlugin[] = [];

  for (const plugin of plugins) {
    if (!plugin?.id || !plugin.manifest) continue;
    if (seen.has(plugin.id)) {
      throw new PluginError(`Duplicate plugin id during scan: ${plugin.id}`, {
        pluginId: plugin.id,
        stage: "scan",
      });
    }
    seen.add(plugin.id);
    scanned.push(plugin);
  }

  return scanned;
}

/**
 * Apply include / exclude filters after scan.
 */
export function filterDiscoveredPlugins(
  plugins: GVGPlugin[],
  options: PluginDiscoveryOptions = {},
): GVGPlugin[] {
  let list = plugins;
  if (options.include?.length) {
    const allow = new Set(options.include);
    list = list.filter((p) => allow.has(p.id));
  }
  if (options.exclude?.length) {
    const deny = new Set(options.exclude);
    list = list.filter((p) => !deny.has(p.id));
  }
  return list;
}

/**
 * Full in-memory discovery pass: scan → filter → report.
 */
export function discoverPlugins(
  catalog: GVGPlugin[],
  options: PluginDiscoveryOptions = {},
): PluginDiscoveryResult {
  const scanned = scanPlugins(catalog);
  const plugins = filterDiscoveredPlugins(scanned, options);
  const accepted = new Set(plugins.map((p) => p.id));
  const skipped = scanned.map((p) => p.id).filter((id) => !accepted.has(id));

  return {
    plugins,
    scanned: plugins.map((p) => p.id),
    skipped,
  };
}
