/**
 * @gvg/kernel/plugin/routes
 *
 * Plugin route contributions: define, merge, filter, match, register.
 */

export type RouteDefinition = {
  path: string;
  component: string;
  title?: string;
  auth?: boolean;
  roles?: string[];
};

/** @deprecated use RouteDefinition */
export type PluginRoute = RouteDefinition;

/** Minimal runtime slice used for route registration */
export type RoutesRuntime = {
  routes: Map<string, RouteDefinition[]>;
};

/** Normalize and validate a route definition */
export function defineRoute(route: RouteDefinition): RouteDefinition {
  if (!route.path?.startsWith("/")) {
    throw new Error(`defineRoute: path must start with "/": ${route.path}`);
  }
  if (!route.component) {
    throw new Error(`defineRoute: component is required for ${route.path}`);
  }
  return {
    path: route.path,
    component: route.component,
    title: route.title,
    auth: route.auth,
    roles: route.roles,
  };
}

/** Deduplicate by path (first wins), preserving order. */
export function mergeRoutes(...groups: RouteDefinition[][]): RouteDefinition[] {
  const seen = new Set<string>();
  const out: RouteDefinition[] = [];
  for (const group of groups) {
    for (const route of group) {
      const normalized = defineRoute(route);
      if (seen.has(normalized.path)) continue;
      seen.add(normalized.path);
      out.push(normalized);
    }
  }
  return out;
}

/** Keep routes visible to any of the given roles (or unscoped). */
export function filterRoutesByRoles(
  routes: RouteDefinition[],
  roles: string[],
): RouteDefinition[] {
  if (!roles.length) return routes;
  const allow = new Set(roles);
  return routes.filter((route) => {
    if (!route.roles?.length) return true;
    return route.roles.some((r) => allow.has(r));
  });
}

/** Only routes that require auth (or not). */
export function filterRoutesByAuth(
  routes: RouteDefinition[],
  authRequired: boolean,
): RouteDefinition[] {
  return routes.filter((route) => Boolean(route.auth) === authRequired);
}

/**
 * Match a pathname to a route.
 * Supports exact paths and simple `:param` segments.
 */
export function matchRoute(
  routes: RouteDefinition[],
  pathname: string,
): RouteDefinition | undefined {
  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  for (const route of routes) {
    if (route.path === normalized || route.path === pathname) return route;
  }

  for (const route of routes) {
    const pattern = route.path.split("/").filter(Boolean);
    const parts = normalized.split("/").filter(Boolean);
    if (pattern.length !== parts.length) continue;
    let ok = true;
    for (let i = 0; i < pattern.length; i++) {
      const seg = pattern[i]!;
      if (seg.startsWith(":")) continue;
      if (seg !== parts[i]) {
        ok = false;
        break;
      }
    }
    if (ok) return route;
  }

  return undefined;
}

/** Register a plugin's routes into runtime. */
export function registerPluginRoutes(
  runtime: RoutesRuntime,
  pluginId: string,
  routes: RouteDefinition[],
): void {
  runtime.routes.set(pluginId, routes.map(defineRoute));
}

/** Remove a plugin's routes from runtime. */
export function unregisterPluginRoutes(
  runtime: RoutesRuntime,
  pluginId: string,
): void {
  runtime.routes.delete(pluginId);
}

/** Flat list of all plugin routes from runtime. */
export function getAllRoutes(runtime: RoutesRuntime): RouteDefinition[] {
  return Array.from(runtime.routes.values()).flat();
}

/** Merged routes, optionally filtered by roles. */
export function resolveRoutes(
  runtime: RoutesRuntime,
  roles?: string[],
): RouteDefinition[] {
  const merged = mergeRoutes(...Array.from(runtime.routes.values()));
  return roles?.length ? filterRoutesByRoles(merged, roles) : merged;
}
