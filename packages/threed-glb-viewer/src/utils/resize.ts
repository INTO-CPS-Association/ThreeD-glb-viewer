import type { WebGLRenderer } from "three";
import type { CSS2DRenderer } from "three/examples/jsm/Addons.js";

function resizeRendererToDisplaySize(
  renderer: WebGLRenderer,
  labelRenderer: CSS2DRenderer,
) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
    labelRenderer.setSize(width, height);
  }
  return needResize;
}

export { resizeRendererToDisplaySize };
