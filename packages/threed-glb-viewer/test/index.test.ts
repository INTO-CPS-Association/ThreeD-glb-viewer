/// <reference lib="dom" />

import { describe, it } from "bun:test";
import scene from "../src/scene";
import { ok } from "assert";

describe("Threejs tests", () => {
  it("Load scene", async (done) => {
    setTimeout(() => {
      ok(scene, "module loaded");
      done();
    }, 400);
  });
});
