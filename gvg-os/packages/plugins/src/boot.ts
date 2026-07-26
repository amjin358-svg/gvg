/**
 * Boot GVG OS plugins
 *
 * OS application pipeline (@gvg/core):
 *   Application → Bootstrap → Container → Runtime Context →
 *   Module Registry → Plugin Registry → Event Pipeline →
 *   Navigation → Dashboard → Ready
 *
 * Plugin host composition (within Plugin Registry):
 *   Boot → Load Plugins → Generate Menu → Generate Routes →
 *   Generate Dashboard → Inject Permission → Ready
 *
 * Module flags gate which plugins boot (e.g. warehouse/crm/investment off).
 */

import {
  createPluginHost,
  type BootReport,
  type PluginHost,
  type PluginHostOptions,
} from "@gvg/kernel/plugin/host";
import { isModuleEnabled, listDisabledModules } from "@gvg/core/featureFlag";
import { PLUGIN_CATALOG } from "./catalog";

export async function bootGVGPlugins(
  options: PluginHostOptions = {},
): Promise<{ report: BootReport; host: PluginHost }> {
  const disabled = listDisabledModules();
  const exclude = [...(options.exclude ?? []), ...disabled];

  const catalog = PLUGIN_CATALOG.filter((p) => isModuleEnabled(p.id));
  const host = createPluginHost(catalog);

  const report = await host.start({
    ...options,
    exclude,
    onStage(stage, detail) {
      options.onStage?.(stage, detail);

      switch (stage) {
        case "boot":
        case "application_boot":
        case "start":
          console.info("[gvg] boot");
          if (disabled.length) {
            console.info(`[gvg] module flags off → ${disabled.join(", ")}`);
          }
          break;
        case "load_plugins":
        case "scan":
          console.info(`[gvg] load plugins → ${detail?.count ?? 0}`);
          break;
        case "generate_menu":
          console.info(`[gvg] generate menu → ${detail?.count ?? 0}`);
          break;
        case "generate_routes":
          console.info(`[gvg] generate routes → ${detail?.count ?? 0}`);
          break;
        case "generate_dashboard":
          console.info(`[gvg] generate dashboard → ${detail?.count ?? 0}`);
          break;
        case "inject_permission":
          console.info(`[gvg] inject permission → ${detail?.count ?? 0}`);
          break;
        case "ready":
          console.info(
            `[gvg] ready → plugins=${detail?.booted ?? 0} menu=${detail?.menu ?? 0} routes=${detail?.routes ?? 0}`,
          );
          break;
        case "error":
          console.error("[gvg] plugin host error", detail);
          break;
      }
    },
  });

  return { report, host };
}

export { createPluginHost, PLUGIN_CATALOG };
