import * as THREE from "three";
import {
  directionalLightFolder,
  ambientLightFolder,
  hemisphereLightFolder,
} from "./lilgui";

const ambientLight = new THREE.AmbientLight("white", 1);

ambientLightFolder
  .add(ambientLight, "intensity")
  .min(0)
  .max(5)
  .step(0.01)
  .name("Intensity");

const hemisphereLight = new THREE.HemisphereLight("white", "green", 1);
hemisphereLightFolder
  .add(hemisphereLight, "intensity")
  .min(0)
  .max(10)
  .step(0.01)
  .name("Intensity");

const directionalLight = new THREE.DirectionalLight("white", 2);
directionalLight.position.set(2, 2, 2);
directionalLightFolder
  .add(directionalLight, "intensity")
  .min(0)
  .max(10)
  .step(0.01)
  .name("Intensity");

directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 10;

export { ambientLight, hemisphereLight, directionalLight };
