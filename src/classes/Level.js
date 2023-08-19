import K from "../kaboom";
import marioTileset from "../../assets/images/tileset/mario_tileset.png";
import { testLevel, level2 } from "../levels/layouts";
import pika from "../../assets/images/sprites/pika.png";
import mario from "../../assets/images/sprites/mario/sm-mario-one.png";
import cloud from "../../assets/images/sprites/mario/sm-cloud.png";
import pipe from "../../assets/images/sprites/mario/sm-pipe.png";



export class Level {
  constructor() {
    K.loadSprite("tiles", marioTileset, { sliceX: 8, sliceY: 8 });
    K.loadSprite("pika", mario);

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
          K.area(),
          K.body({ isStatic: true }),
          "pika",
        ],
      },
    });
  }
}

export class Level2 {
  constructor() {
    K.loadSprite("tiles", marioTileset, { sliceX: 8, sliceY: 8 });
    K.loadSprite("mario", mario);
    K.loadSprite("cloud", cloud);
    K.loadSprite("pipe", pipe, { sliceX: 1, sliceY: 2 }); 

    K.addLevel(level2, {
      tileWidth: 16,
      tileHeight: 16,
      tiles: {
        "=": () => [
          K.sprite("tiles", { frame: 0 }),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],
        "^": () => [
          K.sprite("cloud"),
          "cloud",
        ],
        "<": () => [
          K.sprite("mario"),
          K.scale(1),
          K.area(),
          K.body({ isStatic: true }),
          "mario",
        ],
        "x": () => [
          K.sprite("pipe", { frame: 0 }), // top half
          K.area(),
          K.body({ isStatic: true }),
          "pipe",
        ],
        "y": () => [
          K.sprite("pipe", { frame: 1 }), // bottom half
          K.area(),
          K.body({ isStatic: true }),
          "pipe",
        ],
      },
    });
  }
}
