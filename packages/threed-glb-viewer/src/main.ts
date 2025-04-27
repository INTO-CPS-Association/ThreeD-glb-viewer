import { createDoubleClickListener } from "./utils/fullscreen";
import floor from "./meshes/floor";
import { loadModel } from "./meshes/model";
import CreateScene from "./scene";
import { Timer } from "three/examples/jsm/misc/Timer.js";
import { resizeRendererToDisplaySize } from "./utils/resize";
import {
  AmbientLight,
  DirectionalLight,
  Group,
  HemisphereLight,
  Object3DEventMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import pickHandler from "./picker";
import { OrbitControls } from "three/examples/jsm/Addons";

let eventFunctionsInstance: (() => void) | null = null;

function createEventFunctions() {
  let hasRun = false;

  return function innerFunction() {
    if (!hasRun) {
      hasRun = true;
      createDoubleClickListener();
      const picker = pickHandler();
      picker.createPickerListener();
    }
  };
}

export const renderCanvas: {
  [key: string]: {
    id: string;
    canvas: HTMLCanvasElement;
    sceneInfo: {
      scene: Scene;
      camera: PerspectiveCamera;
      controls: OrbitControls;
      ambientLight: AmbientLight;
      hemisphereLight: HemisphereLight;
      directionalLight: DirectionalLight;
      canvas: HTMLCanvasElement;
    };
    timer: Timer;
    model?: Group<Object3DEventMap>;
  };
} = {};

export default async function renderThreejs(
  modelSrc: string,
  id: string = "threed-glb-viewer-canvas",
  addFloor: boolean = false,
) {
  const canvas = document.getElementById(id) as HTMLCanvasElement;

  const sceneInfo = CreateScene(canvas, id);

  const timer = new Timer();
  const renderer = new WebGLRenderer({ antialias: true, canvas });

  // Meshes
  const model = await loadModel(modelSrc);
  if (model) sceneInfo.scene.add(model);
  if (addFloor) sceneInfo.scene.add(floor);

  renderCanvas[id] = { id, canvas, sceneInfo, timer, model };

  // EventListeners
  if (!eventFunctionsInstance) {
    eventFunctionsInstance = createEventFunctions();
  }
  eventFunctionsInstance();

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
