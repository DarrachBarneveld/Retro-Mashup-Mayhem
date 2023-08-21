import K from "../kaboom";
import dinoSpriteTest from "../../assets/images/sprites/dino.png";
import bulletAudio from "../../assets/audio/effects/bullet.mp3";
import pikachuAudio from "../../assets/audio/effects/pikachu.mp3";
import lossLife from "../../assets/audio/effects/loss-life.mp3";
import gameOver from "../../assets/audio/effects/game-over.mp3";
import { delayTimer } from "../helpers/math";
const healthElement = document.getElementById("health");

K.loadSprite("dino", dinoSpriteTest, {
  sliceX: 24,
  sliceY: 1,
  anims: {
    idle: { from: 1, to: 9, loop: true },
    run: { from: 17, to: 23, loop: true },
  },
});

K.loadSound("shoot", bulletAudio);
K.loadSound("pikachu", pikachuAudio);
K.loadSound("loss-life", lossLife);
K.loadSound("game-over", gameOver);

export class Player {
  constructor(spriteName, position = 0, moveSpeed, scale) {
    this.sprite = K.add([
      K.sprite(spriteName, { animSpeed: 0.6, flipX: false }),
      K.pos(100, K.height() / 2),
      K.area(),
      K.scale(scale),
      K.body(),
      // logPlayerPosition(),
      "player",
    ]);
    this.running = false;
    this.position = position;
    this.moveSpeed = moveSpeed;
    this.sprite.play("idle");

    K.onKeyDown("left", () => this.moveLeft());
    K.onKeyDown("right", () => this.moveRight());
    K.onKeyDown("up", () => this.moveUp());
    K.onKeyDown("down", () => this.moveDown());
    K.onKeyPress("space", () => this.shoot());
    K.onKeyRelease("left", () => this.idle());
    K.onKeyRelease("right", () => this.idle());

    this.sprite.onCollide("wall", () => {
      this.sprite.destroy();
    });

    this.sprite.onUpdate(() => {
      K.camPos(this.sprite.pos.x, K.camPos().y);
    });

    this.sprite.onCollide("pika", () => {
      K.play("pikachu");
      console.log("Game win");
    });

    this.sprite.onCollide("mario", () => {
      K.play("mario");
      console.log("Game win");
    });

    this.health = 20;
    this.sprite.onCollide("enemy-bullet", () => this.takeDamage());
    this.sprite.onCollide("enemy", () => this.takeDamage());
  }

  takeDamage() {
    this.health--;
    const currentHeight = healthElement.clientHeight;
    healthElement.style.height = currentHeight - 50 + "px";

    if (this.health <= 5) {
      healthElement.style.backgroundColor = "red";
    }
    if (this.health <= 0) {
      this.death();
      return;
    }
    K.play("loss-life");
  }

  async death() {
    K.play("game-over");
    this.sprite.destroy();
    const explosion = K.add([K.sprite("explosion"), K.pos(this.sprite.pos)]);
    explosion.play("boom");
    await delayTimer(1000);
    const gameOverModal = document.getElementById("testmodal");
    gameOverModal.style.display = "flex";
    gameOverModal.style.opacity = 1;

    // window.location.href = "index.html";
  }

  moveUp() {
    if (!this.running) {
      this.sprite.play("run");
      this.running = true;
    }
    this.sprite.move(0, -this.moveSpeed);
  }

  moveDown() {
    if (!this.running) {
      this.sprite.play("run");
      this.running = true;
    }

    this.sprite.move(0, this.moveSpeed);
  }

  moveLeft() {
    if (!this.running) {
      this.sprite.play("run");
      this.running = true;
    }
    this.sprite.move(-this.moveSpeed, 0);
    this.sprite.flipX = true;
  }

  moveRight() {
    if (!this.running) {
      this.sprite.play("run");
      this.running = true;
    }
    this.sprite.flipX = false;
    this.sprite.move(this.moveSpeed, 0);
  }

  idle() {
    this.running = false;
    this.sprite.play("idle");
  }

  shoot() {
    const direction = this.sprite.flipX ? -10 : 10;
    K.play("shoot");

    const bullet = K.add([
      K.circle(4),
      K.pos(this.sprite.pos.x + 10, this.sprite.pos.y + 10),
      K.scale(0.5),
      K.body(),
      K.area(),
      K.offscreen({ destroy: true }),
      bulletMovement(direction, 0),
      "bullet",
    ]);

    // Destroys bullet after certain time, acts as range
    K.wait(0.75, () => bullet.destroy());
    bullet.damage = 50;

    bullet.onCollide("enemy", (enemy) => {
      bullet.destroy();
    });
    bullet.onCollide("tiles", (enemy) => {
      bullet.destroy();
    });
    bullet.onCollide("prize", () => {
      bullet.destroy();
    });
  }
}

export function bulletMovement(x, y) {
  return {
    add() {},
    update() {
      this.pos.x += x;
      this.pos.y += y;
    },
  };
}
