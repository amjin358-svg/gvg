import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { manifest } from "../manifest";
import { permissions } from "../permissions";

describe("crm plugin", () => {
  it("exposes manifest id", () => {
    assert.equal(manifest.id, "crm");
  });

  it("declares read permission", () => {
    assert.ok((permissions as readonly string[]).includes("crm:read"));
  });
});
