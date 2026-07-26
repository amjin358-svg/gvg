/**
 * @gvg/core/module/Module
 *
 * OS module contract — domain capability registered into ModuleRegistry.
 */

import {
  defineModuleMetadata,
  type ModuleMetadata,
  type ModuleStatus,
} from "./ModuleMetadata";

export type ModuleContext = {
  config: Record<string, unknown>;
  logger?: {
    info: (msg: string, meta?: Record<string, unknown>) => void;
    warn?: (msg: string, meta?: Record<string, unknown>) => void;
    error?: (msg: string, meta?: Record<string, unknown>) => void;
  };
};

export type GvgModule = {
  metadata: ModuleMetadata;
  /** Called once when the module is registered into the registry */
  register?(ctx: ModuleContext): void | Promise<void>;
  /** Called when the module is loaded into the runtime */
  onLoad?(ctx: ModuleContext): void | Promise<void>;
  /** Called when the module is enabled */
  onEnable?(ctx: ModuleContext): void | Promise<void>;
  /** Called when the module is disabled */
  onDisable?(ctx: ModuleContext): void | Promise<void>;
  /** Called on unload / shutdown */
  onUnload?(ctx: ModuleContext): void | Promise<void>;
};

export type ModuleRecord = {
  module: GvgModule;
  status: ModuleStatus;
  error?: string;
  loadedAt?: string;
  enabledAt?: string;
};

export type DefineModuleInput = ModuleMetadata & {
  register?: GvgModule["register"];
  onLoad?: GvgModule["onLoad"];
  onEnable?: GvgModule["onEnable"];
  onDisable?: GvgModule["onDisable"];
  onUnload?: GvgModule["onUnload"];
};

export function defineModule(input: DefineModuleInput): GvgModule {
  const metadata = defineModuleMetadata({
    id: input.id,
    name: input.name,
    nameZh: input.nameZh,
    version: input.version,
    description: input.description,
    kind: input.kind,
    dependencies: input.dependencies,
    flagKey: input.flagKey,
    tags: input.tags,
    href: input.href,
    icon: input.icon,
  });

  return {
    metadata,
    register: input.register,
    onLoad: input.onLoad,
    onEnable: input.onEnable,
    onDisable: input.onDisable,
    onUnload: input.onUnload,
  };
}

export function createDefaultModuleContext(
  partial: Partial<ModuleContext> = {},
): ModuleContext {
  return {
    config: partial.config ?? {},
    logger: partial.logger,
  };
}

/** @deprecated alias */
export type Module = GvgModule;
