import * as THREE from "three";
import Sizes from "./Utils/Sizes.ts";
import Time from "./Utils/Time.ts";
import Resources from "./Resources.ts";
import Camera from "./Camera.ts";
import Renderer from "./Renderer.ts";
import World from "./World/World.ts";
import sources from "./sources.ts";

let instance: Experience | null = null;

export default class Experience {
  canvas: HTMLCanvasElement = document.querySelector("canvas.webgl")!;
  sizes: Sizes = new Sizes();
  time: Time = new Time();
  scene: THREE.Scene = new THREE.Scene();
  resources: Resources = new Resources(sources);
  camera?: Camera;
  renderer?: Renderer;
  world?: World;

  constructor() {
    // Singleton
    if (instance) return instance;
    instance = this;

    // Setup
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    // Sizes resize event
    this.sizes.on("resize", () => {
      this.resize();
    });

    // Time tick event
    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera?.resize();
    this.renderer?.resize();
  }

  update() {
    this.camera?.update();
    this.renderer?.update();
  }
}
