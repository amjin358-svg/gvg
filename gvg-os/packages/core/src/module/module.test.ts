/**
 * Module system smoke test
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createIsolatedModuleLoader,
  defineModule,
  sortModulesByDependencies,
} from "./index";

describe("@gvg/core/module", () => {
  it("registers and loads Marketplace → dependent modules in order", async () => {
    const events: string[] = [];

    const marketplace = defineModule({
      id: "marketplace",
      name: "Marketplace",
      version: "0.1.0",
      kind: "commerce",
      href: "/marketplace",
      onLoad: () => {
        events.push("marketplace.load");
      },
      onEnable: () => {
        events.push("marketplace.enable");
      },
    });

    const procurement = defineModule({
      id: "procurement",
      name: "Procurement",
      version: "0.1.0",
      kind: "commerce",
      dependencies: ["marketplace"],
      href: "/marketplace/procurement",
      onLoad: () => {
        events.push("procurement.load");
      },
      onEnable: () => {
        events.push("procurement.enable");
      },
    });

    const ordered = sortModulesByDependencies([procurement, marketplace]);
    assert.deepEqual(
      ordered.map((m) => m.metadata.id),
      ["marketplace", "procurement"],
    );

    const loader = createIsolatedModuleLoader({ respectFlags: false });
    const report = await loader.load([procurement, marketplace]);

    assert.deepEqual(report.loaded, ["marketplace", "procurement"]);
    assert.deepEqual(report.enabled, ["marketplace", "procurement"]);
    assert.deepEqual(events, [
      "marketplace.load",
      "marketplace.enable",
      "procurement.load",
      "procurement.enable",
    ]);

    await loader.disable("procurement");
    assert.equal(
      loader.registry.getRecord("procurement")?.status,
      "disabled",
    );
  });

  it("fails when dependency is missing", async () => {
    const loader = createIsolatedModuleLoader({ respectFlags: false });
    const report = await loader.load([
      defineModule({
        id: "rfq",
        name: "RFQ",
        version: "0.1.0",
        dependencies: ["missing-module"],
      }),
    ]);
    assert.equal(report.failed.length, 1);
    assert.equal(report.failed[0]?.id, "rfq");
  });
});
