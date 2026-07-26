/**
 * Plugin module structure smoke test
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import {
  PLUGIN_EVENT_TYPES,
  PLUGIN_STATE_TRANSITIONS,
  PluginEvents,
  PluginState,
  canTransition,
  createPluginEvent,
  createPluginEventBus,
  PluginRuntime,
  toPluginState,
} from "./index";

describe("@gvg/kernel/plugin structure", () => {
  it("exposes public PluginState enum", () => {
    assert.equal(PluginState.Installed, "installed");
    assert.equal(PluginState.Loaded, "loaded");
    assert.equal(PluginState.Enabled, "enabled");
    assert.equal(PluginState.Disabled, "disabled");
    assert.equal(PluginState.Failed, "failed");
    assert.equal(PluginState.Unloaded, "unloaded");
    assert.equal(toPluginState("ready"), PluginState.Enabled);
    assert.equal(toPluginState("booting"), PluginState.Loaded);
    assert.equal(toPluginState("stopped"), PluginState.Unloaded);
  });

  it("exposes PluginEvents enum", () => {
    assert.equal(PluginEvents.BEFORE_LOAD, "plugin.before.load");
    assert.equal(PluginEvents.AFTER_LOAD, "plugin.after.load");
    assert.equal(PluginEvents.BEFORE_ENABLE, "plugin.before.enable");
    assert.equal(PluginEvents.AFTER_ENABLE, "plugin.after.enable");
    assert.equal(PluginEvents.BEFORE_DISABLE, "plugin.before.disable");
    assert.equal(PluginEvents.AFTER_DISABLE, "plugin.after.disable");
    assert.equal(PluginEvents.BEFORE_UNLOAD, "plugin.before.unload");
    assert.equal(PluginEvents.AFTER_UNLOAD, "plugin.after.unload");
    assert.equal(PluginEvents.ERROR, "plugin.error");
  });

  it("exposes state transitions", () => {
    assert.equal(canTransition("idle", "installing"), true);
    assert.equal(canTransition("ready", "disabling"), true);
    assert.equal(canTransition("idle", "ready"), false);
    assert.ok(PLUGIN_STATE_TRANSITIONS.ready.includes("reloading"));
  });

  it("publishes plugin events", async () => {
    const bus = createPluginEventBus();
    const seen: string[] = [];
    bus.on(PluginEvents.BEFORE_ENABLE, (e) => {
      seen.push(`before:${e.payload.pluginId}`);
    });
    bus.on(PluginEvents.AFTER_ENABLE, (e) => {
      seen.push(`after:${e.payload.pluginId}`);
    });
    await bus.around(
      PluginEvents.BEFORE_ENABLE,
      PluginEvents.AFTER_ENABLE,
      { pluginId: "marketplace" },
      async () => undefined,
    );
    assert.deepEqual(seen, ["before:marketplace", "after:marketplace"]);
    assert.ok(PLUGIN_EVENT_TYPES.includes(PluginEvents.ERROR));
    assert.equal(
      createPluginEvent(PluginEvents.ERROR, { pluginId: "x", error: "boom" })
        .type,
      PluginEvents.ERROR,
    );
  });

  it("boots discovered plugins into runtime contexts", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "gvg-runtime-"));
    try {
      const trade = path.join(root, "trade");
      fs.mkdirSync(trade);
      fs.writeFileSync(
        path.join(trade, "plugin.json"),
        JSON.stringify({
          id: "trade",
          name: "Trade",
          version: "0.1.0",
        }),
      );

      const runtime = new PluginRuntime();
      runtime.boot(root);

      const plugins = runtime.plugins();
      assert.equal(plugins.length, 1);
      assert.equal(plugins[0]?.manifest.id, "trade");
      assert.equal(plugins[0]?.state, PluginState.Enabled);
      assert.ok(plugins[0]?.loadedAt instanceof Date);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});
