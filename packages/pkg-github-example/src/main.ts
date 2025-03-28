import renderThreejs from "@into-cps-association/threed-glb-viewer";

async function main(modelSrc: string) {
  renderThreejs(modelSrc);
}

main("../static/models/2CylinderEngine/glTF/2CylinderEngine.gltf");
