import path from "path";

const BASE_PATH = "./test/";

Bun.serve({
  port: 8090,
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
