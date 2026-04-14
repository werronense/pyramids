import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons";

// sizes
const sizes = {
  screen: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  pyramids: {
    khufu: {
      height: 1.46,
      width: 2.3,
    },
    khafre: {
      height: 1.36,
      width: 2.15,
    },
    menkaure: {
      height: 0.65,
      width: 1.08,
    },
  },
};

// utils
const calculatePyramidRadius = (width: number) => {
  return Math.sqrt(2 * Math.pow(width / 2, 2));
};

// canvas
const canvas =
  (document.querySelector("canvas.webgl") as HTMLCanvasElement) ?? undefined;

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.screen.width / sizes.screen.height,
  0.1,
  100,
);
camera.position.set(3, 0.5, 7);
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// textures
const textureLoader = new THREE.TextureLoader();

const groundAlphaTexture = textureLoader.load("./alpha.webp");
const groundColorTexture = textureLoader.load(
  "./aerial_beach_01_1k/aerial_beach_01_diff_1k.jpg",
);
const groundARMTexture = textureLoader.load(
  "./aerial_beach_01_1k/aerial_beach_01_arm_1k.jpg",
);
const groundNormalTexture = textureLoader.load(
  "./aerial_beach_01_1k/aerial_beach_01_nor_gl_1k.jpg",
);

groundColorTexture.colorSpace = THREE.SRGBColorSpace;
groundColorTexture.repeat.set(8, 8);
groundColorTexture.wrapS = THREE.RepeatWrapping;
groundColorTexture.wrapT = THREE.RepeatWrapping;

groundARMTexture.repeat.set(8, 8);
groundARMTexture.wrapS = THREE.RepeatWrapping;
groundARMTexture.wrapT = THREE.RepeatWrapping;

groundNormalTexture.repeat.set(8, 8);
groundNormalTexture.wrapS = THREE.RepeatWrapping;
groundNormalTexture.wrapT = THREE.RepeatWrapping;

// geometries
// ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({
    alphaMap: groundAlphaTexture,
    aoMap: groundARMTexture,
    color: 0xffffff,
    map: groundColorTexture,
    metalnessMap: groundARMTexture,
    normalMap: groundNormalTexture,
    roughnessMap: groundARMTexture,
    transparent: true,
  }),
);
ground.rotation.x = -Math.PI * 0.5;
ground.receiveShadow = true;
scene.add(ground);

// pyramids
const pyramids = new THREE.Group();
scene.add(pyramids);

const limestoneHexColor = 0xdcd8c7;
const pyramidMaterial = new THREE.MeshStandardMaterial({
  color: limestoneHexColor,
});

const khufu = new THREE.Mesh(
  new THREE.ConeGeometry(
    calculatePyramidRadius(sizes.pyramids.khufu.width),
    sizes.pyramids.khufu.height,
    4,
  ),
  pyramidMaterial,
);
khufu.position.y = sizes.pyramids.khufu.height * 0.5;
khufu.position.z = -2.75 * calculatePyramidRadius(sizes.pyramids.khufu.width);
khufu.castShadow = true;
pyramids.add(khufu);

const khafre = new THREE.Mesh(
  new THREE.ConeGeometry(
    calculatePyramidRadius(sizes.pyramids.khafre.width),
    sizes.pyramids.khafre.height,
    4,
  ),
  pyramidMaterial,
);
khafre.position.y = sizes.pyramids.khafre.height * 0.5;
khafre.castShadow = true;
pyramids.add(khafre);

const menkaure = new THREE.Mesh(
  new THREE.ConeGeometry(
    calculatePyramidRadius(sizes.pyramids.menkaure.width),
    sizes.pyramids.menkaure.height,
    4,
  ),
  pyramidMaterial,
);
menkaure.position.x = 2 * calculatePyramidRadius(sizes.pyramids.menkaure.width);
menkaure.position.y = sizes.pyramids.menkaure.height * 0.5;
menkaure.position.z = 6 * calculatePyramidRadius(sizes.pyramids.menkaure.width);
menkaure.castShadow = true;
scene.add(menkaure);

// lights
const lightHexColor = 0x86cdff;

const ambientLight = new THREE.AmbientLight(lightHexColor, 0.25);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(lightHexColor, 1);
directionalLight.position.set(3, 2, -8);
directionalLight.castShadow = true;

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.far = 20;

scene.add(directionalLight);

// fog
scene.fog = new THREE.FogExp2(0x02343f, 0.125);

// renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.screen.width, sizes.screen.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

// event listeners
window.addEventListener("resize", () => {
  sizes.screen.width = window.innerWidth;
  sizes.screen.height = window.innerHeight;

  camera.aspect = sizes.screen.width / sizes.screen.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.screen.width, sizes.screen.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// animation
const animate = () => {
  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

animate();
