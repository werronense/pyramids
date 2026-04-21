import * as THREE from "three";

type Parameters = {
  height: number;
  width: number;
  offsets: {
    x: number;
    z: number;
  };
};

export default class Pyramid {
  width: number;
  height: number;
  radius: number;
  limestoneHexColor = 0xdcd8c7;
  material: THREE.MeshStandardMaterial;
  geometry: THREE.ConeGeometry;
  instance: THREE.Mesh;
  offsetX: number;
  offsetY: number;
  offsetZ: number;

  constructor({ height, width, offsets }: Parameters) {
    this.width = width;
    this.height = height;

    this.radius = Math.sqrt(2 * Math.pow(this.width / 2, 2));

    this.offsetX = offsets.x;
    this.offsetY = this.height / 2;
    this.offsetZ = offsets.z;

    this.geometry = new THREE.ConeGeometry(this.radius, this.height, 4);

    this.material = new THREE.MeshStandardMaterial({
      color: this.limestoneHexColor,
    });

    this.instance = new THREE.Mesh(this.geometry, this.material);

    this.instance.castShadow = true;
    this.instance.position.set(this.offsetX, this.offsetY, this.offsetZ);
  }
}
