import K from "../kaboom";
import enemySprite from "../../assets/images/sprites/enemy.png";

K.loadSprite("enemy", enemySprite);

export class Enemy {
  constructor(spriteName, position, moveSpeed, scale) {
    this.sprite = K.add([
      K.sprite("enemy"),
      K.pos(300, 0),
      K.area(),
      K.scale(1),
      K.body(),
      enemyMovement(this),
      "enemy",
    ]);
  }
}

function enemyMovement() {
  return {
    add() {},
    update() {
      this.move(-100, 0);
    },
  };
}
