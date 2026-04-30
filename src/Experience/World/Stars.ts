import * as THREE from "three";
import Experience from "../Experience.ts";
import starsVertexShader from "../../shaders/stars/vertex.glsl";
import starsFragmentShader from "../../shaders/stars/fragment.glsl";

export default class Stars {
  experience: Experience = new Experience();
  scene = this.experience.scene;
  sizes = this.experience.sizes;
  starCount: number = 2500;
  starPositions: Float32Array = new Float32Array(this.starCount * 3);
  starGeometry: THREE.BufferGeometry = new THREE.BufferGeometry();
  starMaterial: THREE.ShaderMaterial;
  stars: THREE.Points;

  constructor() {
    // Setup star positions
    for (let i = 0; i < this.starCount; ++i) {
      const i3 = i * 3;

      const radius = 15 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.5;

      this.starPositions[i3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
      this.starPositions[i3 + 1] = radius * Math.cos(phi);
      this.starPositions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    this.starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.starPositions, 3),
    );

    this.starMaterial = new THREE.ShaderMaterial({
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      vertexShader: starsVertexShader,
      fragmentShader: starsFragmentShader,
      uniforms: {
        uSize: { value: 8 * this.sizes.pixelRatio },
      },
    });

    this.stars = new THREE.Points(this.starGeometry, this.starMaterial);

    this.scene.add(this.stars);
  }
}
