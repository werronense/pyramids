import * as THREE from "three";
import { OrbitControls } from "three/addons";
import Experience from "./Experience";
import type Sizes from "./Utils/Sizes.ts";

export default class Camera {
  experience: Experience = new Experience();
  sizes: Sizes = this.experience.sizes;
  scene: THREE.Scene = this.experience.scene;
  canvas: HTMLCanvasElement = this.experience.canvas;
  instance: THREE.PerspectiveCamera;
  controls: OrbitControls;

  constructor() {
    // Setup instance
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100,
    );
    this.instance.position.set(3, 0.5, 7);
    this.scene.add(this.instance);

    // Setup orbit controls
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.maxPolarAngle = Math.PI / 2 - 0.025;
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
