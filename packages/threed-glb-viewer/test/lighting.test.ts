/// <reference lib="dom" />

import { describe, it, expect } from "bun:test";
import scene from "../src/scene";
import { ambientLight, directionalLight, hemisphereLight } from "../src/lights";
import {
  ambientLightFolder,
  directionalLightFolder,
  hemisphereLightFolder,
} from "../src/lilgui";

describe("Test lighting", () => {
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
  it("Change ambient lighting intensity", async (done) => {
    scene.add(ambientLight);

    expect(ambientLight.intensity).toBe(1);

    ambientLightFolder.controllers[0].setValue(5);

    expect(ambientLight.intensity).toBe(5);

    done();
  });
  it("Change directional lighting intensity", async (done) => {
    scene.add(directionalLight);

    expect(directionalLight.intensity).toBe(2);

    directionalLightFolder.controllers[0].setValue(5);

    expect(directionalLight.intensity).toBe(5);

    done();
  });
  it("Change hemisphere lighting intensity", async (done) => {
    scene.add(hemisphereLight);

    expect(hemisphereLight.intensity).toBe(1);

    hemisphereLightFolder.controllers[0].setValue(5);

    expect(hemisphereLight.intensity).toBe(5);

    done();
  });
});
