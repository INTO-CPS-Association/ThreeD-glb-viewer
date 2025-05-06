import GUI from "lil-gui";

export const gui = new GUI({
  title: "3D DTaaS Rendering",
});

gui.hide();

const modelFolder = gui.addFolder("Model");
const selectedPartFolder = gui.addFolder("Selected Part");

export { modelFolder, selectedPartFolder };
