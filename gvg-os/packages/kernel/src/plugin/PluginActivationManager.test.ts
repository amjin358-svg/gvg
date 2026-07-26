/**
 * PluginActivationManager
 * Install · Enable · Disable · Update · Reload · Shutdown
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createGVGPlugin, createDefaultAppContext } from "./PluginContext";
import {
  createPluginActivationManager,
} from "./PluginActivationManager";
import { sortPluginsByDependencies } from "./PluginLifecycleManager";
import { PLUGIN_LIFECYCLE_OPS } from "./PluginState";
import { createPluginRuntime } from "./PluginRegistry";

function stub(
  id: string,
  deps: string[] = [],
  hooks: {
    onInstall?: () => Promise<void>;
    onEnable?: () => Promise<void>;
    onDisable?: () => Promise<void>;
    onUpdate?: (from?: string) => Promise<void>;
    onReload?: () => Promise<void>;
    onBoot?: () => Promise<void>;
    onShutdown?: () => Promise<void>;
  } = {},
  version = "1.0.0",
) {
  return createGVGPlugin({
    manifest: {
      id,
      name: id,
      version,
      dependencies: deps,
    },
    routes: [{ path: `/${id}`, component: `${id}Page` }],
    navigation: [{ label: id, href: `/${id}` }],
    permissions: [`${id}.read`],
    ...hooks,
  });
}

describe("PluginActivationManager", () => {
  it("exposes Install · Enable · Disable · Update · Reload · Shutdown", () => {
    assert.deepEqual([...PLUGIN_LIFECYCLE_OPS], [
      "Install",
      "Enable",
      "Disable",
      "Update",
      "Reload",
      "Shutdown",
    ]);
  });

  it("activates via install + enable", async () => {
    const order: string[] = [];
    const plugin = stub("marketplace", [], {
      async onInstall() {
        order.push("install");
      },
      async onBoot() {
        order.push("boot");
      },
    });

    const lifecycle = createPluginActivationManager({
      onTransition(_id, state) {
        order.push(state);
      },
    });
    const runtime = createPluginRuntime();
    const app = createDefaultAppContext();

    const record = await lifecycle.activate(plugin, app, runtime);
    assert.equal(record.state, "ready");
    assert.equal(lifecycle.isEnabled("marketplace"), true);
    assert.ok(order.includes("installing"));
    assert.ok(order.includes("installed"));
    assert.ok(order.includes("install"));
    assert.ok(order.includes("enabling"));
    assert.ok(order.includes("boot"));
    assert.ok(order.includes("ready"));
    assert.equal(runtime.routes.size, 1);
  });

  it("Install → Enable → Disable → Enable → Reload → Update → Shutdown", async () => {
    const ops: string[] = [];
    const plugin = stub("trade", [], {
      async onInstall() {
        ops.push("onInstall");
      },
      async onEnable() {
        ops.push("onEnable");
      },
      async onDisable() {
        ops.push("onDisable");
      },
      async onReload() {
        ops.push("onReload");
      },
      async onUpdate(from) {
        ops.push(`onUpdate:${from}`);
      },
      async onShutdown() {
        ops.push("onShutdown");
      },
    });

    const app = createDefaultAppContext();
    const runtime = createPluginRuntime();
    const lifecycle = createPluginActivationManager({
      onOp(_id, op) {
        ops.push(op);
      },
    }).bind(app, runtime);

    assert.equal((await lifecycle.install(plugin)).state, "installed");
    assert.equal((await lifecycle.enable("trade")).state, "ready");
    assert.equal(runtime.routes.size, 1);

    assert.equal((await lifecycle.disable("trade")).state, "disabled");
    assert.equal(runtime.routes.size, 0);
    assert.equal(lifecycle.isEnabled("trade"), false);

    assert.equal((await lifecycle.enable("trade")).state, "ready");
    assert.equal((await lifecycle.reload("trade")).state, "ready");

    const updated = stub(
      "trade",
      [],
      {
        async onUpdate(from) {
          ops.push(`onUpdate:${from}`);
        },
        async onEnable() {
          ops.push("onEnable");
        },
        async onBoot() {
          ops.push("onBoot");
        },
      },
      "1.1.0",
    );
    assert.equal((await lifecycle.update(updated)).state, "ready");
    assert.equal(lifecycle.getPlugin("trade")?.version, "1.1.0");

    assert.equal(await lifecycle.shutdown("trade"), true);
    assert.equal(lifecycle.getState("trade"), "stopped");

    assert.ok(ops.includes("Install"));
    assert.ok(ops.includes("Enable"));
    assert.ok(ops.includes("Disable"));
    assert.ok(ops.includes("Reload"));
    assert.ok(ops.includes("Update"));
    assert.ok(ops.includes("Shutdown"));
    assert.ok(ops.includes("onUpdate:1.0.0"));
  });

  it("sorts by dependencies and shuts down in reverse", async () => {
    const shutdown: string[] = [];
    const trade = stub("trade", [], {
      async onShutdown() {
        shutdown.push("trade");
      },
    });
    const marketplace = stub("marketplace", ["trade"], {
      async onShutdown() {
        shutdown.push("marketplace");
      },
    });

    const ordered = sortPluginsByDependencies([marketplace, trade]);
    assert.deepEqual(
      ordered.map((p) => p.id),
      ["trade", "marketplace"],
    );

    const lifecycle = createPluginActivationManager();
    const runtime = createPluginRuntime();
    const app = createDefaultAppContext();
    await lifecycle.activateAll([marketplace, trade], app, runtime);
    assert.deepEqual(lifecycle.ready().sort(), ["marketplace", "trade"]);

    await lifecycle.shutdownAll();
    assert.deepEqual(shutdown, ["marketplace", "trade"]);
    assert.equal(lifecycle.getState("marketplace"), "stopped");
  });

  it("fails activate when onBoot throws", async () => {
    const plugin = stub("broken", [], {
      async onBoot() {
        throw new Error("boom");
      },
    });
    const lifecycle = createPluginActivationManager();
    const record = await lifecycle.activate(
      plugin,
      createDefaultAppContext(),
      createPluginRuntime(),
    );
    assert.equal(record.state, "failed");
    assert.match(record.error ?? "", /boom/);
  });
});
