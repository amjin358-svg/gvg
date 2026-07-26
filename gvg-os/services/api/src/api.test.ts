import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getSystem } from "./routes/system";
import { getRuntime } from "./routes/runtime";
import { getPlugins } from "./routes/plugins";
import { getModules } from "./routes/modules";
import { getHealth } from "./routes/health";
import { getConfigView, patchConfig } from "./routes/config";

describe("@gvg/api routes", () => {
  it("system / runtime / plugins / modules", () => {
    const system = getSystem();
    assert.equal(system.service, "@gvg/api");
    assert.ok(system.brand.shortName);

    const runtime = getRuntime();
    assert.equal(runtime.application.name, "GVG OS");

    const plugins = getPlugins();
    assert.ok(plugins.total >= 1);
    assert.ok(plugins.plugins.some((p) => p.id === "marketplace"));

    const modules = getModules();
    assert.ok("marketplace" in modules.flags);
  });

  it("health and config", async () => {
    const health = await getHealth();
    assert.ok(health.body.status);
    assert.ok(health.httpStatus === 200 || health.httpStatus === 503);

    const config = getConfigView();
    assert.ok(config.settings.currency);
    const patched = patchConfig({ settings: { pageSize: 50 } });
    assert.equal(patched.settings.pageSize, 50);
  });
});
