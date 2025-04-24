/// <reference lib="dom" />

import { describe, it, expect } from "bun:test";
import {
  ambientLightFolder,
  directionalLightFolder,
  hemisphereLightFolder,
} from "../src/lilgui";

describe("Test lighting", () => {
  it("Change ambient lighting intensity", async (done) => {
    expect(ambientLightFolder.controllers[0].getValue()).toBe(1);
    ambientLightFolder.controllers[0].setValue(5);
    expect(ambientLightFolder.controllers[0].getValue()).toBe(5);
    done();
  });
  it("Change directional lighting intensity", async (done) => {
    expect(directionalLightFolder.controllers[0].getValue()).toBe(2);
    directionalLightFolder.controllers[0].setValue(5);
    expect(directionalLightFolder.controllers[0].getValue()).toBe(5);
    done();
  });
  it("Change hemisphere lighting intensity", async (done) => {
    expect(hemisphereLightFolder.controllers[0].getValue()).toBe(1);
    hemisphereLightFolder.controllers[0].setValue(5);
    expect(hemisphereLightFolder.controllers[0].getValue()).toBe(5);
    done();
  });
});
