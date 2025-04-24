/// <reference lib="dom" />

import { describe, it, expect } from "bun:test";
import floor from "../src/meshes/floor";
import Scene from "../src/scene";

describe("Test floor", () => {
  it("Load floor", async (done) => {
    const canvas = document.getElementById("test") as HTMLCanvasElement;
    const sceneInfo = Scene(canvas);

    const childrenBefore = sceneInfo.scene.children.length;
    sceneInfo.scene.add(floor);
    setTimeout(() => {
      expect(sceneInfo.scene.children.length).toBe(childrenBefore + 1);
      done();
    }, 400);
  });
});
