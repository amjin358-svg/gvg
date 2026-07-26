/**
 * @gvg/core/application/ApplicationPipeline
 *
 * Canonical GVG OS application boot pipeline:
 *
 *   Application
 *     ↓
 *   Bootstrap
 *     ↓
 *   Container
 *     ↓
 *   Runtime Context
 *     ↓
 *   Module Registry
 *     ↓
 *   Plugin Registry
 *     ↓
 *   Event Pipeline
 *     ↓
 *   Navigation
 *     ↓
 *   Dashboard
 *     ↓
 *   Ready
 */

import {
  Application,
  createApp,
  Lifecycle,
  type ApplicationOptions,
} from "@gvg/kernel/application";
import type {
  BootReport,
  DashboardWidget,
  GVGPlugin,
  NavigationItem,
} from "@gvg/kernel/plugin/host";
import {
  Container,
  createContainer,
  type Provider,
} from "../container";
import {
  EventPipeline,
  createEventPipeline,
  timingMiddleware,
} from "../event";
import {
  ModuleLoader,
  createIsolatedModuleLoader,
  defineModule,
  type GvgModule,
  type ModuleLoadReport,
} from "../module";
import { getEnabledWorkspaceNav, type WorkspaceNavItem } from "../navigation";
import {
  bootstrapApplicationContext,
  createRuntimeContext,
  type ApplicationContext,
  type RuntimeContext,
} from "../runtime";

export const APPLICATION_PIPELINE = [
  "application",
  "bootstrap",
  "container",
  "runtime_context",
  "module_registry",
  "plugin_registry",
  "event_pipeline",
  "navigation",
  "dashboard",
  "ready",
] as const;

export type ApplicationPipelineStage = (typeof APPLICATION_PIPELINE)[number];

export type ApplicationPipelineOptions = ApplicationOptions & {
  modules?: GvgModule[];
  providers?: Provider[];
  /** Skip plugin boot (useful for unit tests) */
  skipPlugins?: boolean;
  hostOptions?: Parameters<Application["boot"]>[0];
  onStage?: (
    stage: ApplicationPipelineStage,
    detail?: Record<string, unknown>,
  ) => void;
};

export type ApplicationPipelineResult = {
  stage: ApplicationPipelineStage;
  application: Application;
  lifecycle: Lifecycle;
  container: Container;
  runtime: RuntimeContext;
  applicationContext: ApplicationContext;
  moduleLoader: ModuleLoader;
  moduleReport: ModuleLoadReport;
  pluginReport: BootReport | null;
  events: EventPipeline;
  navigation: WorkspaceNavItem[];
  pluginNavigation: NavigationItem[];
  dashboard: DashboardWidget[];
  ready: boolean;
  stages: ApplicationPipelineStage[];
};

function stageLabel(stage: ApplicationPipelineStage): string {
  return stage
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function describeApplicationPipeline(): string {
  return APPLICATION_PIPELINE.map(stageLabel).join(" → ");
}

/**
 * Run the full OS application pipeline.
 */
export async function runApplicationPipeline(
  options: ApplicationPipelineOptions = {},
): Promise<ApplicationPipelineResult> {
  const onStage = options.onStage;
  const visited: ApplicationPipelineStage[] = [];

  const mark = (
    stage: ApplicationPipelineStage,
    detail?: Record<string, unknown>,
  ) => {
    if (!visited.includes(stage)) visited.push(stage);
    onStage?.(stage, detail);
  };

  // Application
  mark("application");
  const application = createApp({
    config: options.config,
    plugins: options.plugins,
    logger: options.logger,
  });
  mark("application", { name: application.name });

  // Bootstrap
  mark("bootstrap");
  application.lifecycle.transition("bootstrapping");
  mark("bootstrap", { state: application.lifecycle.getState() });

  // Container
  mark("container");
  const container = createContainer();
  if (options.providers?.length) {
    container.registerAll(options.providers);
  }
  container.register({
    token: "gvg.application",
    useValue: application,
  });
  mark("container", { tokens: container.listTokens().length });

  // Runtime Context
  mark("runtime_context");
  const applicationContext = bootstrapApplicationContext({
    name: application.name,
    version: application.version,
  });
  const runtime = createRuntimeContext({
    application: applicationContext,
  });
  container.register({
    token: "gvg.runtime",
    useValue: runtime,
  });
  mark("runtime_context", { appId: applicationContext.appId });

  // Module Registry
  mark("module_registry");
  const moduleLoader = createIsolatedModuleLoader({ respectFlags: true });
  const seedModules =
    options.modules ??
    defaultModulesFromPlugins(options.plugins ?? application.loader.list());
  const moduleReport = await moduleLoader.load(seedModules);
  mark("module_registry", {
    loaded: moduleReport.loaded.length,
    enabled: moduleReport.enabled.length,
    failed: moduleReport.failed.length,
  });

  // Plugin Registry
  mark("plugin_registry");
  let pluginReport: BootReport | null = null;
  if (!options.skipPlugins) {
    pluginReport = await application.boot(options.hostOptions);
  } else if (options.plugins?.length) {
    application.loader.catalog(options.plugins);
  }
  mark("plugin_registry", {
    plugins: application.loader.list().length,
    booted: pluginReport?.booted.length ?? 0,
    failed: pluginReport?.failed.length ?? 0,
  });

  // Event Pipeline
  mark("event_pipeline");
  const events = createEventPipeline().use(timingMiddleware());
  container.register({
    token: "gvg.events",
    useValue: events,
  });
  await events.publish("os.pipeline.event_pipeline", {
    application: application.name,
  });
  mark("event_pipeline", { ok: true });

  // Navigation
  mark("navigation");
  const navigation = getEnabledWorkspaceNav();
  const pluginNavigation = pluginReport?.composed.menu ?? [];
  mark("navigation", {
    workspace: navigation.length,
    plugins: pluginNavigation.length,
  });

  // Dashboard
  mark("dashboard");
  const dashboard = pluginReport?.composed.dashboard ?? [];
  mark("dashboard", { widgets: dashboard.length });

  // Ready
  mark("ready");
  if (!options.skipPlugins && pluginReport?.stage === "error") {
    application.lifecycle.transition("failed");
  } else {
    application.lifecycle.transition("ready");
  }
  const ready = application.lifecycle.isReady();
  await events.publish("os.pipeline.ready", {
    ready,
    stages: [...visited],
  });
  onStage?.("ready", { ready, state: application.lifecycle.getState() });

  return {
    stage: ready ? "ready" : "plugin_registry",
    application,
    lifecycle: application.lifecycle,
    container,
    runtime,
    applicationContext,
    moduleLoader,
    moduleReport,
    pluginReport,
    events,
    navigation,
    pluginNavigation,
    dashboard,
    ready,
    stages: [...APPLICATION_PIPELINE],
  };
}

function defaultModulesFromPlugins(plugins: GVGPlugin[]): GvgModule[] {
  return plugins.map((plugin) =>
    defineModule({
      id: plugin.id,
      name: plugin.name,
      version: plugin.version,
      description: plugin.manifest.description,
      kind: "extension",
      dependencies: plugin.manifest.dependencies,
      tags: plugin.manifest.tags,
    }),
  );
}

export class ApplicationPipeline {
  static readonly stages = APPLICATION_PIPELINE;
  static describe = describeApplicationPipeline;
  static run = runApplicationPipeline;
}
