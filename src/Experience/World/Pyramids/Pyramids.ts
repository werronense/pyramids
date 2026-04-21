import * as THREE from "three";
import Experience from "../../Experience.ts";
import Pyramid from "./Pyramid.ts";
import { pyramids } from "./data.ts";

export default class Pyramids {
  experience: Experience = new Experience();
  scene = this.experience.scene;
  pyramids: THREE.Group = new THREE.Group();

  constructor() {
    for (const pyramid of pyramids) {
      const newPyramid = new Pyramid(pyramid);

      this.pyramids.add(newPyramid.instance);
    }

    this.scene.add(this.pyramids);
  }
}
