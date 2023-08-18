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
  constructor(spriteName, position, moveSpeed, scale) {
    this.sprite = K.add([
      K.sprite("dino", { animSpeed: 0.6, flipX: false }), // Use the provided sprite name
      K.pos(0, 0),
      K.area(),
      K.scale(scale), // Use the provided scale
      K.body(),
      "walking",
    ]);
    this.running = false;

    this.sprite.play("idle");

    K.onKeyDown("left", () => {
      if (!this.running) {
        this.sprite.play("run");
        this.running = true;
      }
      this.sprite.move(-moveSpeed, 0);
      this.sprite.flipX = true;
    });

    K.onKeyDown("right", () => {
      if (!this.running) {
        this.sprite.play("run");
        this.running = true;
      }
      this.sprite.flipX = false;
      this.sprite.move(moveSpeed, 0);
    });

    K.onKeyRelease("left", () => {
      this.running = false;
      this.sprite.play("idle");
    });
    K.onKeyRelease("right", () => {
      this.running = false;
      this.sprite.play("idle");
    });

    K.onKeyPress("space", () => {
      const direction = this.sprite.flipX ? -5 : 5;
      K.play("shoot");

      K.add([
        K.sprite("dino"),
        K.pos(this.sprite.pos.x + 40, this.sprite.pos.y + 15),
        K.scale(1),
        bulletMovement(direction, 0),
      ]);
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
