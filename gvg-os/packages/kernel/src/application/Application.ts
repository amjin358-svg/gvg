/** @gvg/kernel/application/Application */

import { Config, getConfig, setConfig, type GvgConfig } from "../config/Config";
import { EventBus } from "../event/EventBus";
import { createLogger, type Logger } from "../logger/Logger";
import type { GVGPlugin } from "../plugin/PluginContext";
import {
  createPluginLoader,
  type BootReport,
  type PluginHostOptions,
  type PluginLoader,
} from "../plugin/PluginLoader";
import { Lifecycle } from "./Lifecycle";

export type ApplicationOptions = {
  config?: Partial<GvgConfig>;
  plugins?: GVGPlugin[];
  logger?: Logger;
};

export class Application {
  readonly name: string;
  readonly version = "0.1.0";
  readonly logger: Logger;
  readonly events: EventBus;
  readonly lifecycle = new Lifecycle();
  readonly loader: PluginLoader;

  /** @deprecated use loader */
  get host(): PluginLoader {
    return this.loader;
  }

  constructor(options: ApplicationOptions = {}) {
    if (options.config) setConfig(options.config);
    const config = getConfig();
    this.name = config.appName;
    this.logger = options.logger ?? createLogger({ scope: "kernel.app" });
    this.events = new EventBus();
    this.loader = createPluginLoader(options.plugins ?? []);
  }

  config(): GvgConfig {
    return Config.get();
  }

  async boot(options: PluginHostOptions = {}): Promise<BootReport> {
    this.lifecycle.transition("bootstrapping");
    this.logger.info("application boot", {
      plugins: this.loader.list().length,
    });

    try {
      // Application → Bootstrap → Container → Runtime Context →
      // Module Registry → Plugin Registry → Event Pipeline →
      // Navigation → Dashboard → Ready
      // (full orchestration: @gvg/core runApplicationPipeline)
      const report = await this.loader.start(options);
      await this.events.publish("app.booted", {
        booted: report.booted.length,
        failed: report.failed.length,
        menu: report.composed.menu.length,
        routes: report.composed.routes.length,
        dashboard: report.composed.dashboard.length,
        permissions: report.composed.permissions.length,
      });

      this.lifecycle.transition(report.stage === "error" ? "failed" : "ready");
      this.logger.info("application boot ready", {
        booted: report.booted.length,
        failed: report.failed.length,
      });
      return report;
    } catch (error) {
      this.lifecycle.transition("failed");
      throw error;
    }
  }

  async shutdown(): Promise<void> {
    this.lifecycle.transition("shutting_down");
    await this.loader.shutdown();
    await this.events.publish("app.shutdown", {});
    this.lifecycle.transition("stopped");
    this.logger.info("application shutdown");
  }

  on(type: string, handler: (event: unknown) => void | Promise<void>) {
    return this.events.on(type, handler);
  }

  emit(type: string, event: unknown) {
    return this.events.emit(type, event);
  }
}

/** Factory used by older call sites */
export function createApp(options: ApplicationOptions = {}): Application {
  return new Application(options);
}

/** @deprecated aliases */
export type KernelApp = Application;
export type KernelAppOptions = ApplicationOptions;
