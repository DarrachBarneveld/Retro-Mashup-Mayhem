import K from "../kaboom";
import { Boss, Enemy, HomingEnemy } from "./Enemy";

// Sprite imports Level 3
import mazebrick from "../../assets/images/sprites/pacman/mazebrick.png";

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

    this.bossActive = false;
    K.loadSprite("mazebrick", mazebrick);

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
      2,
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
