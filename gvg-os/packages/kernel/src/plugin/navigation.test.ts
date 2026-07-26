/**
 * navigation.ts — define / flatten / filter / merge / resolve
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  defineNavigation,
  filterNavigationByRoles,
  flattenNavigation,
  mergeNavigation,
  registerPluginNavigation,
  resolveNavigation,
  unregisterPluginNavigation,
} from "./navigation";

describe("navigation", () => {
  it("defines and flattens trees", () => {
    const tree = defineNavigation({
      label: "Marketplace",
      href: "/marketplace",
      children: [
        { label: "Products", href: "/marketplace/products" },
        {
          label: "RFQ",
          href: "/marketplace/rfq",
          roles: ["admin"],
          children: [{ label: "Open", href: "/marketplace/rfq/open" }],
        },
      ],
    });
    const flat = flattenNavigation([tree]);
    assert.equal(flat.length, 4);
    assert.equal(flat[0]?.href, "/marketplace");
    assert.equal(flat[3]?.href, "/marketplace/rfq/open");
  });

  it("filters by role and merges by href", () => {
    const items = [
      defineNavigation({ label: "All", href: "/all" }),
      defineNavigation({
        label: "Admin",
        href: "/admin",
        roles: ["admin"],
      }),
    ];
    assert.equal(filterNavigationByRoles(items, ["buyer"]).length, 1);
    assert.equal(filterNavigationByRoles(items, ["admin"]).length, 2);

    const merged = mergeNavigation(
      [{ label: "A", href: "/a" }],
      [
        { label: "A dup", href: "/a" },
        { label: "B", href: "/b" },
      ],
    );
    assert.deepEqual(
      merged.map((i) => i.href),
      ["/a", "/b"],
    );
  });

  it("registers into runtime and resolves", () => {
    const runtime = { navigation: new Map() };
    registerPluginNavigation(runtime, "marketplace", [
      { label: "Marketplace", href: "/marketplace" },
    ]);
    registerPluginNavigation(runtime, "trade", [
      { label: "Trade", href: "/trade", roles: ["ops"] },
    ]);
    assert.equal(resolveNavigation(runtime).length, 2);
    assert.equal(resolveNavigation(runtime, ["buyer"]).length, 1);
    unregisterPluginNavigation(runtime, "trade");
    assert.equal(resolveNavigation(runtime).length, 1);
  });
});
