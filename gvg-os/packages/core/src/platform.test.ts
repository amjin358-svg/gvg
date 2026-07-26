/**
 * Core platform services smoke test
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getSetting,
  getSettings,
  resetSettings,
  setSetting,
} from "./config";
import { cacheRemember } from "./cache";
import { clearTelemetry, listTelemetry, trackEvent, trackTiming } from "./telemetry";
import { putObject } from "./storage";
import {
  clearWorkflows,
  completeWorkflowStep,
  defineWorkflow,
  getWorkflow,
  startWorkflow,
} from "./workflow";
import {
  clearScheduler,
  registerJobHandler,
  scheduleJob,
  tickScheduler,
} from "./scheduler";

describe("@gvg/core platform services", () => {
  it("config / telemetry / cache / storage", async () => {
    resetSettings();
    setSetting("trade.incotermsDefault", "FOB");
    assert.equal(getSetting("trade.incotermsDefault"), "FOB");
    assert.equal(getSettings().currency, "USD");

    clearTelemetry();
    trackEvent("page.view", { path: "/dashboard" });
    trackTiming("boot", 12);
    assert.ok(listTelemetry().length >= 2);

    const value = await cacheRemember("k", 1000, async () => 42);
    assert.equal(value, 42);
    assert.equal(await cacheRemember("k", 1000, async () => 99), 42);

    const obj = await putObject({
      key: "docs/po-1.pdf",
      body: "hello",
      contentType: "application/pdf",
    });
    assert.equal(obj.key, "docs/po-1.pdf");
    assert.ok(obj.size > 0);
  });

  it("workflow + scheduler", async () => {
    clearWorkflows();
    defineWorkflow({
      id: "po.approve",
      name: "PO Approval",
      version: "1.0.0",
      steps: [
        { id: "submit", name: "Submit" },
        { id: "approve", name: "Approve", assigneeRole: "admin" },
      ],
    });
    const wf = startWorkflow("po.approve", { poId: "PO-1" });
    assert.equal(wf.status, "running");
    completeWorkflowStep(wf.id, "submit");
    completeWorkflowStep(wf.id, "approve");
    assert.equal(getWorkflow(wf.id)?.status, "completed");

    clearScheduler();
    let ran = false;
    registerJobHandler("ping", async () => {
      ran = true;
    });
    scheduleJob({
      name: "ping",
      runAt: new Date(Date.now() - 1000),
    });
    const results = await tickScheduler();
    assert.equal(results.length, 1);
    assert.equal(results[0]?.status, "completed");
    assert.equal(ran, true);
  });
});
