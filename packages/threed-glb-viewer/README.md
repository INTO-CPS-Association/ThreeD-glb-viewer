# Threejs render

## What does this package do?

This package makes it possible to load GLTF files into a Threejs scene and then inspect the model.

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

- camera.ts -> Camera settings.
- canvas.ts -> Get's the html document canvas.
- controls.ts -> Defines a Orbit controller for camera movement.
- helpers -> Defines helpers for the camera, lighting and axes.
- lights.ts -> Defines the scene lights.
- lilgui.ts -> Defines the GUI menu for rotation, wireframe etc.
- loadingManager.ts -> For loading textures.
- meshes -> Defines the meshes for the floor and for the model.
- picker.ts -> For picking specific parts of a model.
- renderer.ts -> Defines the WebGL renderer.
- scene.ts -> Defines the scene and the background color.
- timer.ts -> For animation in the future.
- utils -> utils for resizing and fullscreening the scene.

## License

MIT
