import K from "../kaboom";
import { level4 } from "../levels/layouts";
import { Boss } from "./Enemy";
import { Player } from "./Player";

import iceplanet from "../../assets/images/sprites/space-invaders/iceplanet.png";
import shattered_planet from "../../assets/images/sprites/space-invaders/shattered_planet.png";
import redplanet from "../../assets/images/sprites/space-invaders/redplanet.png";
import sphereplanet from "../../assets/images/sprites/space-invaders/sphereplanet.png";
import emptyspace from "../../assets/images/sprites/space-invaders/empty-space.png";
import asteroid from "../../assets/images/sprites/space-invaders/asteroid.png";

import music from "../../assets/audio/music/space-invaders-level-music.mp3";

import { logPlayerPosition } from "./Level";

const staticObject = {
  sprite: "arbok",
  die: "arbokdead",
  bullet: "arbokbullet",
  shot: "arbokshoot",
};

const bossObject = {
  sprite: "spaceship",
  die: "spaceshipdie",
  hurt: "spaceshiphurt",
  bullet: "invaderbullet",
  shot: "spaceshipshoot",
  arrives: "spaceshiparrives",
  win: "spaceshipwin",
};

export class Level4 {
  constructor() {
    K.loadSound("music", music);
    K.play("music", { loop: true });

    this.bossActive = false;
    K.loadSprite("iceplanet", iceplanet);
    K.loadSprite("redplanet", redplanet);
    K.loadSprite("shattered_planet", shattered_planet, {
      sliceX: 2,
      sliceY: 2,
    });
    K.loadSprite("sphereplanet", sphereplanet, { sliceX: 2, sliceY: 2 });
    K.loadSprite("emptyspace", emptyspace);
    K.loadSprite("asteroid", asteroid);

    K.addLevel(level4, {
      tileWidth: 16,
      tileHeight: 16,
      tiles: {
        // Iceplanet
        "+": () => [
          K.sprite("iceplanet"),
          K.area(),
          K.body({ isStatic: true }),
          "iceplanet",
        ],

        "*": () => {
          this.player = new Player("dino", 0, 150, 1);
          this.startLevel(this.player);
          return [this.player];
        },

        // Red planet
        "<": () => [
          K.sprite("redplanet"),
          K.area(),
          K.body({ isStatic: true }),
          "redplanet",
        ],

        // Empty space that will stop from going up and down
        "-": () => [
          K.sprite("emptyspace"),
          K.area(),
          K.body({ isStatic: true }),
          "emptyspace",
        ],

        // Asteroid
        "=": () => [
          K.sprite("asteroid"),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],

        //  Shattered_planet
        a: () => [
          K.sprite("shattered_planet", { frame: 0 }),
          "shattered_planet",
        ],
        b: () => [
          K.sprite("shattered_planet", { frame: 1 }),
          "shattered_planet",
        ],

        c: () => [
          K.sprite("shattered_planet", { frame: 2 }),
          "shattered_planet",
        ],
        d: () => [
          K.sprite("shattered_planet", { frame: 3 }),
          "shattered_planet",
        ],

        // sphereplanet
        e: () => [K.sprite("sphereplanet", { frame: 0 }), "sphereplanet"],
        f: () => [K.sprite("sphereplanet", { frame: 1 }), "sphereplanet"],

        g: () => [K.sprite("sphereplanet", { frame: 2 }), "sphereplanet"],
        h: () => [K.sprite("sphereplanet", { frame: 3 }), "sphereplanet"],
      },
    });
    this.level = K.add([logPlayerPosition(this, this.player)]);
  }

  startLevel() {
    // this.enemyLoop = K.loop(2, () => new Enemy(this.player));
    // this.homingEnemyLoop = K.loop(4, () => new HomingEnemy(this.player));
  }

  activateBoss() {
    this.bossActive = true;
    if (this.enemyLoop) {
      this.enemyLoop.cancel();
    }

    const boss = new Boss(this.player, this.homingEnemyLoop, bossObject);
  }
}
