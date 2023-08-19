import K from "../kaboom";
import marioTileset from "../../assets/images/tileset/mario_tileset.png";
import { testLevel, level2 } from "../levels/layouts";
import pika from "../../assets/images/sprites/pika.png";
import mario from "../../assets/images/sprites/mario/sm-mario-one.png";
import cloud from "../../assets/images/sprites/mario/sm-cloud.png";
import pipe from "../../assets/images/sprites/mario/sm-pipe.png";
import { Boss, Enemy } from "./Enemy";

export class Level {
  constructor(player) {
    this.bossActive = false;
    K.loadSprite("tiles", marioTileset, { sliceX: 8, sliceY: 8 });
    K.loadSprite("prize", mario);
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
          K.sprite("prize"),
          K.area(),
          K.body({ isStatic: true }),
          "prize",
        ],
      },
    });

    this.level = K.add([logPlayerPosition(this, player)]);
    this.player = player;
  }

  activateBoss() {
    this.bossActive = true;
    console.log("fire");
    const boss = new Boss(this.player);
  }
}

function logPlayerPosition(level, player) {
  return {
    add() {},
    update() {
      if (player.sprite.pos.x > 100 && !level.bossActive) {
        level.activateBoss();
      }
    },
  };
}

export class Level2 {
  constructor() {
    K.loadSprite("tiles", marioTileset, { sliceX: 8, sliceY: 8 });
    K.loadSprite("mario", mario, { sliceX: 1, sliceY: 2 });
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
        "^": () => [K.sprite("cloud"), "cloud"],
        "<": () => [
          K.sprite("mario", { frame: 0 }), // top half
          K.scale(1),
          K.area(),
          K.body({ isStatic: true }),
          "mario",
        ],
        ">": () => [
          K.sprite("mario", { frame: 1 }), // bottom half
          K.scale(1),
          K.area(),
          K.body({ isStatic: true }),
          "mario",
        ],
        x: () => [
          K.sprite("pipe", { frame: 0 }), // top half
          K.area(),
          K.body({ isStatic: true }),
          "pipe",
        ],
        y: () => [
          K.sprite("pipe", { frame: 1 }), // bottom half
          K.area(),
          K.body({ isStatic: true }),
          "pipe",
        ],
      },
    });
  }
}
