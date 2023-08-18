import K from "../kaboom";

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

    this.sprite.play("idle");

    K.onKeyPress("left", () => {
      this.sprite.play("run");
      this.sprite.flipX = true;
    });

    K.onKeyDown("left", () => {
      this.sprite.move(-moveSpeed, 0);
      this.sprite.flipX = true;
    });

    K.onKeyPress("right", () => {
      this.sprite.play("run");
      this.sprite.flipX = false;
    });

    K.onKeyDown("right", () => {
      this.sprite.flipX = false;
      this.sprite.move(moveSpeed, 0);
    });

    K.onKeyRelease("left", () => this.sprite.play("idle"));
    K.onKeyRelease("right", () => this.sprite.play("idle"));

    K.onKeyPress("space", () => {
      const direction = this.sprite.flipX ? -5 : 5;

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
