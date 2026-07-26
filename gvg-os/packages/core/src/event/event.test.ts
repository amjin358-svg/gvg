/**
 * Event pipeline smoke test
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createDispatcher,
  createEventPipeline,
  timingMiddleware,
} from "./index";

describe("@gvg/core/event", () => {
  it("dispatches to priority-ordered subscribers", async () => {
    const order: string[] = [];
    const dispatcher = createDispatcher();

    dispatcher.on("order.created", () => {
      order.push("low");
    }, { priority: 1 });
    dispatcher.on("order.created", () => {
      order.push("high");
    }, { priority: 10 });
    dispatcher.on("*", () => {
      order.push("wild");
    }, { priority: 5 });

    const result = await dispatcher.dispatch("order.created", { id: "o1" });
    assert.equal(result.delivered, 3);
    assert.deepEqual(order, ["high", "low", "wild"]);
  });

  it("supports once subscriptions", async () => {
    const dispatcher = createDispatcher();
    let count = 0;
    dispatcher.once("ping", () => {
      count += 1;
    });
    await dispatcher.dispatch("ping", {});
    await dispatcher.dispatch("ping", {});
    assert.equal(count, 1);
  });

  it("runs pipeline middleware around publish", async () => {
    const pipeline = createEventPipeline();
    pipeline.use(timingMiddleware());
    pipeline.use(async (ctx, next) => {
      ctx.state.trace = "rfq";
      await next();
    });

    const seen: unknown[] = [];
    pipeline.on("rfq.opened", (event) => {
      seen.push(event.payload);
    });

    const result = await pipeline.publish("rfq.opened", { rfqId: "rfq-1" });
    assert.equal(result.delivered, 1);
    assert.deepEqual(seen, [{ rfqId: "rfq-1" }]);
    assert.ok(typeof result.eventId === "string");
  });

  it("records handler failures without aborting by default", async () => {
    const dispatcher = createDispatcher();
    dispatcher.on("x", () => {
      throw new Error("boom");
    });
    dispatcher.on("x", () => undefined);
    const result = await dispatcher.dispatch("x", {});
    assert.equal(result.delivered, 1);
    assert.equal(result.failed.length, 1);
    assert.equal(result.failed[0]?.error, "boom");
  });
});
