import test from "node:test";
import assert from "node:assert";
import { isValidUrl, genCode } from "../dist/lib/utils.js";

test("validates URLs", () => {
  assert.ok(isValidUrl("https://example.com"));
  assert.ok(!isValidUrl("javascript:alert(1)"));
});

test("generates code of default length", () => {
  const c = genCode();
  assert.equal(c.length, 7);
});
