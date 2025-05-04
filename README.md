# Threejs render

## Getting Started

This project is a monorepo with the package threed-glb-viewer and a test environment in pkg-example.

This package enables interaction with a statically served GLTF file, allowing users to toggle wireframe mode for individual parts and retrieve part annotations (name, live data). It also provides options for configuring lighting and rotating the model in any direction.
Parts can be selected externally using a left click or internally using a right click.

![demo](https://github.com/INTO-CPS-Association/ThreeD-glb-viewer/blob/main/demo.gif)

## How to use this package

```bash
npm install @into-cps-association/threed-glb-viewer
bun add @into-cps-association/threed-glb-viewer
pnpm add @into-cps-association/threed-glb-viewer
yarn add @into-cps-association/threed-glb-viewer
```

```bash
# Create a canvas component
const canvas = CustomCanvas("threed-glb-viewer-canvas");
const body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

# Specify a path to a gltf file, the canvas id and whether or not to add a floor
renderThreejs("../static/models/2CylinderEngine/glTF/2CylinderEngine.gltf", "threed-glb-viewer-canvas", true)
```

### How to add annotations

```bash
setInterval(() => {
  const random1 = Math.random() * 100;

  updateAnnotations({
    motor1: {
      x: -100,
      y: 100,
      z: 0,
      name: "Motor 1 speed",
      value: random1.toString(),
    }
  });
}, 1000);
```

## Development

### Build package

```bash
cd packages/threed-glb-viewer

bun install

bun run build
```

[Main package](packages/threed-glb-viewer/README.md)

### Start test server

```bash
cd packages/pkg-example

bun install

bun run dev
```

[Test server](packages/pkg-example/README.md)

## License

MIT
