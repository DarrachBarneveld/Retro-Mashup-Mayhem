import K from "../kaboom";
import dinoSpriteTest from "../../assets/images/sprites/dino.png";
import bulletAudio from "../../assets/audio/effects/bullet.mp3";

K.loadSprite("dino", dinoSpriteTest, {
  sliceX: 24,
  sliceY: 1,
  anims: {
    idle: { from: 1, to: 9, loop: true },
    run: { from: 17, to: 23, loop: true },
  },
});

K.loadSound("shoot", bulletAudio);

export class Player {
  constructor(spriteName, position = 0, moveSpeed, scale) {
    this.sprite = K.add([
      K.sprite(spriteName, { animSpeed: 0.6, flipX: false }),
      K.pos(175, K.height() / 2),
      K.area(),
      K.scale(scale),
      K.body(),
    ]);
    this.running = false;
    this.position = position;
    this.moveSpeed = moveSpeed;
    this.sprite.play("idle");

    this.sprite.onCollide("wall", () => {
      this.sprite.destroy();
    });

    this.sprite.onUpdate(() => {
      K.camPos(this.sprite.pos);
    });
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
      K.sprite("dino"),
      K.pos(this.sprite.pos.x + 10, this.sprite.pos.y + 5),
      K.scale(0.5),
      K.body(),
      K.area(),
      bulletMovement(direction, 0),
      "bullet",
    ]);

    bullet.damage = 50;

    bullet.onCollide("enemy", (enemy) => {
      bullet.destroy();
    });
    bullet.onCollide("tiles", (enemy) => {
      bullet.destroy();
    });
  }
}

function bulletMovement(x, y) {
  return {
    add() {},
    update() {
      this.pos.x += x;
      this.pos.y += y;
    },
  };
}
