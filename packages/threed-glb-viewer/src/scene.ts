import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function Scene(canvas: HTMLCanvasElement, name: string) {
  const scene = new THREE.Scene();
  scene.name = name;
  scene.background = new THREE.Color("#DEFEFF");

  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);
  camera.position.z = 2;

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const ambientLight = new THREE.AmbientLight("white", 1);
  scene.add(ambientLight);

  const hemisphereLight = new THREE.HemisphereLight("white", "green", 1);
  scene.add(hemisphereLight);

  const directionalLight = new THREE.DirectionalLight("white", 2);
  directionalLight.position.set(2, 2, 2);
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.far = 10;
  scene.add(directionalLight);

  return {
    scene,
    camera,
    controls,
    ambientLight,
    hemisphereLight,
    directionalLight,
    canvas,
  };
}
