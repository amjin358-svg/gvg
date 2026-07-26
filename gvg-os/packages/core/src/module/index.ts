/**
 * @gvg/core/module — OS module metadata, registry, and loader
 */

export {
  defineModuleMetadata,
  moduleFlagKey,
} from "./ModuleMetadata";
export type {
  ModuleKind,
  ModuleStatus,
  ModuleMetadata,
} from "./ModuleMetadata";

export {
  defineModule,
  createDefaultModuleContext,
} from "./Module";
export type {
  GvgModule,
  Module,
  ModuleContext,
  ModuleRecord,
  DefineModuleInput,
} from "./Module";

export {
  ModuleRegistry,
  getModuleRegistry,
  resetModuleRegistry,
  createModuleRegistry,
} from "./ModuleRegistry";

export {
  ModuleLoader,
  createModuleLoader,
  createIsolatedModuleLoader,
  sortModulesByDependencies,
} from "./ModuleLoader";
export type {
  ModuleLoadReport,
  ModuleLoaderOptions,
} from "./ModuleLoader";
