/// <reference lib="dom" />

import { describe, it, expect } from "bun:test";
import { loadModel, modelProperties } from "../src/meshes/model";
import Scene from "../src/scene";

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
    const canvas = document.getElementById("test") as HTMLCanvasElement;
    const sceneInfo = Scene(canvas);

    let childrenBefore = sceneInfo.scene.children.length;

    const model = await loadModel(
      "http://localhost:8090/2CylinderEngine/glTF/2CylinderEngine.gltf",
    );
    if (model) sceneInfo.scene.add(model);

    setTimeout(() => {
      expect(sceneInfo.scene.children.length).toBe(childrenBefore + 1);
      done();
    }, 400);
  });
  it("Rotate a model left", async (done) => {
    const canvas = document.getElementById("test") as HTMLCanvasElement;
    const sceneInfo = Scene(canvas);

    const model = await loadModel(
      "http://localhost:8090/2CylinderEngine/glTF/2CylinderEngine.gltf",
    );
    if (!model) return done("Model failed to load");
    sceneInfo.scene.add(model);

    expect(model.rotation.y).toBe(0);

    modelProperties.flipLeft();
    await new Promise((r) => setTimeout(r, 1000));

    expect(model.rotation.y).toBe(-1.570796);
    done();
  });
  it("Rotate a model right", async (done) => {
    const canvas = document.getElementById("test") as HTMLCanvasElement;
    const sceneInfo = Scene(canvas);

    const model = await loadModel(
      "http://localhost:8090/2CylinderEngine/glTF/2CylinderEngine.gltf",
    );
    if (!model) return done("Model failed to load");
    sceneInfo.scene.add(model);

    expect(model.rotation.y).toBe(0);

    modelProperties.flipRight();
    await new Promise((r) => setTimeout(r, 1000));

    expect(model.rotation.y).toBe(1.570796);
    done();
  });
  it("Rotate a model down", async (done) => {
    const canvas = document.getElementById("test") as HTMLCanvasElement;
    const sceneInfo = Scene(canvas);

    const model = await loadModel(
      "http://localhost:8090/2CylinderEngine/glTF/2CylinderEngine.gltf",
    );
    if (!model) return done("Model failed to load");
    sceneInfo.scene.add(model);

    expect(model.rotation.x).toBe(0);

    modelProperties.flipDown();
    await new Promise((r) => setTimeout(r, 1000));

    expect(model.rotation.x).toBe(-1.570796);
    done();
  });
  it("Rotate a model up", async (done) => {
    const canvas = document.getElementById("test") as HTMLCanvasElement;
    const sceneInfo = Scene(canvas);

    const model = await loadModel(
      "http://localhost:8090/2CylinderEngine/glTF/2CylinderEngine.gltf",
    );
    if (!model) return done("Model failed to load");
    sceneInfo.scene.add(model);

    expect(model.rotation.x).toBe(0);

    modelProperties.flipUp();
    await new Promise((r) => setTimeout(r, 1000));

    expect(model.rotation.x).toBe(1.570796);
    done();
  });
});
