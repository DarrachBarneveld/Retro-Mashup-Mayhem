import K from "../kaboom";
import enemySprite from "../../assets/images/sprites/enemy.png";
import { getRandomNumber } from "../helpers/math";

K.loadSprite("enemy", enemySprite);

export class Enemy {
  constructor(position, spriteName, moveSpeed, scale) {
    const posX = getRandomNumber(
      position.top - K.height("enemy"),
      position.bottom + K.height("enemy")
    );
    this.health = 100;
    this.sprite = K.add([
      K.sprite("enemy"),
      K.pos(500, posX),
      K.area(),
      K.scale(1),
      K.body(),
      enemyMovement(this),
      "enemy",
    ]);

    this.sprite.onCollide("bullet", (bullet) => this.takeDamage(bullet.damage));
  }

  takeDamage(damage) {
    this.health -= damage;

    if (this.health <= 0) {
      this.sprite.destroy();
    }
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
