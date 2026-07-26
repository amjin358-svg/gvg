/**
 * Application pipeline smoke test
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { definePlugin } from "@gvg/kernel/plugin/host";
import {
  APPLICATION_PIPELINE,
  describeApplicationPipeline,
  runApplicationPipeline,
} from "./index";
import { resetApplicationContext } from "../runtime";

describe("@gvg/core/application", () => {
  it("describes Application → … → Ready", () => {
    assert.equal(
      describeApplicationPipeline(),
      "Application → Bootstrap → Container → Runtime Context → Module Registry → Plugin Registry → Event Pipeline → Navigation → Dashboard → Ready",
    );
    assert.deepEqual([...APPLICATION_PIPELINE], [
      "application",
      "bootstrap",
      "container",
      "runtime_context",
      "module_registry",
      "plugin_registry",
      "event_pipeline",
      "navigation",
      "dashboard",
      "ready",
    ]);
  });

  it("runs pipeline with skipPlugins", async () => {
    resetApplicationContext();
    const visited: string[] = [];
    const plugin = definePlugin({
      manifest: {
        id: "marketplace",
        name: "Marketplace",
        version: "0.1.0",
        description: "Commerce",
        tags: ["commerce"],
      },
      routes: [{ path: "/marketplace", component: "Home" }],
      navigation: [{ label: "Marketplace", href: "/marketplace" }],
      permissions: ["products.read"],
    });

    const result = await runApplicationPipeline({
      plugins: [plugin],
      skipPlugins: true,
      onStage: (stage) => visited.push(stage),
    });

    assert.equal(result.ready, true);
    assert.equal(result.stage, "ready");
    assert.ok(result.container.has("gvg.application"));
    assert.ok(result.container.has("gvg.runtime"));
    assert.ok(result.navigation.some((n) => n.id === "dashboard"));
    assert.ok(visited.includes("application"));
    assert.ok(visited.includes("ready"));
    assert.ok(result.moduleReport.enabled.includes("marketplace") || result.moduleReport.skipped.includes("marketplace") || result.moduleReport.loaded.includes("marketplace"));
  });
});
