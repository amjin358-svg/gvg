/**
 * @gvg/kernel/plugin/navigation
 *
 * Plugin navigation contributions: define, flatten, filter, merge, register.
 */

export type NavigationItem = {
  label: string;
  href: string;
  roles?: string[];
  icon?: string;
  children?: NavigationItem[];
};

/** @deprecated use NavigationItem */
export type PluginNavItem = NavigationItem;

/** Minimal runtime slice used for navigation registration */
export type NavigationRuntime = {
  navigation: Map<string, NavigationItem[]>;
};

/** Normalize a navigation item (and children). */
export function defineNavigation(item: NavigationItem): NavigationItem {
  if (!item.label?.trim()) {
    throw new Error("defineNavigation: label is required");
  }
  if (!item.href?.startsWith("/")) {
    throw new Error(`defineNavigation: href must start with "/": ${item.href}`);
  }
  return {
    label: item.label.trim(),
    href: item.href,
    roles: item.roles,
    icon: item.icon,
    children: item.children?.map(defineNavigation),
  };
}

/** Flatten a navigation tree to leaf/link entries (depth-first). */
export function flattenNavigation(items: NavigationItem[]): NavigationItem[] {
  const out: NavigationItem[] = [];
  for (const item of items) {
    const { children, ...rest } = item;
    out.push(rest);
    if (children?.length) {
      out.push(...flattenNavigation(children));
    }
  }
  return out;
}

/** Keep items (and children) visible to any of the given roles. */
export function filterNavigationByRoles(
  items: NavigationItem[],
  roles: string[],
): NavigationItem[] {
  if (!roles.length) return items;
  const allow = new Set(roles);

  function visible(item: NavigationItem): boolean {
    if (!item.roles?.length) return true;
    return item.roles.some((r) => allow.has(r));
  }

  return items
    .filter(visible)
    .map((item) => ({
      ...item,
      children: item.children
        ? filterNavigationByRoles(item.children, roles)
        : undefined,
    }));
}

/** Deduplicate by href (first wins), preserving order. */
export function mergeNavigation(
  ...groups: NavigationItem[][]
): NavigationItem[] {
  const seen = new Set<string>();
  const out: NavigationItem[] = [];
  for (const group of groups) {
    for (const item of flattenNavigation(group)) {
      if (seen.has(item.href)) continue;
      seen.add(item.href);
      out.push(item);
    }
  }
  return out;
}

/** Register a plugin's navigation into runtime. */
export function registerPluginNavigation(
  runtime: NavigationRuntime,
  pluginId: string,
  items: NavigationItem[],
): void {
  runtime.navigation.set(pluginId, items.map(defineNavigation));
}

/** Remove a plugin's navigation from runtime. */
export function unregisterPluginNavigation(
  runtime: NavigationRuntime,
  pluginId: string,
): void {
  runtime.navigation.delete(pluginId);
}

/** Flat list of all plugin navigation from runtime. */
export function getAllNavigation(
  runtime: NavigationRuntime,
): NavigationItem[] {
  return Array.from(runtime.navigation.values()).flat();
}

/** Flat merged navigation, optionally filtered by roles. */
export function resolveNavigation(
  runtime: NavigationRuntime,
  roles?: string[],
): NavigationItem[] {
  const merged = mergeNavigation(...Array.from(runtime.navigation.values()));
  return roles?.length ? filterNavigationByRoles(merged, roles) : merged;
}
