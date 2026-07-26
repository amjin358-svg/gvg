/**
 * routes.ts — define / merge / filter / match / resolve
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  defineRoute,
  filterRoutesByAuth,
  filterRoutesByRoles,
  matchRoute,
  mergeRoutes,
  registerPluginRoutes,
  resolveRoutes,
  unregisterPluginRoutes,
} from "./routes";

describe("routes", () => {
  it("defines and merges by path", () => {
    const route = defineRoute({
      path: "/marketplace",
      component: "MarketplaceHome",
      title: "Marketplace",
    });
    assert.equal(route.path, "/marketplace");

    const merged = mergeRoutes(
      [{ path: "/a", component: "A" }],
      [
        { path: "/a", component: "Dup" },
        { path: "/b", component: "B" },
      ],
    );
    assert.deepEqual(
      merged.map((r) => r.path),
      ["/a", "/b"],
    );
    assert.equal(merged[0]?.component, "A");
  });

  it("filters by roles and auth", () => {
    const routes = [
      defineRoute({ path: "/public", component: "Public" }),
      defineRoute({
        path: "/admin",
        component: "Admin",
        roles: ["admin"],
        auth: true,
      }),
    ];
    assert.equal(filterRoutesByRoles(routes, ["buyer"]).length, 1);
    assert.equal(filterRoutesByRoles(routes, ["admin"]).length, 2);
    assert.equal(filterRoutesByAuth(routes, true).length, 1);
    assert.equal(filterRoutesByAuth(routes, false).length, 1);
  });

  it("matches exact and :param paths", () => {
    const routes = [
      defineRoute({ path: "/products", component: "List" }),
      defineRoute({ path: "/products/:id", component: "Detail" }),
    ];
    assert.equal(matchRoute(routes, "/products")?.component, "List");
    assert.equal(matchRoute(routes, "/products/")?.component, "List");
    assert.equal(matchRoute(routes, "/products/42")?.component, "Detail");
    assert.equal(matchRoute(routes, "/missing"), undefined);
  });

  it("registers into runtime and resolves", () => {
    const runtime = { routes: new Map() };
    registerPluginRoutes(runtime, "marketplace", [
      { path: "/marketplace", component: "Home" },
    ]);
    registerPluginRoutes(runtime, "trade", [
      { path: "/trade", component: "Trade", roles: ["ops"] },
    ]);
    assert.equal(resolveRoutes(runtime).length, 2);
    assert.equal(resolveRoutes(runtime, ["buyer"]).length, 1);
    unregisterPluginRoutes(runtime, "trade");
    assert.equal(resolveRoutes(runtime).length, 1);
  });
});
