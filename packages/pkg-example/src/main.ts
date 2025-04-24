import renderThreejs from "@into-cps-association/threed-glb-viewer";

async function main(modelSrc: string) {
  renderThreejs(modelSrc);
  renderThreejs(modelSrc, "test");
}

main("../static/models/2CylinderEngine/glTF/2CylinderEngine.gltf");
