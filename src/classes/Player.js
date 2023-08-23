import K from "../kaboom";
import dinoSpriteTest from "../../assets/images/sprites/dino.png";
import bulletAudio from "../../assets/audio/effects/bullet.mp3";
import pikachuAudio from "../../assets/audio/effects/pikachu.mp3";
import lossLife from "../../assets/audio/effects/loss-life.mp3";
import gameOverSound from "../../assets/audio/effects/game-over.mp3";
import gameOverGif from "../../assets/images/gameoverfateofuniverse.gif";
import { delayTimer } from "../helpers/math";
const healthElement = document.getElementById("health");

K.loadSprite("dino", dinoSpriteTest, {
  sliceX: 24,
  sliceY: 1,
  anims: {
    idle: { from: 1, to: 9, loop: true },
    run: { from: 17, to: 23, loop: true },
    death: { from: 14, to: 16, loop: true },
  },
});

K.loadSound("shoot", bulletAudio);
K.loadSound("pikachu", pikachuAudio);
K.loadSound("loss-life", lossLife);
K.loadSound("game-over", gameOverSound);

export class Player {
  constructor(spriteName, position = 0, moveSpeed, scale) {
    this.sprite = K.add([
      K.sprite(spriteName, { animSpeed: 0.6, flipX: false }),
      K.pos(100, K.height() / 2),
      K.area(),
      K.scale(scale),
      K.body(),
      "player",
    ]);
    this.running = false;
    this.position = position;
    this.moveSpeed = moveSpeed;
    this.sprite.play("idle");
    this.sprite.direction = "right";

    K.onKeyDown("left", () => this.moveLeft());
    K.onKeyDown("right", () => this.moveRight());
    K.onKeyDown("up", () => this.moveUp());
    K.onKeyDown("down", () => this.moveDown());
    K.onKeyPress("space", () => this.shoot());
    K.onKeyRelease("left", () => this.idle());
    K.onKeyRelease("right", () => this.idle());
    K.onKeyRelease("down", () => this.idle());
    K.onKeyRelease("up", () => this.idle());

    this.sprite.onCollide("wall", () => {
      this.sprite.destroy();
    });

    this.sprite.onUpdate(() => {
      K.camPos(this.sprite.pos.x, K.camPos().y);
    });

    this.health = 6;
    // this.sprite.onCollide("enemy-bullet", () => this.takeDamage());
    this.sprite.onCollide("enemy", () => this.takeDamage());
  }

  takeDamage() {
    this.health--;
    const currentHeight = healthElement.clientHeight;
    healthElement.style.height = currentHeight - 50 + "px";

    if (this.health <= 3) {
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
    this.sprite.play("death");
    this.gameOver = true;
    await delayTimer(2000);
    const gameOverModal = document.getElementById("testmodal");
    gameOverModal.style.display = "flex";
    gameOverModal.style.opacity = 1;
    const image = document.getElementById("modal-img");
    image.src = gameOverGif;
  }

  moveUp() {
    if (this.gameOver) return;
    if (!this.running) {
      this.sprite.play("run");
      this.running = true;
    }
    this.sprite.move(0, -this.moveSpeed);
    this.sprite.direction = "up";
  }

  moveDown() {
    if (this.gameOver) return;

    if (!this.running) {
      this.sprite.play("run");
      this.running = true;
    }

    this.sprite.move(0, this.moveSpeed);
    this.sprite.direction = "down";
  }

  moveLeft() {
    if (this.gameOver) return;

    if (!this.running) {
      this.sprite.play("run");
      this.running = true;
    }
    this.sprite.move(-this.moveSpeed, 0);
    this.sprite.flipX = true;
    this.sprite.direction = "left";
  }

  moveRight() {
    if (this.gameOver) return;

    if (!this.running) {
      this.sprite.play("run");
      this.running = true;
    }
    this.sprite.flipX = false;
    this.sprite.move(this.moveSpeed, 0);
    this.sprite.direction = "right";
  }

  idle() {
    if (this.gameOver) return;

    this.running = false;
    this.sprite.play("idle");
  }

  shoot() {
    let direction;

    if (this.sprite.direction === "right") {
      direction = { x: 10, y: 0 };
    }
    if (this.sprite.direction === "left") {
      direction = { x: -10, y: 0 };
    }
    if (this.sprite.direction === "up") {
      direction = { x: 0, y: -10 };
    }
    if (this.sprite.direction === "down") {
      direction = { x: 0, y: 10 };
    }
    K.play("shoot");

    const bulletPositionY = this.sprite.direction === "down" ? 20 : 10;
    const bullet = K.add([
      K.circle(4),
      K.pos(this.sprite.pos.x + 10, this.sprite.pos.y + bulletPositionY),
      K.scale(0.5),
      K.body(),
      K.area(),
      K.offscreen({ destroy: true }),
      bulletMovement(direction),
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

export function bulletMovement(direction) {
  return {
    add() {},
    update() {
      this.pos.x += direction.x;
      this.pos.y += direction.y;
    },
  };
}
