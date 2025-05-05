import {
  renderThreejs,
  CustomCanvas,
  updateAnnotations,
} from "@into-cps-association/threed-glb-viewer";

const body = document.getElementsByTagName("body")[0];

const customCanvas = CustomCanvas("test");
const customCanvas1 = CustomCanvas("test1");

body.appendChild(customCanvas);
body.appendChild(customCanvas1);

renderThreejs(
  "../static/models/2CylinderEngine/glTF/2CylinderEngine.gltf",
  "test",
  true,
);

renderThreejs("../static/models/Buggy/glTF/Buggy.gltf", "test1");

setInterval(() => {
  const random1 = Math.random() * 100;
  const random2 = Math.random() * 100;
  updateAnnotations(
    {
      motor1: {
        x: -100,
        y: 100,
        z: 0,
        name: "Motor 1 speed",
        value: random1.toString(),
      },
      motor2: {
        x: 100,
        y: 100,
        z: 0,
        name: "Motor 2 speed",
        value: random2.toString(),
      },
    },
    "test",
  );
}, 2000);
