/**
 * @gvg/core/module/ModuleMetadata
 *
 * Declarative identity for an OS module (workspace capability).
 */

export type ModuleKind =
  | "workspace"
  | "commerce"
  | "ops"
  | "ai"
  | "admin"
  | "extension";

export type ModuleStatus = "registered" | "loaded" | "enabled" | "disabled" | "error";

export type ModuleMetadata = {
  id: string;
  name: string;
  nameZh?: string;
  version: string;
  description?: string;
  kind?: ModuleKind;
  /** Module ids that must load before this one */
  dependencies?: string[];
  /** Feature-flag key override; defaults to `module.{id}` */
  flagKey?: string;
  tags?: string[];
  href?: string;
  icon?: string;
};

export function defineModuleMetadata(
  input: ModuleMetadata,
): ModuleMetadata {
  if (!input.id?.trim()) throw new Error("ModuleMetadata.id is required");
  if (!input.name?.trim()) throw new Error("ModuleMetadata.name is required");
  if (!input.version?.trim()) {
    throw new Error("ModuleMetadata.version is required");
  }
  return {
    ...input,
    id: input.id.trim(),
    name: input.name.trim(),
    version: input.version.trim(),
    dependencies: input.dependencies ? [...input.dependencies] : undefined,
    tags: input.tags ? [...input.tags] : undefined,
  };
}

export function moduleFlagKey(meta: ModuleMetadata): string {
  return meta.flagKey ?? `module.${meta.id}`;
}
