/**
 * define* helpers smoke test
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  defineDashboardWidget,
  defineNavigation,
  definePermission,
  definePlugin,
  defineRoute,
  createPluginHost,
} from "./host";

describe("define helpers", () => {
  it("defineRoute / definePermission / defineNavigation / defineDashboardWidget", () => {
    const route = defineRoute({
      path: "/demo",
      component: "DemoPage",
      title: "Demo",
    });
    assert.equal(route.path, "/demo");

    const permission = definePermission("demo.read");
    assert.equal(permission.key, "demo.read");

    const nav = defineNavigation({ label: "Demo", href: "/demo" });
    assert.equal(nav.href, "/demo");

    const widget = defineDashboardWidget({
      id: "demo.widget",
      title: "Demo Widget",
      component: "widgets/Demo",
    });
    assert.equal(widget.size, "md");
  });

  it("definePlugin wires routes, nav, permissions, widgets", async () => {
    const plugin = definePlugin({
      manifest: {
        id: "demo",
        name: "Demo",
        version: "1.0.0",
      },
      routes: [defineRoute({ path: "/demo", component: "DemoPage" })],
      navigation: [defineNavigation({ label: "Demo", href: "/demo" })],
      permissions: [definePermission("demo.read")],
      widgets: [
        defineDashboardWidget({
          id: "demo.widget",
          title: "Demo Widget",
          component: "widgets/Demo",
          order: 1,
        }),
      ],
    });

    assert.equal(plugin.routes().length, 1);
    assert.equal(plugin.navigation().length, 1);
    assert.equal(plugin.permissions().length, 1);
    assert.equal(plugin.widgets().length, 1);
    assert.equal(plugin.widgets()[0].pluginId, "demo");

    const host = createPluginHost([plugin]);
    const report = await host.start();
    assert.equal(report.stage, "ready");
    assert.equal(host.widgets().length, 1);
  });
});
