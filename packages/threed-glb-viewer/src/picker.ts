import * as THREE from "three";
import { selectedPartFolder } from "./lilgui";
import { renderCanvas } from "./main";
import { createAnnotation } from "./annotations";

const pickHandler = () => {
  let pickPosition = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  let pickedObject: any | null = null;
  let pickedObjectSavedColor = 0;
  let pickedPosition: any | undefined;

  const selectedPartProperties = {
    visibility: () => {},
    wireframe: () => {},
  };

  selectedPartProperties.visibility = () => {
    if (pickedObject !== null) {
      pickedObject.material.transparent = true;
      pickedObject.material.opacity = 0.5;
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

  function pick(id: string, reverse: boolean) {
    const renderCanvasRef = renderCanvas.get(id);
    if (!renderCanvasRef) return;
    if (pickPosition.x > 0.52 && pickPosition.y > 0.16) return;

    if (pickedObject !== null) {
      try {
        pickedObject.material.emissive.setHex(pickedObjectSavedColor);
      } catch {
        console.error("Missing setHex", pickedObject);
      }
      pickedObject = null;
    }

    const cameraProp = renderCanvasRef.sceneInfo.camera;
    const sceneProp = renderCanvasRef.sceneInfo.scene;

    raycaster.setFromCamera(pickPosition, cameraProp);

    let intersects = raycaster.intersectObjects(sceneProp.children, true);
    intersects = filterIntersects(intersects);

    if (intersects.length > 0) {
      if (!reverse) {
        for (let i = 0; i < intersects.length; i++) {
          //@ts-expect-error fix missing object type
          if (intersects[i].object.material.wireframe === false) {
            pickedObject = intersects[i].object;
            pickedPosition = intersects[i].point;
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
            pickedPosition = intersects[i].point;
            break;
          }
        }
        if (pickedObject === null) {
          pickedObject = intersects[intersects.length - 1].object;
          pickedPosition = intersects[intersects.length - 1].point;
        }
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
      createAnnotation(
        id,
        "picker-annotation",
        {
          x: pickedPosition.x,
          y: pickedPosition.y,
          z: pickedPosition.z,
          name: pickedObject.name,
          value: "",
        },
        true,
      );
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

    window.addEventListener("mouseup", (event) => {
      //@ts-ignore
      const id = event.target.parentElement?.id;

      if (event.button === 0 && mouseDown && !mouseMoved && id) {
        pick(id, false);
      } else if (event.button === 2 && mouseDown && !mouseMoved) {
        pick(id, true);
      }
      mouseDown = false;
      mouseMoved = false;
    });

    window.addEventListener("mousemove", (event) => {
      //@ts-ignore
      const id = event.target.parentElement?.id;
      const canvas = renderCanvas.get(id)?.canvas;
      if (canvas) setPickPosition(event, canvas);

      if (mouseDown) {
        mouseMoved = true;
      }
    });

    window.addEventListener("mouseout", clearPickPosition);
    window.addEventListener("mouseleave", clearPickPosition);
  };

  return { createPickerListener };
};

export default pickHandler;
