/// <reference lib="dom" />

import { describe, it, expect, beforeEach } from "bun:test";
import floor from "../src/meshes/floor";
import Scene from "../src/scene";
import { CustomCanvas } from "../src/main";

describe("Test floor", () => {
  let canvas: HTMLCanvasElement;
  beforeEach(function () {
    const parent = CustomCanvas("test");
    document.body.appendChild(parent);
    canvas = parent.getElementsByClassName("canvas")[0] as HTMLCanvasElement;
  });

  it("Load floor", async (done) => {
    const sceneInfo = Scene(canvas, "test");

    const childrenBefore = sceneInfo.scene.children.length;
    sceneInfo.scene.add(floor);
    setTimeout(() => {
      expect(sceneInfo.scene.children.length).toBe(childrenBefore + 1);
      done();
    }, 400);
  });
});
