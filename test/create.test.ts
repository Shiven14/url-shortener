import { isValidUrl, genCode } from "../src/lib/utils.js";
import assert from "node:assert";

test("validates URLs", () => {
  assert.ok(isValidUrl("https://example.com"));
  assert.ok(!isValidUrl("javascript:alert(1)"));
});

test("generates code of default length", () => {
  const c = genCode();
  assert.equal(c.length, 7);
});
