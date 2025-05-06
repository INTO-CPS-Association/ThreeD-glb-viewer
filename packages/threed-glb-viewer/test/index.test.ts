/// <reference lib="dom" />
// https://github.com/capricorn86/happy-dom/issues/241

import { beforeEach, describe, expect, it } from "bun:test";
import { CustomCanvas, renderThreejs } from "../src/main";

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
  let canvas: HTMLCanvasElement;
  beforeEach(function () {
    const parent = CustomCanvas("test");
    document.body.appendChild(parent);
    canvas = parent.getElementsByClassName("canvas")[0] as HTMLCanvasElement;
  });

  it("Load scene", async () => {
    const canvas_ = document
      .getElementById("test")
      ?.getElementsByClassName("canvas")[0] as HTMLCanvasElement;
    expect(canvas_).toBeInstanceOf("object");

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
  });
});
