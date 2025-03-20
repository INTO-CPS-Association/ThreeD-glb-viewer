/// <reference lib="dom" />

import { describe, it, expect, beforeAll } from "bun:test";
import scene from "../src/scene";
import { loadModel } from "../src/meshes/model";
import { ambientLight, directionalLight, hemisphereLight } from "../src/lights";
import path from "path";
import floor from "../src/meshes/floor";
import { ok } from "assert";

describe("Threejs tests", () => {
  beforeAll(() => {
    const BASE_PATH = ".";
    Bun.serve({
      port: 8080,
      async fetch(req) {
        const url = new URL(req.url);
        const pathname = url.pathname;
        const filePath = path.join(BASE_PATH, pathname);

        console.log(`Attempting to serve: ${filePath}`);

        try {
          const file = Bun.file(filePath);

          if (!file.exists()) {
            console.warn(`File not found: `);
            return new Response(null, { status: 404 });
          }

          let contentType = "application/octet-stream";
          if (pathname.endsWith(".gltf")) {
            contentType = "model/gltf+json";
          } else if (pathname.endsWith(".glb")) {
            contentType = "model/gltf-binary";
          } else if (pathname.endsWith(".png")) {
            contentType = "image/png";
          }

          return new Response(file, {
            headers: {
              "Content-Type": contentType,
            },
          });
        } catch (error) {
          console.error("Error serving file:");
          return new Response(null, { status: 500 });
        }
      },
      error() {
        return new Response(null, { status: 404 });
      },
    });
  });

  it("Load scene", async (done) => {
    setTimeout(() => {
      ok(scene, "module loaded");
      done();
    }, 400);
  });

  it("Loads a remote model mesh", async (done) => {
    let childrenBefore = scene.children.length;
    const model = await loadModel(
      "http://localhost:8080/2CylinderEngine/glTF/2CylinderEngine.gltf",
    );

    scene.add(model);
    setTimeout(() => {
      expect(scene.children.length).toBe(childrenBefore + 1);
      done();
    }, 400);
  });

  it("Loads a local model mesh", async (done) => {
    let childrenBefore = scene.children.length;

    const model = await loadModel(
      "./2CylinderEngine/glTF/2CylinderEngine.gltf",
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
