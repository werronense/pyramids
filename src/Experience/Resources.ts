import * as THREE from "three";
import EventEmitter from "./Utils/EventEmitter.ts";
import { type TSource } from "./sources.ts";

export default class Resources extends EventEmitter {
  sources: TSource[];
  textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
  items: { [key: string]: THREE.Texture<HTMLImageElement> } = {};
  toLoad: number;
  loaded: number = 0;

  constructor(sources: TSource[]) {
    super();

    // Setup
    this.sources = sources;
    this.toLoad = this.sources.length;

    this.startLoading();
  }

  startLoading() {
    for (const source of this.sources) {
      this.textureLoader.load(source.path, (file) => {
        this.sourceLoaded(source, file);
      });
    }
  }

  sourceLoaded(source: TSource, file: THREE.Texture<HTMLImageElement>) {
    this.items[source.name as keyof typeof source] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.emit("ready");
    }
  }
}
