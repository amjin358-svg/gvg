/**
 * ManifestValidator — required: id · name · version
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createGVGPlugin } from "./PluginContext";
import {
  assertValidPlugin,
  loadManifest,
  ManifestValidator,
  validateManifest,
  validatePlugin,
} from "./ManifestValidator";

function stub(id: string) {
  return createGVGPlugin({
    manifest: { id, name: id, version: "1.0.0" },
    routes: [{ path: `/${id}`, component: `${id}Page` }],
    navigation: [{ label: id, href: `/${id}` }],
    permissions: [`${id}.read`],
  });
}

describe("ManifestValidator", () => {
  it("validates required id, name, version", () => {
    assert.doesNotThrow(() =>
      ManifestValidator.validate({
        id: "trade",
        name: "Trade",
        version: "1.0.0",
      }),
    );

    assert.throws(
      () =>
        ManifestValidator.validate({
          id: "",
          name: "Trade",
          version: "1.0.0",
        }),
      /Plugin id missing/,
    );
    assert.throws(
      () =>
        ManifestValidator.validate({
          id: "trade",
          name: "",
          version: "1.0.0",
        }),
      /Plugin name missing/,
    );
    assert.throws(
      () =>
        ManifestValidator.validate({
          id: "trade",
          name: "Trade",
          version: "",
        }),
      /Plugin version missing/,
    );
  });

  it("loads and validates a healthy plugin", () => {
    const plugin = stub("marketplace");
    assert.equal(loadManifest(plugin).id, "marketplace");
    assert.equal(validateManifest(plugin.manifest).ok, true);
    assert.equal(validatePlugin(plugin).ok, true);
    assert.doesNotThrow(() => assertValidPlugin(plugin));
  });

  it("soft-validate reports missing fields", () => {
    const result = validateManifest({
      id: "",
      name: "X",
      version: "1.0.0",
    });
    assert.equal(result.ok, false);
    assert.ok(result.issues[0]?.message.includes("id missing"));
  });
});
