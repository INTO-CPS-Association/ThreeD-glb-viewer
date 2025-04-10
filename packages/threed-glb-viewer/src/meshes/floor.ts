import * as THREE from "three";

const floor = new THREE.Group();

const geometry = new THREE.PlaneGeometry(10, 10, 1, 1);
const lineMaterial = new THREE.LineBasicMaterial({
  color: 0xffffff,
  transparent: true,
  opacity: 0.5,
});
const meshMaterial = new THREE.MeshPhongMaterial({
  color: 0x156289,
  emissive: 0x072534,
  side: undefined,
  flatShading: true,
});

floor.add(new THREE.LineSegments(geometry, lineMaterial));
floor.add(new THREE.Mesh(geometry, meshMaterial));
floor.rotation.x = Math.PI / -2;
floor.position.y = -2;
floor.name = "floor";

export default floor;
