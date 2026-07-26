/**
 * Platform services smoke test
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createAuditService,
  createCacheService,
  createMailService,
  createNotificationService,
  createSearchService,
  createStorageService,
} from "./index";
import { MemoryCache } from "../cache";
import { MemoryStorage } from "../storage";
import { clearAudit } from "../audit";
import { clearNotifications } from "../notification";

describe("@gvg/core/services", () => {
  it("AuditService records entries", () => {
    clearAudit();
    const audit = createAuditService();
    audit.track("auth.login", { email: "ops@gvg.com", role: "admin" });
    assert.equal(audit.list({ limit: 1 })[0]?.action, "auth.login");
  });

  it("StorageService + CacheService", async () => {
    const storage = createStorageService(new MemoryStorage());
    await storage.put({ key: "docs/a.txt", body: "hello" });
    assert.equal((await storage.get("docs/a.txt"))?.object.size, 5);

    const cache = createCacheService(new MemoryCache());
    const value = await cache.remember("k", 1000, async () => 42);
    assert.equal(value, 42);
    assert.equal(await cache.remember("k", 1000, async () => 99), 42);
  });

  it("MailService sends via memory transport", async () => {
    const mail = createMailService();
    const sent = await mail.send({
      to: "buyer@example.com",
      subject: "RFQ update",
      text: "Your RFQ was quoted",
    });
    assert.equal(sent.status, "sent");
    assert.equal(mail.list().length, 1);
  });

  it("NotificationService + SearchService", () => {
    clearNotifications();
    const notifications = createNotificationService();
    notifications.notifyInApp("u1", "Welcome", "GVG OS ready");
    assert.equal(notifications.list({ userId: "u1" }).length, 1);

    const search = createSearchService();
    search.indexMany([
      {
        id: "p1",
        title: "Omega-3 Softgel",
        body: "Health supplements fish oil",
        type: "product",
        tags: ["health"],
      },
      {
        id: "p2",
        title: "Hex Bit Set",
        body: "Hardware tools",
        type: "product",
      },
    ]);
    const hits = search.search({ q: "omega health", type: "product" });
    assert.ok(hits.length >= 1);
    assert.equal(hits[0]?.id, "p1");
  });
});
