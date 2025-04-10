import { createDoubleClickListener } from "./utils/fullscreen";
import scene from "./scene";
import canvas from "./canvas";
import { ambientLight, directionalLight, hemisphereLight } from "./lights";
import { tick } from "./timer";
import floor from "./meshes/floor";
import { createPickerListener } from "./picker";
import { loadModel } from "./meshes/model";

export default async function renderThreejs(modelSrc: string) {
  // Meshes
  const model = await loadModel(modelSrc);
  if (model) scene.add(model);
  scene.add(floor);

  // Lights
  scene.add(ambientLight);
  scene.add(hemisphereLight);
  scene.add(directionalLight);

  // EventListeners
  createDoubleClickListener(canvas);
  createPickerListener();

  tick();
}
