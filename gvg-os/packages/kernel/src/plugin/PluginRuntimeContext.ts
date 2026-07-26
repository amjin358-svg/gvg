/**
 * @gvg/kernel/plugin/PluginRuntimeContext
 *
 * Per-plugin runtime identity: manifest · public state · load path.
 */

import type { PluginManifest } from "./PluginManifest";
import { PluginState } from "./PluginState";

export interface PluginRuntimeContext {
  manifest: PluginManifest;
  state: PluginState;
  /** Filesystem or package path where the plugin was discovered/loaded */
  path: string;
  loadedAt?: Date;
}

export type CreatePluginRuntimeContextInput = {
  manifest: PluginManifest;
  state?: PluginState;
  path?: string;
  loadedAt?: Date;
};

export function createPluginRuntimeContext(
  input: CreatePluginRuntimeContextInput,
): PluginRuntimeContext {
  const id = input.manifest.id;
  return {
    manifest: input.manifest,
    state: input.state ?? PluginState.Installed,
    path: input.path ?? `plugins/${id}`,
    loadedAt: input.loadedAt,
  };
}

/** Derive plugin id from runtime context. */
export function pluginIdFromContext(ctx: PluginRuntimeContext): string {
  return ctx.manifest.id;
}
