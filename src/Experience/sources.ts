import groundAlpha from "../assets/alpha.webp";
import groundColor from "../assets/aerial_beach_01_1k/aerial_beach_01_diff_1k.webp";
import groundARM from "../assets/aerial_beach_01_1k/aerial_beach_01_arm_1k.webp";
import groundNormal from "../assets/aerial_beach_01_1k/aerial_beach_01_nor_gl_1k.webp";

export type TSource = {
  name: string;
  type: string;
  path: string;
};

export default [
  {
    name: "groundAlphaTexture",
    type: "texture",
    path: groundAlpha,
  },
  {
    name: "groundColorTexture",
    type: "texture",
    path: groundColor,
  },
  {
    name: "groundARMTexture",
    type: "texture",
    path: groundARM,
  },
  {
    name: "groundNormalTexture",
    type: "texture",
    path: groundNormal,
  },
];
