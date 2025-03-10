//import renderThreejs from "../../pkg-threejs/dist/main";
import renderThreejs from "../../pkg-threejs/dist/main";

async function main(modelSrc: string) {
  renderThreejs(modelSrc);
}

main("../static/models/2CylinderEngine/glTF/2CylinderEngine.gltf");
