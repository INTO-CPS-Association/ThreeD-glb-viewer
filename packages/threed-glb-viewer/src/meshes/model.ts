import { modelFolder } from "../lilgui";
import gsap from "gsap";
import { Group, Object3DEventMap } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { CanvasStyles } from "../utils/fullscreen";
import { renderCanvas } from "../main";

let model: any | null = null;

export async function loadModel(
  src: string,
): Promise<Group<Object3DEventMap> | undefined> {
  try {
    const gltf = await new GLTFLoader().loadAsync(src);
    model = gltf.scene;
    model.scale.set(0.01, 0.01, 0.01);
    model.position.setY(0);
    return model;
  } catch (error) {
    console.log(error);
  }
}

export const modelProperties = {
  flipLeft: () => {},
  flipRight: () => {},
  flipUp: () => {},
  flipDown: () => {},
};

modelProperties.flipLeft = () => {
  Object.keys(CanvasStyles).forEach((key) => {
    const style = CanvasStyles[key];
    if (style.fullscreen) {
      model = renderCanvas[key].model;
      if (model)
        gsap.to(model.rotation, { y: model.rotation.y + -Math.PI / 2 });
    }
  });
};
modelProperties.flipRight = () => {
  Object.keys(CanvasStyles).forEach((key) => {
    const style = CanvasStyles[key];
    if (style.fullscreen) {
      model = renderCanvas[key].model;
      if (model) gsap.to(model.rotation, { y: model.rotation.y + Math.PI / 2 });
    }
  });
};
modelProperties.flipUp = () => {
  Object.keys(CanvasStyles).forEach((key) => {
    const style = CanvasStyles[key];
    if (style.fullscreen) {
      model = renderCanvas[key].model;
      if (model) gsap.to(model.rotation, { x: model.rotation.x + Math.PI / 2 });
    }
  });
};
modelProperties.flipDown = () => {
  Object.keys(CanvasStyles).forEach((key) => {
    const style = CanvasStyles[key];
    if (style.fullscreen) {
      model = renderCanvas[key].model;
      if (model)
        gsap.to(model.rotation, { x: model.rotation.x + -Math.PI / 2 });
    }
  });
};

modelFolder.add(modelProperties, "flipLeft").name("left");
modelFolder.add(modelProperties, "flipRight").name("right");
modelFolder.add(modelProperties, "flipUp").name("up");
modelFolder.add(modelProperties, "flipDown").name("down");
