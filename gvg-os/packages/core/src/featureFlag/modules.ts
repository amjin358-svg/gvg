/**
 * @gvg/core/featureFlag/modules — plugin / module enablement
 *
 * ai-center: true
 * marketplace: true
 * warehouse: false
 * crm: false
 * investment: false
 */

import { defineFlags, isEnabled, type FeatureFlag } from "./store";

export type ModuleFlagKey =
  | "marketplace"
  | "trade"
  | "procurement"
  | "warehouse"
  | "crm"
  | "ai-center"
  | "investment"
  | "real-estate";

/** Explicit module flags from product config */
export const MODULE_FLAGS: Record<ModuleFlagKey, boolean> = {
  "ai-center": true,
  marketplace: true,
  trade: true,
  procurement: true,
  warehouse: false,
  crm: false,
  investment: false,
  "real-estate": true,
};

export function moduleFlagDefs(): FeatureFlag[] {
  return (Object.entries(MODULE_FLAGS) as [ModuleFlagKey, boolean][]).map(
    ([key, enabled]) => ({
      key: `module.${key}`,
      enabled,
      description: `Enable ${key} module / plugin`,
    }),
  );
}

let seeded = false;

export function seedModuleFlags(): void {
  if (seeded) return;
  defineFlags(moduleFlagDefs());
  seeded = true;
}

/** Whether a workspace module / plugin is enabled */
export function isModuleEnabled(moduleId: string): boolean {
  seedModuleFlags();
  const key = `module.${moduleId}`;
  if (!isEnabled(key) && !(moduleId in MODULE_FLAGS)) {
    return true;
  }
  return isEnabled(key);
}

export function listEnabledModules(): ModuleFlagKey[] {
  seedModuleFlags();
  return (Object.keys(MODULE_FLAGS) as ModuleFlagKey[]).filter((id) =>
    isModuleEnabled(id),
  );
}

export function listDisabledModules(): ModuleFlagKey[] {
  seedModuleFlags();
  return (Object.keys(MODULE_FLAGS) as ModuleFlagKey[]).filter(
    (id) => !isModuleEnabled(id),
  );
}

seedModuleFlags();
