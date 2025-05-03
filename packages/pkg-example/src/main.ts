import {
  renderThreejs,
  CustomCanvas,
  updateAnnotations,
} from "@into-cps-association/threed-glb-viewer";

const custom = CustomCanvas();
const body = document.getElementsByTagName("body")[0];
body.appendChild(custom);

renderThreejs("../static/models/2CylinderEngine/glTF/2CylinderEngine.gltf");

setInterval(() => {
  const random1 = Math.random() * 100;
  const random2 = Math.random() * 100;
  updateAnnotations({
    motor1: {
      x: 1,
      y: 1,
      z: 1,
      name: "Motor 1 speed",
      value: random1.toString(),
    },
    motor2: {
      x: -1,
      y: 1,
      z: 1,
      name: "Motor 2 speed",
      value: random2.toString(),
    },
  });
}, 2000);
