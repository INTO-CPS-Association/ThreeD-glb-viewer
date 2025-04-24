import { createDoubleClickListener } from "./utils/fullscreen";
import floor from "./meshes/floor";
import { loadModel } from "./meshes/model";
import Scene from "./scene";
import { Timer } from "three/examples/jsm/misc/Timer.js";
import { resizeRendererToDisplaySize } from "./utils/resize";
import { WebGLRenderer } from "three";
import pickHandler from "./picker";

export default async function renderThreejs(
  modelSrc: string,
  id: string = "threed-glb-viewer-canvas",
) {
  const canvas = document.getElementById(id) as HTMLCanvasElement;

  const sceneInfo = Scene(canvas);

  const timer = new Timer();
  const renderer = new WebGLRenderer({ antialias: true, canvas });

  // Meshes
  const model = await loadModel(modelSrc);
  if (model) sceneInfo.scene.add(model);
  sceneInfo.scene.add(floor);

  // EventListeners
  createDoubleClickListener(canvas);
  const picker = pickHandler(canvas);
  picker.createPickerListener(sceneInfo.camera, sceneInfo.scene, canvas, timer);

  const tick = () => {
    timer.update();

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      sceneInfo.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      sceneInfo.camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    renderer.render(sceneInfo.scene, sceneInfo.camera);
    sceneInfo.controls.update();
    requestAnimationFrame(tick);
  };

  tick();
}
