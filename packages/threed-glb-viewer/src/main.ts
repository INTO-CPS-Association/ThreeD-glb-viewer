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
import { updateAnnotationPositions, updateAnnotations } from "./annotations";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

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

export const renderCanvas = new Map<
  string,
  {
    canvasId: string;
    canvas: HTMLCanvasElement;
    parent: HTMLDivElement;
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
  }
>();

export const CustomCanvas = (
  canvasId: string = "threed-glb-viewer-canvas",
  height: string = "500px",
  width: string = "500px",
) => {
  const parent = document.createElement("div");

  parent.id = canvasId;
  parent.style.position = "relative";
  parent.style.height = height;
  parent.style.width = width;
  parent.style.overflow = "hidden";

  const canvas = document.createElement("canvas");
  canvas.style.width = "100%";
  canvas.style.height = "100%";

  parent.appendChild(canvas);
  return parent;
};

export async function renderThreejs(
  modelSrc: string,
  canvasId: string = "threed-glb-viewer-canvas",
  addFloor: boolean = false,
) {
  const parent = document.getElementById(canvasId) as HTMLDivElement;
  if (!parent) return;
  const canvas = parent.children[0] as HTMLCanvasElement | undefined;
  if (!canvas) return;

  const sceneInfo = CreateScene(canvas, canvasId);

  const timer = new Timer();
  const renderer = new WebGLRenderer({ antialias: true, canvas });

  // Meshes
  const model = await loadModel(modelSrc);
  if (model) sceneInfo.scene.add(model);
  if (addFloor) sceneInfo.scene.add(floor);

  renderCanvas.set(canvasId, {
    canvasId,
    parent,
    canvas,
    sceneInfo,
    timer,
    model,
  });

  // Annotations
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(parent.clientWidth, parent.clientHeight);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.inset = "0px";
  labelRenderer.domElement.style.pointerEvents = "none";
  parent.appendChild(labelRenderer.domElement);

  // EventListeners
  if (!eventFunctionsInstance) {
    eventFunctionsInstance = createEventFunctions();
  }
  eventFunctionsInstance();

  const tick = () => {
    timer.update();

    if (resizeRendererToDisplaySize(renderer, labelRenderer)) {
      const canvas = renderer.domElement;
      sceneInfo.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      sceneInfo.camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    renderer.render(sceneInfo.scene, sceneInfo.camera);
    labelRenderer.render(sceneInfo.scene, sceneInfo.camera);

    sceneInfo.controls.update();
    updateAnnotationPositions(canvasId);
    requestAnimationFrame(tick);
  };

  tick();
}

export { updateAnnotations };
