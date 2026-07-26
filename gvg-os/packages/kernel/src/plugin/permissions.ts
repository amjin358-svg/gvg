/**
 * @gvg/kernel/plugin/permissions
 *
 * Plugin permission contributions: define, merge, check, register.
 */

export type PermissionDefinition = {
  key: string;
  description?: string;
};

/** Minimal runtime slice used for permission registration */
export type PermissionsRuntime = {
  permissions: Map<string, PermissionDefinition[]>;
};

/** Normalize a permission key or definition */
export function definePermission(
  permission: string | PermissionDefinition,
): PermissionDefinition {
  if (typeof permission === "string") {
    if (!permission.trim()) {
      throw new Error("definePermission: key is required");
    }
    return { key: permission.trim() };
  }
  if (!permission.key?.trim()) {
    throw new Error("definePermission: key is required");
  }
  return {
    key: permission.key.trim(),
    description: permission.description,
  };
}

/** Deduplicate by key (first wins), preserving order. */
export function mergePermissions(
  ...groups: Array<Array<string | PermissionDefinition>>
): PermissionDefinition[] {
  const seen = new Set<string>();
  const out: PermissionDefinition[] = [];
  for (const group of groups) {
    for (const entry of group) {
      const permission = definePermission(entry);
      if (seen.has(permission.key)) continue;
      seen.add(permission.key);
      out.push(permission);
    }
  }
  return out;
}

/** True if the grant set includes the required key. */
export function hasPermission(
  grants: Array<string | PermissionDefinition>,
  required: string,
): boolean {
  const key = required.trim();
  if (!key) return false;
  return grants.some((g) => {
    const granted = typeof g === "string" ? g.trim() : g.key?.trim();
    return granted === key || granted === "*";
  });
}

/** True if every required key is granted. */
export function hasAllPermissions(
  grants: Array<string | PermissionDefinition>,
  required: string[],
): boolean {
  return required.every((key) => hasPermission(grants, key));
}

/** True if any required key is granted. */
export function hasAnyPermission(
  grants: Array<string | PermissionDefinition>,
  required: string[],
): boolean {
  return required.some((key) => hasPermission(grants, key));
}

/** Filter permissions whose keys match a prefix (e.g. "marketplace."). */
export function filterPermissionsByPrefix(
  permissions: PermissionDefinition[],
  prefix: string,
): PermissionDefinition[] {
  return permissions.filter((p) => p.key.startsWith(prefix));
}

/** Register a plugin's permissions into runtime. */
export function registerPluginPermissions(
  runtime: PermissionsRuntime,
  pluginId: string,
  permissions: Array<string | PermissionDefinition>,
): void {
  runtime.permissions.set(pluginId, permissions.map(definePermission));
}

/** Remove a plugin's permissions from runtime. */
export function unregisterPluginPermissions(
  runtime: PermissionsRuntime,
  pluginId: string,
): void {
  runtime.permissions.delete(pluginId);
}

/** Deduped flat list of all plugin permissions from runtime. */
export function getAllPermissions(
  runtime: PermissionsRuntime,
): PermissionDefinition[] {
  return mergePermissions(...Array.from(runtime.permissions.values()));
}

/** Resolve merged permissions for the runtime (optionally scoped by plugin ids). */
export function resolvePermissions(
  runtime: PermissionsRuntime,
  pluginIds?: string[],
): PermissionDefinition[] {
  if (!pluginIds?.length) return getAllPermissions(runtime);
  const groups: PermissionDefinition[][] = [];
  for (const id of pluginIds) {
    const list = runtime.permissions.get(id);
    if (list) groups.push(list);
  }
  return mergePermissions(...groups);
}
