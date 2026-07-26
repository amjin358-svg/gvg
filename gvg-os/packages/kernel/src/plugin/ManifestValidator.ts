/**
 * @gvg/kernel/plugin/ManifestValidator
 *
 * Boot stages: Load manifest → Validate
 */

import { PluginError } from "../errors/PluginError";
import type { GVGPlugin } from "./PluginContext";
import type { PluginManifest } from "./PluginManifest";

export class ManifestValidator {
  static validate(manifest: PluginManifest): void {
    if (!manifest.id) throw new Error("Plugin id missing.");
    if (!manifest.name) throw new Error("Plugin name missing.");
    if (!manifest.version) throw new Error("Plugin version missing.");
  }
}

export type ManifestValidationIssue = {
  code: string;
  message: string;
};

/** @deprecated alias — prefer ManifestValidationIssue */
export type PluginValidationIssue = ManifestValidationIssue;

export type ManifestValidationResult = {
  ok: boolean;
  issues: ManifestValidationIssue[];
};

/** @deprecated alias — prefer ManifestValidationResult */
export type PluginValidationResult = ManifestValidationResult;

/** Load manifest from a plugin */
export function loadManifest(plugin: GVGPlugin): PluginManifest {
  const manifest = plugin.manifest;
  if (!manifest) {
    throw new PluginError(`Missing manifest for plugin ${plugin.id}`, {
      pluginId: plugin.id,
      stage: "load_manifest",
    });
  }
  return manifest;
}

/** Soft-validate: returns issues instead of throwing */
export function validateManifest(
  manifest: PluginManifest | null | undefined,
): ManifestValidationResult {
  if (!manifest) {
    return {
      ok: false,
      issues: [{ code: "manifest.missing", message: "Manifest is required" }],
    };
  }

  try {
    ManifestValidator.validate(manifest);
    return { ok: true, issues: [] };
  } catch (err) {
    return {
      ok: false,
      issues: [
        {
          code: "manifest.invalid",
          message: err instanceof Error ? err.message : String(err),
        },
      ],
    };
  }
}

/** Validate plugin manifest (and that register exists) */
export function validatePlugin(plugin: GVGPlugin): ManifestValidationResult {
  const issues: ManifestValidationIssue[] = [
    ...validateManifest(plugin.manifest).issues,
  ];

  if (typeof plugin.register !== "function") {
    issues.push({
      code: "contract.register",
      message: "Plugin must implement register(app)",
    });
  }

  return { ok: issues.length === 0, issues };
}

/** Assert validation or throw PluginError (used by boot pipeline). */
export function assertValidPlugin(plugin: GVGPlugin): void {
  try {
    ManifestValidator.validate(loadManifest(plugin));
  } catch (err) {
    throw new PluginError(
      `Validation failed for ${plugin.id}: ${
        err instanceof Error ? err.message : String(err)
      }`,
      {
        pluginId: plugin.id,
        stage: "validate",
      },
    );
  }

  if (typeof plugin.register !== "function") {
    throw new PluginError(
      `Validation failed for ${plugin.id}: Plugin must implement register(app)`,
      { pluginId: plugin.id, stage: "validate" },
    );
  }
}
