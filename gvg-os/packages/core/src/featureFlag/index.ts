/** @gvg/core/featureFlag — feature flag evaluation */

export {
  defineFlag,
  defineFlags,
  isEnabled,
  setFlag,
  listFlags,
  clearFlags,
} from "./store";
export type { FeatureFlag } from "./store";

export {
  MODULE_FLAGS,
  seedModuleFlags,
  isModuleEnabled,
  listEnabledModules,
  listDisabledModules,
  moduleFlagDefs,
} from "./modules";
export type { ModuleFlagKey } from "./modules";
