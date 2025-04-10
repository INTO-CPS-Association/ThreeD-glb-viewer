/// <reference lib="dom" />

import { describe, it, expect } from "bun:test";
import scene from "../src/scene";
import { loadModel } from "../src/meshes/model";
import { ambientLight, directionalLight, hemisphereLight } from "../src/lights";
import floor from "../src/meshes/floor";
import { ok } from "assert";

describe("Threejs tests", () => {
  it("Load scene", async (done) => {
    setTimeout(() => {
      ok(scene, "module loaded");
      done();
    }, 400);
  });

  it("Loads a remote model mesh", async (done) => {
    let childrenBefore = scene.children.length;
    const model = await loadModel(
      "http://localhost:8090/2CylinderEngine/glTF/2CylinderEngine.gltf",
    );

    scene.add(model);
    setTimeout(() => {
      expect(scene.children.length).toBe(childrenBefore + 1);
      done();
    }, 400);
  });

  it("Load lighting", async (done) => {
    let childrenBefore = scene.children.length;
    scene.add(ambientLight);
    scene.add(hemisphereLight);
    scene.add(directionalLight);
    setTimeout(() => {
      expect(scene.children.length).toBe(childrenBefore + 3);
      done();
    }, 400);
  });

  it("Load floor", async (done) => {
    let childrenBefore = scene.children.length;
    scene.add(floor);
    setTimeout(() => {
      expect(scene.children.length).toBe(childrenBefore + 1);
      done();
    }, 400);
  });
});
