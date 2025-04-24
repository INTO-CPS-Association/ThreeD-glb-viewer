/// <reference lib="dom" />

import { describe, expect, it } from "bun:test";
import { ok } from "assert";
import renderThreejs from "../src/main";

function comparePixelData(
  data1: Uint8ClampedArray,
  data2: Uint8ClampedArray,
): boolean {
  if (data1.length !== data2.length) {
    return true;
  }

  let differentPixels = 0;
  for (let i = 0; i < data1.length; i++) {
    if (data1[i] !== data2[i]) {
      differentPixels++;
    }
  }

  return differentPixels > 0;
}

describe("Threejs tests", () => {
  it("Load scene", async (done) => {
    // Create a canvas element
    const canvas = document.createElement("canvas");
    canvas.id = "test";
    canvas.width = 300;
    canvas.height = 300;

    document.body.appendChild(canvas);
    await new Promise((r) => setTimeout(r, 200));

    const canvas_ = document.getElementById("test") as HTMLCanvasElement;
    expect(canvas_).toBeTypeOf("object");

    const initialData = canvas_
      .getContext("2d")!
      .getImageData(0, 0, canvas_.width, canvas_.height).data;

    renderThreejs(
      "http://localhost:8090/2CylinderEngine/glTF/2CylinderEngine.gltf",
      "test",
    );

    const newData = canvas_
      .getContext("2d")!
      .getImageData(0, 0, canvas_.width, canvas_.height).data;

    expect(comparePixelData(initialData, newData)).toBe(true);

    done();
  });
});
