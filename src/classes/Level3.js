import K from "../kaboom";
import { Boss, Enemy, HomingEnemy } from "./Enemy";

// Sprite imports Level 3
import mazebrick from "../../assets/images/sprites/pacman/mazebrick.png";
import pacman from "../../assets/images/sprites/pacman/pacman.png";
import music from "../../assets/audio/music/pacman-level-music.mp3";

import { level3 } from "../levels/layouts";
import { Player } from "./Player";
import { logPlayerPosition } from "./Level";

const bossObject = {
  sprite: "redghost",
  die: "redghostdie",
  hurt: "redghosthurt",
  bullet: "arbokbullet",
  shot: "redghostshoot",
  arrives: "redghostarrives",
  win: "pacmanwin",
};

export class Level3 {
  constructor() {
    // Set background
    const background = document.getElementById("mycanvas");
    background.style.background = "black";

    K.loadSound("music", music);
    K.play("music", { loop: true });

    this.bossActive = false;
    K.loadSprite("mazebrick", mazebrick);
    K.loadSprite("pacman", pacman);

    K.addLevel(level3, {
      tileWidth: 16,
      tileHeight: 16,
      tiles: {
        // mazebrick
        "=": () => [
          K.sprite("mazebrick"),
          K.area(),
          K.body({ isStatic: true }),
          "mazebrick",
        ],

        p: () => [
          K.sprite("pacman"),
          K.area(),
          K.body({ isStatic: true }),
          "mazebrick",
        ],

        "*": () => {
          this.player = new Player("dino", 0, 150, 1);
          this.startLevel(this.player);
          return [this.player];
        },
      },
    });
    this.level = K.add([logPlayerPosition(this, this.player)]);
  }

  startLevel() {
    this.enemyLoop = K.loop(4, () => new Enemy(this.player));
    this.homingEnemyLoop = K.loop(
      1,
      () => new HomingEnemy(this.player, "ghost", 2)
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
