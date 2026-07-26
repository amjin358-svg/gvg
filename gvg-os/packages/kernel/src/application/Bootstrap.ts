/** @gvg/kernel/application/Bootstrap */

import { Config, type GvgConfig } from "../config/Config";
import { EventBus } from "../event/EventBus";
import { createLogger, type Logger } from "../logger/Logger";
import {
  createPluginLoader,
  type BootReport,
  type PluginHostOptions,
  type PluginLoader,
} from "../plugin/PluginLoader";
import type { GVGPlugin } from "../plugin/PluginContext";
import { Lifecycle } from "./Lifecycle";

export type BootstrapOptions = {
  config?: Partial<GvgConfig>;
  plugins?: GVGPlugin[];
  logger?: Logger;
  events?: EventBus;
  hostOptions?: PluginHostOptions;
};

export type BootstrapResult = {
  report: BootReport;
  loader: PluginLoader;
  lifecycle: Lifecycle;
};

/**
 * Kernel bootstrap entry (plugin host start).
 *
 * Full OS pipeline lives in @gvg/core/application:
 *   Application → Bootstrap → Container → Runtime Context →
 *   Module Registry → Plugin Registry → Event Pipeline →
 *   Navigation → Dashboard → Ready
 */
export class Bootstrap {
  static async run(options: BootstrapOptions = {}): Promise<BootstrapResult> {
    const lifecycle = new Lifecycle();
    lifecycle.transition("bootstrapping");

    if (options.config) Config.set(options.config);

    const logger =
      options.logger ?? createLogger({ scope: "kernel.bootstrap" });
    const events = options.events ?? new EventBus();
    const loader = createPluginLoader(options.plugins ?? []);

    try {
      logger.info("bootstrap start", { plugins: loader.list().length });
      const report = await loader.start(options.hostOptions);
      await events.publish("app.booted", {
        booted: report.booted.length,
        failed: report.failed.length,
      });

      if (report.stage === "error") {
        lifecycle.transition("failed");
      } else {
        lifecycle.transition("ready");
      }

      logger.info("bootstrap complete", {
        stage: report.stage,
        booted: report.booted.length,
        failed: report.failed.length,
      });

      return { report, loader, lifecycle };
    } catch (error) {
      lifecycle.transition("failed");
      throw error;
    }
  }
}
