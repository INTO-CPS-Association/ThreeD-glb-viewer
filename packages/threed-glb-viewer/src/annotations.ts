import { Raycaster } from "three";
import { renderCanvas } from "./main";
import { CSS2DObject } from "three/examples/jsm/Addons.js";

type Annotation = {
  name: string;
  x: number;
  y: number;
  z: number;
  value: string;
  elem?: CSS2DObject;
};

export let annotationData = new Map<string, Map<string, Annotation>>();

export function updateAnnotations(
  data: { [key: string]: Annotation },
  id: string = "threed-glb-viewer-canvas",
) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      createAnnotation(id, key, value);
    }
  }
}

export function createAnnotation(
  id: string,
  key: string,
  annotation: Annotation,
) {
  const sceneInfo = renderCanvas.get(id)?.sceneInfo;
  if (!sceneInfo) return;

  let innerMap = annotationData.get(id);

  if (innerMap && innerMap.get(key)) {
    const oldAnnotation = innerMap.get(key)!;

    const elem = document
      .getElementById(id + "-" + key)
      ?.getElementsByClassName("value")[0] as HTMLDivElement | undefined;

    if (elem) {
      elem.innerText = annotation.value;
    }

    innerMap.set(key, { ...oldAnnotation, ...annotation });
  } else {
    const { name, x, y, z, value } = annotation;

    const elem = document.createElement("wrapper");
    elem.textContent = name;
    elem.style.width = "max-content";
    elem.style.backgroundColor = "white";
    elem.style.border = "1px black solid";
    elem.style.padding = "5px";
    elem.style.borderRadius = "5px";
    elem.id = id + "-" + key;

    const val = document.createElement("div");
    val.textContent = value;
    val.className = "value";
    elem.appendChild(val);

    const wrapperObject = new CSS2DObject(elem);
    wrapperObject.position.set(x, y, z);

    sceneInfo.scene.add(wrapperObject);

    if (innerMap) {
      innerMap.set(key, { ...annotation, elem: wrapperObject });
    } else {
      innerMap = new Map<string, Annotation>();
      innerMap.set(key, { ...annotation, elem: wrapperObject });
    }
    annotationData.set(id, innerMap);
  }
}

const raycast = new Raycaster();

export function updateAnnotationPositions(id: string) {
  const renderCanvasRef = renderCanvas.get(id);
  if (!renderCanvasRef) return;

  const innerMap = annotationData.get(id);

  if (innerMap)
    innerMap.forEach((annotation, key) => {
      const { elem } = annotation;

      if (elem && renderCanvasRef.model) {
        elem.getWorldPosition(raycast.ray.origin);
        const rd = renderCanvasRef.sceneInfo.camera.position
          .clone()
          .sub(raycast.ray.origin)
          .normalize();
        raycast.ray.direction.set(rd.x, rd.y, rd.z);
        const hits = raycast.intersectObjects([renderCanvasRef.model]);
        if (hits.length > 0) {
          elem.visible = false;
        } else {
          elem.visible = true;
        }
        innerMap.set(key, { ...annotation, elem });
      } else {
      }
    });
}
