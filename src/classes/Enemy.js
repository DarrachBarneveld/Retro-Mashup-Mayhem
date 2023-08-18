import K from "../kaboom";
import enemySprite from "../../assets/images/sprites/enemy.png";
import ghosts from "../../assets/images/sprites/pac-man-ghosts-blue.png";
import { getRandomNumber } from "../helpers/math";

K.loadSprite("enemy", enemySprite);
K.loadSprite("ghost", ghosts, { sliceX: 4, sliceY: 1 });

export class Enemy {
  constructor(player) {
    this.sprite = K.add([
      K.sprite("ghost", { frame: 1 }),
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

    const posX = player.sprite.pos.x + 300;

    this.sprite.pos.x = posX;
    this.sprite.pos.y = posY;

    this.health = 100;

    this.sprite.onCollide("bullet", (bullet) => this.takeDamage(bullet.damage));
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 50) {
      this.sprite.color = { r: 255, g: 100, b: 100 };
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
