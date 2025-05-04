# Threejs render

## What does this package do?

This package makes it possible to load GLTF files into a Threejs scene and then inspect the model.
It also allows the creation of annotations.

## Build package

```bash
bun install

bun run build
```

## Test package

```bash
bun install

bun test
```

## Structure description

- annotations.ts -> Defines the functions for creating annotations.
- lilgui.ts -> Defines the GUI menu for rotation, wireframe etc.
- loadingManager.ts -> For loading textures.
- meshes -> Defines the meshes for the floor and for the model.
- picker.ts -> Defines the functions and events for picking specific parts of a model.
- scene.ts -> Defines the scene and the background color.
- utils -> utils for resizing and fullscreening the scene.

## License

MIT
