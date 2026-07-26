/** Compat: @gvg/kernel/registry → PluginRegistry service APIs */
export {
  register,
  unregister,
  resolve,
  list,
  clearRegistry,
  PluginRegistry,
} from "../plugin/PluginRegistry";
export type { RegistryEntry } from "../plugin/PluginRegistry";
