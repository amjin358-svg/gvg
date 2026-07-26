import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { manifest } from "../manifest";
import { permissions } from "../permissions";

describe("ai-center plugin", () => {
  it("exposes manifest id", () => {
    assert.equal(manifest.id, "ai-center");
  });

  it("declares read permission", () => {
    assert.ok((permissions as readonly string[]).includes("ai:read"));
  });
});
