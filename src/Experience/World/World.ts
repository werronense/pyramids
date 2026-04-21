import Experience from "../Experience.ts";
import Environment from "./Environment.ts";
import Ground from "./Ground.ts";
import Pyramids from "./Pyramids/Pyramids.ts";
import Stars from "./Stars.ts";

export default class World {
  experience: Experience = new Experience();
  resources = this.experience.resources;
  overlay = document.querySelector("div.overlay");
  environment?: Environment;
  ground?: Ground;
  pyramids?: Pyramids;
  stars?: Stars;

  constructor() {
    this.resources.on("ready", () => {
      this.ground = new Ground();
      this.pyramids = new Pyramids();
      this.stars = new Stars();
      this.environment = new Environment();

      this.overlay?.classList.add("close-overlay");
    });
  }
}
