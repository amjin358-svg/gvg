/**
 * Boot → Load Plugins → Generate Menu → Generate Routes →
 * Generate Dashboard → Inject Permission → Ready
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createGVGPlugin,
  createPluginHost,
  scanPlugins,
} from "./host";
import { validatePlugin } from "./ManifestValidator";

describe("OS boot composition pipeline", () => {
  it("Boot → Load Plugins → Generate Menu → Routes → Dashboard → Inject Permission → Ready", async () => {
    const stages: string[] = [];

    const alpha = createGVGPlugin({
      manifest: {
        id: "alpha",
        name: "Alpha",
        version: "1.0.0",
      },
      routes: [{ path: "/alpha", component: "AlphaPage" }],
      navigation: [{ label: "Alpha", href: "/alpha" }],
      permissions: ["alpha.read"],
      widgets: [
        {
          id: "alpha.stat",
          title: "Alpha Stat",
          component: "widgets/AlphaStat",
        },
      ],
    });

    const beta = createGVGPlugin({
      manifest: {
        id: "beta",
        name: "Beta",
        version: "1.0.0",
      },
      routes: [{ path: "/beta", component: "BetaPage" }],
      navigation: [{ label: "Beta", href: "/beta" }],
      permissions: ["beta.write"],
    });

    const scanned = scanPlugins([alpha, beta]);
    assert.equal(scanned.length, 2);
    assert.equal(validatePlugin(alpha).ok, true);

    const host = createPluginHost(scanned);
    const report = await host.start({
      onStage(stage) {
        stages.push(stage);
      },
    });

    assert.equal(report.stage, "ready");
    assert.deepEqual(report.scanned, ["alpha", "beta"]);
    assert.equal(report.booted.length, 2);
    assert.equal(report.failed.length, 0);

    assert.ok(stages.includes("boot") || stages.includes("application_boot"));
    assert.ok(stages.includes("load_plugins"));
    assert.ok(stages.includes("generate_menu"));
    assert.ok(stages.includes("generate_routes"));
    assert.ok(stages.includes("generate_dashboard"));
    assert.ok(stages.includes("inject_permission"));
    assert.ok(stages.includes("ready"));

    assert.equal(report.composed.menu.length, 2);
    assert.equal(report.composed.routes.length, 2);
    assert.equal(report.composed.dashboard.length, 1);
    assert.equal(report.composed.permissions.length, 2);
    assert.deepEqual(host.getComposed()?.menu.map((m) => m.href).sort(), [
      "/alpha",
      "/beta",
    ]);
  });
});
