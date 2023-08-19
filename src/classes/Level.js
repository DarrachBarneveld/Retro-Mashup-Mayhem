import K from "../kaboom";
import marioTileset from "../../assets/images/tileset/mario_tileset.png";
import { testLevel } from "../levels/level1Data";
import pika from "../../assets/images/sprites/pika.png";

export class Level {
  constructor() {
    K.loadSprite("tiles", marioTileset, { sliceX: 8, sliceY: 8 });
    K.loadSprite("pika", pika);

    K.addLevel(testLevel, {
      tileWidth: 16,
      tileHeight: 16,
      tiles: {
        "=": () => [
          K.sprite("tiles", { frame: 2 }),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],
        "^": () => [
          K.sprite("tiles", { frame: 4 }),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],
        "<": () => [
          K.sprite("pika"),
          K.scale(0.25),
          K.area(),
          K.body({ isStatic: true }),
          "pika",
        ],
      },
    });
  }
}
