/**
 * Client/server plugin bootstrap for admin.
 *
 * Boot → Load Plugins → Generate Menu → Generate Routes →
 * Generate Dashboard → Inject Permission → Ready
 */

import { bootGVGPlugins } from "@gvg/plugins/boot";
import type { BootReport, BootStage, PluginHost } from "@gvg/kernel/plugin/host";

export type PluginLoadProgress = {
  stage: BootStage | "idle";
  message: string;
  booted: string[];
  failed: string[];
};

declare global {
  // eslint-disable-next-line no-var
  var __gvgPluginHost: PluginHost | undefined;
  // eslint-disable-next-line no-var
  var __gvgPluginBoot: BootReport | undefined;
  // eslint-disable-next-line no-var
  var __gvgPluginBootPromise:
    | Promise<{ report: BootReport; host: PluginHost }>
    | undefined;
}

const STAGE_MESSAGE: Partial<Record<BootStage, string>> = {
  boot: "Boot…",
  application_boot: "Boot…",
  start: "Boot…",
  load_plugins: "Loading plugins…",
  scan: "Loading plugins…",
  load_manifest: "Loading plugins…",
  validate: "Loading plugins…",
  register: "Loading plugins…",
  boot_plugin: "Loading plugins…",
  generate_menu: "Generating menu…",
  generate_routes: "Generating routes…",
  generate_dashboard: "Generating dashboard…",
  inject_permission: "Injecting permissions…",
  ready: "Ready",
  error: "Boot failed",
};

export async function ensurePluginsBooted(options?: {
  onProgress?: (progress: PluginLoadProgress) => void;
}): Promise<{ report: BootReport; host: PluginHost }> {
  if (globalThis.__gvgPluginHost && globalThis.__gvgPluginBoot) {
    options?.onProgress?.({
      stage: "ready",
      message: STAGE_MESSAGE.ready ?? "Ready",
      booted: globalThis.__gvgPluginBoot.booted.map((b) => b.pluginId),
      failed: globalThis.__gvgPluginBoot.failed.map((b) => b.pluginId),
    });
    return {
      report: globalThis.__gvgPluginBoot,
      host: globalThis.__gvgPluginHost,
    };
  }

  if (!globalThis.__gvgPluginBootPromise) {
    globalThis.__gvgPluginBootPromise = bootGVGPlugins({
      onStage(stage, detail) {
        const id = typeof detail?.id === "string" ? detail.id : undefined;
        options?.onProgress?.({
          stage,
          message: id
            ? `${STAGE_MESSAGE[stage] ?? stage} (${id})`
            : (STAGE_MESSAGE[stage] ?? stage),
          booted: [],
          failed: [],
        });
      },
    }).then((result) => {
      globalThis.__gvgPluginHost = result.host;
      globalThis.__gvgPluginBoot = result.report;
      options?.onProgress?.({
        stage: result.report.stage,
        message: STAGE_MESSAGE[result.report.stage] ?? result.report.stage,
        booted: result.report.booted.map((b) => b.pluginId),
        failed: result.report.failed.map((b) => b.pluginId),
      });
      return result;
    });
  }

  return globalThis.__gvgPluginBootPromise;
}

export function getBootedPluginHost(): PluginHost | null {
  return globalThis.__gvgPluginHost ?? null;
}

export function getBootReport(): BootReport | null {
  return globalThis.__gvgPluginBoot ?? null;
}
