# Threejs render

## Getting Started

This project is a monorepo with the package threed-glb-viewer and a test environment in pkg-example.

## How to use this package?

```bash
npm install @into-cps-association/threed-glb-viewer
bun add @into-cps-association/threed-glb-viewer
pnpm add @into-cps-association/threed-glb-viewer
yarn add @into-cps-association/threed-glb-viewer
```

```bash
# Add a canvas component
<canvas id="threed-glb-viewer-canvas"></canvas>

# Specify a path to a gltf file
renderThreejs("../static/models/2CylinderEngine/glTF/2CylinderEngine.gltf")
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
