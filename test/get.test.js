import test from "node:test";
import assert from "node:assert";
import * as create from "../dist/handlers/create.js";
import * as get from "../dist/handlers/get.js";

test("handlers export functions", () => {
  assert.equal(typeof create.handler, "function");
  assert.equal(typeof get.handler, "function");
});
