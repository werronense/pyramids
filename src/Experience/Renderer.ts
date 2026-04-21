import * as THREE from "three";
import Experience from "./Experience";

export default class Renderer {
  instance: THREE.WebGLRenderer;
  experience: Experience = new Experience();
  canvas = this.experience.canvas;
  sizes = this.experience.sizes;
  scene = this.experience.scene;
  camera = this.experience.camera!;

  constructor() {
    // Setup instance
    this.instance = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
    });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFShadowMap;
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
