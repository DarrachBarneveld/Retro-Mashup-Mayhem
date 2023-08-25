import K from "../kaboom";
import {
  Boss,
  Enemy,
  HomingEnemy,
  HomingEnemyShoot,
  StaticEnemy,
} from "./Enemy";
import { Player } from "./Player";

export class Level {
  constructor(gameObject) {
    const background = document.getElementById("mycanvas");
    background.style.background = gameObject.background;
    K.loadSound("music", gameObject.music.main);
    this.music = K.play("music", { loop: true });
    this.bossActive = false;
    this.gameObject = gameObject;
    this.staticEnemyCoords = gameObject.constructLevel();
    this.homingEnemy = gameObject.homingEnemy;
    this.player = new Player(this, "dino", 0, 150, 1);
    this.homingEnemyShoot = gameObject.homingEnemyShoot;

    this.level = K.add([logPlayerPosition(this, this.player)]);
    this.renderStaticEnemies();
    this.gameOver = false;
    this.homingSpeed =
      gameObject.homingEnemy?.loopSpeed ||
      gameObject.homingEnemyShoot?.loopSpeed;

    this.startLevel();
  }

  isGameOver() {
    return this.gameOver;
  }

  startLevel() {
    this.timer = timerCountdown(120, this.player, this.isGameOver.bind(this));
    this.enemyLoop = K.loop(4, () => new Enemy(this.player));

    if (this.homingEnemyShoot) {
      this.homingEnemyLoop = K.loop(
        this.homingSpeed,
        () => new HomingEnemyShoot(this.player, this.homingEnemyShoot)
      );
    } else {
      this.homingEnemyLoop = K.loop(
        this.homingSpeed,
        () =>
          new HomingEnemy(
            this.player,
            this.homingEnemy.sprite,
            this.homingEnemy.scale
          )
      );
    }
  }

  renderStaticEnemies() {
    if (!this.staticEnemyCoords) return;
    this.staticEnemyCoords.forEach(
      (coords) =>
        new StaticEnemy(this.player, coords, this.gameObject.staticEnemy)
    );
  }

  activateBoss() {
    this.bossActive = true;
    if (this.enemyLoop) {
      this.enemyLoop.cancel();
    }

    new Boss(this);
  }
}

export function logPlayerPosition(level, player) {
  return {
    add() {},
    update() {
      if (player.sprite.pos.x > 1200 && !level.bossActive) {
        level.activateBoss();
      }
    },
  };
}

function timerCountdown(duration = 120, player, condition) {
  return new Promise((resolve) => {
    let remainingTime = duration;

    const intervalId = setInterval(() => {
      if (condition()) {
        clearInterval(intervalId);
        resolve("Condition fulfilled!");
      }

      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;

      const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
      document.getElementById("timer").textContent = formattedTime;

      remainingTime--;

      if (remainingTime < 0) {
        clearInterval(intervalId);
        player.death();
        resolve("Timer done");
      }
    }, 1000);
  });
}
