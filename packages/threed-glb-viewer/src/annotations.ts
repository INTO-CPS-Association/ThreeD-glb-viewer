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
  canvasId: string = "threed-glb-viewer-canvas",
) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      createAnnotation(canvasId, key, value);
    }
  }
}

export function createAnnotation(
  canvasId: string,
  partId: string,
  annotation: Annotation,
  addToScene?: boolean,
) {
  const renderCanvasInfo = renderCanvas.get(canvasId);
  if (!renderCanvasInfo?.model) return;

  let innerMap = annotationData.get(canvasId);

  if (innerMap && innerMap.get(partId)) {
    const oldAnnotation = innerMap.get(partId)!;

    const elem = document.getElementById(canvasId + "-" + partId);

    if (elem) {
      const name = elem.getElementsByClassName("annotation-name")[0] as
        | HTMLDivElement
        | undefined;
      const value = elem.getElementsByClassName("annotation-value")[0] as
        | HTMLDivElement
        | undefined;
      if (name) name.innerText = annotation.name;
      if (value) value.innerText = annotation.value;
    }

    oldAnnotation.elem?.position.set(annotation.x, annotation.y, annotation.z);

    innerMap.set(partId, { ...oldAnnotation, ...annotation });
  } else {
    const { name, x, y, z, value } = annotation;

    const elem = document.createElement("wrapper");
    elem.className = "annotation";
    elem.id = canvasId + "-" + partId;

    const nameElem = document.createElement("div");
    nameElem.className = "annotation-name";
    nameElem.textContent = name;
    elem.appendChild(nameElem);

    const valElem = document.createElement("div");
    valElem.className = "annotation-value";
    valElem.textContent = value;
    elem.appendChild(valElem);

    const wrapperObject = new CSS2DObject(elem);
    wrapperObject.position.set(x, y, z);

    addToScene
      ? renderCanvasInfo.sceneInfo.scene.add(wrapperObject)
      : renderCanvasInfo.model.add(wrapperObject);

    if (innerMap) {
      innerMap.set(partId, { ...annotation, elem: wrapperObject });
    } else {
      innerMap = new Map<string, Annotation>();
      innerMap.set(partId, { ...annotation, elem: wrapperObject });
    }
    annotationData.set(canvasId, innerMap);
  }
}

const raycast = new Raycaster();

export function updateAnnotationPositions(canvasId: string) {
  const renderCanvasRef = renderCanvas.get(canvasId);
  if (!renderCanvasRef) return;

  const innerMap = annotationData.get(canvasId);

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
        let hits = raycast.intersectObjects([renderCanvasRef.model]);
        hits = hits.filter(
          (hit) =>
            //@ts-ignore
            hit.object.material.wireframe === false,
        );
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
