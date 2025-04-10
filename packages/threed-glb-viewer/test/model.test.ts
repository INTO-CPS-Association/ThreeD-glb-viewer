/// <reference lib="dom" />

import { describe, it, expect } from "bun:test";
import scene from "../src/scene";
import { loadModel, modelProperties } from "../src/meshes/model";

describe("Test model", () => {
  it("Loads a remote model mesh", async (done) => {
    const model = await loadModel(
      "http://localhost:8090/2CylinderEngine/glTF/2CylinderEngine.gltf",
    );

    setTimeout(() => {
      expect(model).toBeTypeOf("object");
      done();
    }, 400);
  });
  it("Check that model loads into scene", async (done) => {
    let childrenBefore = scene.children.length;
    const model = await loadModel(
      "http://localhost:8090/2CylinderEngine/glTF/2CylinderEngine.gltf",
    );
    if (model) scene.add(model);
    setTimeout(() => {
      expect(scene.children.length).toBe(childrenBefore + 1);
      done();
    }, 400);
  });
  it("Rotate a model left", async (done) => {
    const model = await loadModel(
      "http://localhost:8090/2CylinderEngine/glTF/2CylinderEngine.gltf",
    );
    if (!model) return done("Model failed to load");
    scene.add(model);

    expect(model.rotation.y).toBe(0);

    modelProperties.flipLeft();
    await new Promise((r) => setTimeout(r, 2000));

    expect(model.rotation.y).toBe(-1.570796);
    done();
  });
  it("Rotate a model right", async (done) => {
    const model = await loadModel(
      "http://localhost:8090/2CylinderEngine/glTF/2CylinderEngine.gltf",
    );
    if (!model) return done("Model failed to load");
    scene.add(model);

    expect(model.rotation.y).toBe(0);

    modelProperties.flipRight();
    await new Promise((r) => setTimeout(r, 2000));

    expect(model.rotation.y).toBe(1.570796);
    done();
  });
  it("Rotate a model down", async (done) => {
    const model = await loadModel(
      "http://localhost:8090/2CylinderEngine/glTF/2CylinderEngine.gltf",
    );
    if (!model) return done("Model failed to load");
    scene.add(model);

    expect(model.rotation.x).toBe(0);

    modelProperties.flipDown();
    await new Promise((r) => setTimeout(r, 2000));

    expect(model.rotation.x).toBe(-1.570796);
    done();
  });
  it("Rotate a model up", async (done) => {
    const model = await loadModel(
      "http://localhost:8090/2CylinderEngine/glTF/2CylinderEngine.gltf",
    );
    if (!model) return done("Model failed to load");
    scene.add(model);

    expect(model.rotation.x).toBe(0);

    modelProperties.flipUp();
    await new Promise((r) => setTimeout(r, 2000));

    expect(model.rotation.x).toBe(1.570796);
    done();
  });
});
