/**
 * PluginLifecycleManager — enable · disable · unload on PluginRuntimeContext
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createPluginLifecycleManager,
  PluginLifecycleManager,
  sortPluginsByDependencies,
} from "./PluginLifecycleManager";
import { createPluginRuntimeContext } from "./PluginRuntimeContext";
import { PluginState } from "./PluginState";
import { createGVGPlugin } from "./PluginContext";

describe("PluginLifecycleManager", () => {
  it("enable · disable · unload mutate context state", () => {
    const lifecycle = new PluginLifecycleManager();
    const ctx = createPluginRuntimeContext({
      manifest: { id: "trade", name: "Trade", version: "1.0.0" },
      state: PluginState.Installed,
      path: "plugins/trade",
    });

    lifecycle.enable(ctx);
    assert.equal(ctx.state, PluginState.Enabled);
    assert.ok(ctx.loadedAt instanceof Date);

    lifecycle.disable(ctx);
    assert.equal(ctx.state, PluginState.Disabled);

    lifecycle.unload(ctx);
    assert.equal(ctx.state, PluginState.Unloaded);
  });

  it("createPluginLifecycleManager factory", () => {
    const lifecycle = createPluginLifecycleManager();
    const ctx = createPluginRuntimeContext({
      manifest: { id: "crm", name: "CRM", version: "0.1.0" },
    });
    lifecycle.enable(ctx);
    assert.equal(ctx.state, PluginState.Enabled);
  });

  it("sorts plugins by dependencies", () => {
    const trade = createGVGPlugin({
      manifest: { id: "trade", name: "Trade", version: "1.0.0" },
      routes: [],
      navigation: [],
      permissions: [],
    });
    const marketplace = createGVGPlugin({
      manifest: {
        id: "marketplace",
        name: "Marketplace",
        version: "1.0.0",
        dependencies: ["trade"],
      },
      routes: [],
      navigation: [],
      permissions: [],
    });
    const ordered = sortPluginsByDependencies([marketplace, trade]);
    assert.deepEqual(
      ordered.map((p) => p.id),
      ["trade", "marketplace"],
    );
  });
});
