import * as THREE from "three";
import Experience from "../Experience.ts";

export default class Environment {
  experience: Experience = new Experience();
  scene = this.experience.scene;
  lightHexColor: number = 0x86cdff;
  ambientLight: THREE.AmbientLight;
  directionalLight: THREE.DirectionalLight;

  constructor() {
    // Setup ambient light
    this.ambientLight = new THREE.AmbientLight(this.lightHexColor, 0.25);

    this.scene.add(this.ambientLight);

    // Setup directional light
    this.directionalLight = new THREE.DirectionalLight(this.lightHexColor, 1);

    this.directionalLight.position.set(3, 2, -8);

    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 1024;
    this.directionalLight.shadow.mapSize.height = 1024;
    this.directionalLight.shadow.camera.far = 20;

    this.scene.add(this.directionalLight);

    // Fog
    this.scene.fog = new THREE.FogExp2(0x02343f, 0.05);
  }
}
