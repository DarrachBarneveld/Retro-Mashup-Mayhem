import K from "../kaboom";
import pokemonTileset from "../../assets/images/tileset/pokemon-tileset.png";
import house from "../../assets/images/tileset/pokemon-house.png";
import center from "../../assets/images/tileset/pokemon-center.png";
import pika from "../../assets/images/sprites/pokemon/pikasprite.png";
import music from "../../assets/audio/music/pokemon-win-music.mp3";

import { level2 } from "../levels/layouts";

import { Boss, Enemy, HomingEnemy, StaticEnemy } from "./Enemy";
import { Player } from "./Player";
import { logPlayerPosition } from "./Level";

const staticObject = {
  sprite: "arbok",
  die: "arbokdead",
  bullet: "arbokbullet",
  shot: "arbokshoot",
};

const bossObject = {
  sprite: "mewtwo",
  die: "mewtwodies",
  hurt: "mewtwohurt",
  bullet: "arbokbullet",
  shot: "mewtwoshoot",
  arrives: "mewtwoarrives",
  win: "pokemonwin",
  gameLevel: 2,
  health: 800,
};

export class Level2 {
  constructor(player) {
    // Set background
    const background = document.getElementById("mycanvas");
    background.style.background = "var(--clr-pokemon-color)";

    K.loadSound("music", music);
    K.play("music", { loop: true });
    this.player = player;

    this.bossActive = false;
    this.staticEnemyCoords = [];
    K.loadSprite("tiles", pokemonTileset, { sliceX: 8, sliceY: 8 });
    K.loadSprite("house", house);
    K.loadSprite("center", center);
    K.loadSprite("pika", pika, {
      sliceX: 3,
      sliceY: 1,
      anims: { idle: { from: 1, to: 3 } },
    });

    K.addLevel(level2, {
      tileWidth: 16,
      tileHeight: 16,
      tiles: {
        // Ground tile
        "=": () => [
          K.sprite("tiles", { frame: 42 }),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],
        // mountain grass dirt
        "+": () => [
          K.sprite("tiles", { frame: 34 }),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],
        // grass
        "<": () => [
          K.sprite("tiles", { frame: 14 }),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],

        // road
        ">": () => [K.sprite("tiles", { frame: 7 }), "tiles"],

        // Tree
        a: () => [
          K.sprite("tiles", { frame: 1 }),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],
        b: () => [
          K.sprite("tiles", { frame: 2 }),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],
        c: () => [
          K.sprite("tiles", { frame: 9 }),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],
        d: () => [
          K.sprite("tiles", { frame: 10 }),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],
        f: () => [
          K.sprite("house"),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],
        g: () => [
          K.sprite("center"),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],
        // Player placement

        // Static Enemy placement
        e: (coords) => {
          coords.x = coords.x * 16;
          coords.y = coords.y * 16;
          this.staticEnemyCoords.push(coords);
          return [this.staticEnemyCoords];
        },
        // Pikachu
        p: () => [
          K.sprite("pika"),
          K.area(),
          K.body({ isStatic: true }),
          K.scale(1),
          "tiles",
        ],
      },
    });
    this.level = K.add([logPlayerPosition(this, this.player)]);
    this.renderStaticEnemies();
    this.startLevel();
  }

  startLevel() {
    this.enemyLoop = K.loop(4, () => new Enemy(this.player));
    this.homingEnemyLoop = K.loop(
      4,
      () => new HomingEnemy(this.player, "koffing", 0.75)
    );
  }

  renderStaticEnemies() {
    this.staticEnemyCoords.forEach(
      (coords) => new StaticEnemy(this.player, coords, staticObject)
    );
  }

  activateBoss() {
    this.bossActive = true;
    if (this.enemyLoop) {
      this.enemyLoop.cancel();
    }

    const boss = new Boss(this.player, this.homingEnemyLoop, bossObject);
  }
}
