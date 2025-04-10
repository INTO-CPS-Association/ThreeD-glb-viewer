import { modelFolder } from "../lilgui";
import gsap from "gsap";
import { Group, Object3DEventMap } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let model: any | null = null;
export default model;

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
  gsap.to(model.rotation, { y: model.rotation.y + -Math.PI / 2 });
};
modelProperties.flipRight = () => {
  gsap.to(model.rotation, { y: model.rotation.y + Math.PI / 2 });
};
modelProperties.flipUp = () => {
  gsap.to(model.rotation, { x: model.rotation.x + Math.PI / 2 });
};
modelProperties.flipDown = () => {
  gsap.to(model.rotation, { x: model.rotation.x + -Math.PI / 2 });
};

modelFolder.add(modelProperties, "flipLeft").name("left");
modelFolder.add(modelProperties, "flipRight").name("right");
modelFolder.add(modelProperties, "flipUp").name("up");
modelFolder.add(modelProperties, "flipDown").name("down");
