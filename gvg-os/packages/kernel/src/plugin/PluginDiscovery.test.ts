/**
 * PluginDiscovery — Scan plugins/ stage
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { createGVGPlugin } from "./PluginContext";
import {
  discoverPlugins,
  filterDiscoveredPlugins,
  PluginDiscovery,
  scanPlugins,
} from "./PluginDiscovery";

function stub(id: string) {
  return createGVGPlugin({
    manifest: { id, name: id, version: "1.0.0" },
    routes: [{ path: `/${id}`, component: `${id}Page` }],
    navigation: [{ label: id, href: `/${id}` }],
    permissions: [`${id}.read`],
  });
}

describe("PluginDiscovery", () => {
  it("discovers plugin.json manifests from a root folder", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "gvg-plugins-"));
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

      fs.mkdirSync(path.join(root, "empty"));
      fs.writeFileSync(path.join(root, "README.md"), "skip");

      const manifests = PluginDiscovery.discover(root);
      assert.equal(manifests.length, 1);
      assert.equal(manifests[0]?.id, "trade");
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it("rejects invalid filesystem manifests", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "gvg-plugins-"));
    try {
      const bad = path.join(root, "bad");
      fs.mkdirSync(bad);
      fs.writeFileSync(
        path.join(bad, "plugin.json"),
        JSON.stringify({ id: "", name: "Bad", version: "1.0.0" }),
      );
      assert.throws(() => PluginDiscovery.discover(root), /Plugin id missing/);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it("scans catalog and rejects duplicate ids", () => {
    const a = stub("marketplace");
    const b = stub("trade");
    const scanned = scanPlugins([a, b]);
    assert.deepEqual(
      scanned.map((p) => p.id),
      ["marketplace", "trade"],
    );
    assert.throws(() => scanPlugins([a, stub("marketplace")]));
  });

  it("discoverPlugins applies include/exclude", () => {
    const catalog = [stub("marketplace"), stub("trade"), stub("warehouse")];
    const result = discoverPlugins(catalog, {
      exclude: ["warehouse"],
      include: ["marketplace", "trade", "warehouse"],
    });
    assert.deepEqual(result.scanned, ["marketplace", "trade"]);
    assert.deepEqual(result.skipped, ["warehouse"]);
    assert.equal(filterDiscoveredPlugins(result.plugins).length, 2);
  });
});
