/// <reference lib="dom" />

import { describe, it, expect } from "bun:test";
import scene from "../src/scene";
import floor from "../src/meshes/floor";

describe("Test floor", () => {
  it("Load floor", async (done) => {
    let childrenBefore = scene.children.length;
    scene.add(floor);
    setTimeout(() => {
      expect(scene.children.length).toBe(childrenBefore + 1);
      done();
    }, 400);
  });
});
