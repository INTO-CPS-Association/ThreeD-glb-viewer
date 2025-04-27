import * as THREE from "three";
import { selectedPartFolder } from "./lilgui";
import { renderCanvas } from "./main";

const pickHandler = () => {
  let pickPosition = new THREE.Vector2();

  const raycaster = new THREE.Raycaster();

  let pickedObject: any | null = null;
  let pickedObjectSavedColor = 0;

  const selectedPartProperties = {
    visibility: () => {},
    wireframe: () => {},
  };

  selectedPartProperties.visibility = () => {
    if (pickedObject !== null) {
      pickedObject.material.transparent = true;
      pickedObject.material.opacity = 0.5;
      console.log(pickedObject);
    }
  };

  selectedPartProperties.wireframe = () => {
    if (pickedObject !== null) {
      pickedObject.material.wireframe = !pickedObject.material.wireframe;
    }
  };

  selectedPartFolder
    .add(selectedPartProperties, "wireframe")
    .name("Toggle Wireframe");

  function filterIntersects(intersects: any) {
    const uniqueUUIDs = new Set();
    const filteredIntersects = [];

    for (let i = 0; i < intersects.length; i++) {
      const objectUUID = intersects[i].object.uuid;

      if (!uniqueUUIDs.has(objectUUID)) {
        uniqueUUIDs.add(objectUUID);
        filteredIntersects.push(intersects[i]);
      }
    }

    return filteredIntersects;
  }

  function pick(id: string, timeProp: number, reverse: boolean) {
    if (!renderCanvas[id]) return;
    if (pickPosition.x > 0.52 && pickPosition.y > 0.16) return;

    if (pickedObject !== null) {
      try {
        pickedObject.material.emissive.setHex(pickedObjectSavedColor);
      } catch {
        console.error("Missing setHex", pickedObject);
      }
      pickedObject = null;
    }

    const cameraProp = renderCanvas[id].sceneInfo.camera;
    const sceneProp = renderCanvas[id].sceneInfo.scene;

    raycaster.setFromCamera(pickPosition, cameraProp);

    let intersects = raycaster.intersectObjects(sceneProp.children, true);
    intersects = filterIntersects(intersects);

    if (intersects.length > 0) {
      if (!reverse) {
        for (let i = 0; i < intersects.length; i++) {
          //@ts-expect-error fix missing object type
          if (intersects[i].object.material.wireframe === false) {
            pickedObject = intersects[i].object;
            break;
          }
        }
        if (pickedObject === null)
          pickedObject = intersects[intersects.length - 1].object;
      } else {
        for (let i = intersects.length - 1; i >= 0; i--) {
          //@ts-expect-error fix missing object type
          if (intersects[i].object.material.wireframe === true) {
            pickedObject = intersects[i].object;
            break;
          }
        }
        if (pickedObject === null)
          pickedObject = intersects[intersects.length - 1].object;
      }

      if (pickedObject === null) return;
      if (
        pickedObject.parent?.name === "floor" ||
        pickedObject.type === "LineSegments"
      ) {
        pickedObject = null;
        return;
      }

      pickedObjectSavedColor = pickedObject.material.emissive.getHex();
      pickedObject.material.emissive.setHex(0xff0000);
    }
  }

  function setPickPosition(event: MouseEvent, canvas: HTMLCanvasElement) {
    pickPosition.x =
      2 * ((event.clientX - canvas.offsetLeft) / canvas.clientWidth) - 1;
    pickPosition.y =
      -2 * ((event.clientY - canvas.offsetTop) / canvas.clientHeight) + 1;
  }

  function clearPickPosition() {
    pickPosition.x = -Infinity;
    pickPosition.y = -Infinity;
  }

  const createPickerListener = () => {
    let mouseDown = false;
    let mouseMoved = false;

    window.addEventListener("mousedown", (event) => {
      if (event.button === 0 || event.button === 2) {
        mouseDown = true;
        mouseMoved = false;
      }
    });

    window.addEventListener("mousemove", () => {
      if (mouseDown) {
        mouseMoved = true;
      }
    });

    window.addEventListener("mouseup", (event) => {
      //@ts-ignore
      const id = event.target.id;
      const timer = renderCanvas[id]?.timer;
      if (!timer) return;
      const elapsedTime = timer.getElapsed();

      if (event.button === 0 && mouseDown && !mouseMoved) {
        pick(id, elapsedTime, false);
      } else if (event.button === 2 && mouseDown && !mouseMoved) {
        pick(id, elapsedTime, true);
      }
      mouseDown = false;
      mouseMoved = false;
    });

    window.addEventListener("mousemove", (event) => {
      //@ts-ignore
      const id = event.target.id;
      const canvas = renderCanvas[id]?.canvas;
      if (canvas) setPickPosition(event, canvas);
    });
    window.addEventListener("mouseout", clearPickPosition);
    window.addEventListener("mouseleave", clearPickPosition);
  };

  return { createPickerListener };
};

export default pickHandler;
