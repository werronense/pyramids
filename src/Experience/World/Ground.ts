import * as THREE from "three";
import Experience from "../Experience.ts";

export default class Ground {
  textures: Record<string, THREE.Texture<HTMLImageElement>> = {};
  experience: Experience = new Experience();
  resources = this.experience.resources;
  scene = this.experience.scene;
  ground: THREE.Mesh;

  constructor() {
    this.textures.groundAlphaTexture = this.resources.items.groundAlphaTexture;
    this.textures.groundColorTexture = this.resources.items.groundColorTexture;
    this.textures.groundARMTexture = this.resources.items.groundARMTexture;
    this.textures.groundNormalTexture =
      this.resources.items.groundNormalTexture;

    this.textures.groundColorTexture.colorSpace = THREE.SRGBColorSpace;
    this.textures.groundColorTexture.repeat.set(8, 8);
    this.textures.groundColorTexture.wrapS = THREE.RepeatWrapping;
    this.textures.groundColorTexture.wrapT = THREE.RepeatWrapping;

    this.textures.groundARMTexture.repeat.set(8, 8);
    this.textures.groundARMTexture.wrapS = THREE.RepeatWrapping;
    this.textures.groundARMTexture.wrapT = THREE.RepeatWrapping;

    this.textures.groundNormalTexture.repeat.set(8, 8);
    this.textures.groundNormalTexture.wrapS = THREE.RepeatWrapping;
    this.textures.groundNormalTexture.wrapT = THREE.RepeatWrapping;

    this.ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.MeshStandardMaterial({
        alphaMap: this.textures.groundAlphaTexture,
        aoMap: this.textures.groundARMTexture,
        color: 0xffffff,
        map: this.textures.groundColorTexture,
        metalnessMap: this.textures.groundARMTexture,
        normalMap: this.textures.groundNormalTexture,
        normalScale: new THREE.Vector2(0.25, 0.25),
        roughnessMap: this.textures.groundARMTexture,
        transparent: true,
      }),
    );

    this.ground.rotation.x = -Math.PI * 0.5;
    this.ground.receiveShadow = true;

    this.scene.add(this.ground);
  }
}
