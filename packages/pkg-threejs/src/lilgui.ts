import GUI from "lil-gui";

const gui = new GUI({
  title: "3D DTaaS Rendering",
});

const modelFolder = gui.addFolder("Model");
const lightsFolder = gui.addFolder("Lights");
lightsFolder.close();

const directionalLightFolder = lightsFolder.addFolder("Directional Light");
const ambientLightFolder = lightsFolder.addFolder("Ambient Light");
const hemisphereLightFolder = lightsFolder.addFolder("Hemisphere Light");

export {
  modelFolder,
  lightsFolder,
  directionalLightFolder,
  hemisphereLightFolder,
  ambientLightFolder,
};
