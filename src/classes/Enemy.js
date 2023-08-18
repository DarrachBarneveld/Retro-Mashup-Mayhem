import K from "../kaboom";
import enemySprite from "../../assets/images/sprites/enemy.png";
import { getRandomNumber } from "../helpers/math";

K.loadSprite("enemy", enemySprite);

export class Enemy {
  constructor(position, spriteName, moveSpeed, scale) {
    this.sprite = K.add([
      K.sprite("enemy"),
      K.pos(),
      K.area(),
      K.scale(1),
      K.body(),
      K.color(),
      enemyMovement(this),
      "enemy",
    ]);

    const value1 = K.height() - this.sprite.height - 10;

    const posY = getRandomNumber(value1, 10);

    const posX = K.width() + 10;

    this.sprite.pos.x = posX;
    this.sprite.pos.y = posY;

    this.health = 100;

    this.sprite.onCollide("bullet", (bullet) => this.takeDamage(bullet.damage));
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 50) {
      this.sprite.color = { r: 255, g: 0, b: 0 };
    }

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
