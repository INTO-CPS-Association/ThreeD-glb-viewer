import * as THREE from "three";
import scene from "./scene";
import camera from "./camera";
import timer from "./timer";

export let pickPosition = new THREE.Vector2();

const raycaster = new THREE.Raycaster();

let pickedObject: any | null = null;
let pickedObjectSavedColor = 0;

export function pick(
  pickPositionProp: any,
  sceneProp: any,
  cameraProp: any,
  timeProp: any,
) {
  if (pickedObject !== null) {
    pickedObject.material.emissive.setHex(pickedObjectSavedColor);
    pickedObject = null;
  }

  raycaster.setFromCamera(pickPositionProp, cameraProp);

  var intersects = raycaster.intersectObjects(sceneProp.children, true);

  if (intersects.length > 0) {
    //console.log("Intersection:", intersects[0]);

    pickedObject = intersects[0].object;

    //console.log(typeof pickedObject);

    pickedObjectSavedColor = pickedObject.material.emissive.getHex();
    pickedObject.material.emissive.setHex(
      (timeProp * 8) % 2 > 1 ? 0xffff00 : 0xff0000,
    );
  }
}

function setPickPosition(event: any) {
  pickPosition.x = (event.clientX / window.innerWidth) * 2 - 1;
  pickPosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

export function clearPickPosition() {
  pickPosition.x = -Infinity;
  pickPosition.y = -Infinity;
}

const createPickerListener = () => {
  const elapsedTime = timer.getElapsed();
  window.addEventListener(
    "click",
    () => pick(pickPosition, scene, camera, elapsedTime),
    false,
  );

  window.addEventListener("mousemove", setPickPosition);
  window.addEventListener("mouseout", clearPickPosition);
  window.addEventListener("mouseleave", clearPickPosition);
};

export { createPickerListener };
