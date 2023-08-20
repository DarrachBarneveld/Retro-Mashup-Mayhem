import K from "../kaboom";
import { BowserAudio } from "../audioImports";
import bowser from "../../assets/images/sprites/mario/bowser.png";
import ghosts from "../../assets/images/sprites/pac-man-ghosts-blue.png";
import bullet from "../../assets/images/sprites/mario/sm-flying-bullet.png";
import ghostDeath from "../../assets/audio/effects/pacman/ghost-dead.mp3";
import explosion from "../../assets/images/sprites/explosion.png";
import bowserShot from "../../assets/images/sprites/mario/sm-bowser-shot.png";
import { getRandomNumber } from "../helpers/math";

K.loadSprite("enemy", bowser);
K.loadSprite("invader", bullet);
K.loadSprite("ghost", ghosts, { sliceX: 4, sliceY: 1 });
K.loadSprite("bowserbullet", bowserShot, {
  sliceX: 4,
  sliceY: 1,
  anims: { shot: { from: 1, to: 3, loop: true } },
});
K.loadSprite("explosion", explosion, {
  sliceX: 20,
  sliceY: 1,
  anims: {
    boom: { from: 1, to: 19, speed: 32 },
  },
});
K.loadSound("ghost-dead", ghostDeath);
K.loadSound("bowserarrives", BowserAudio.arrives);
K.loadSound("bowserdies", BowserAudio.dies);
K.loadSound("bowsershoot", BowserAudio.shoot);
K.loadSound("bowserhurt", BowserAudio.hurt);

export class Enemy {
  constructor(player) {
    this.sprite = K.add([
      K.sprite("ghost", { frame: 1 }),
      K.pos(),
      K.area(),
      K.scale(1),
      K.body(),
      K.color(),
      "enemy",
    ]);
    const value1 = K.height() - this.sprite.height - 10;
    const posY = getRandomNumber(value1, 10);
    const posX = player.sprite.pos.x + 300;
    this.sprite.pos.x = posX;
    this.sprite.pos.y = posY;

    this.health = 200;
    this.speed = 0.25;

    this.sprite.add([enemyMovement(this)]);

    this.sprite.move();

    this.sprite.onCollide("bullet", (bullet) => this.takeDamage(bullet.damage));
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 50) {
      this.sprite.color = { r: 255, g: 100, b: 100 };
    }

    if (this.health <= 0) {
      K.play("ghost-dead");
      const explosion = K.add([K.sprite("explosion"), K.pos(this.sprite.pos)]);
      this.sprite.destroy();
      explosion.play("boom");
    }
  }
}

export class HomingEnemy {
  constructor(player) {
    this.sprite = K.add([
      K.sprite("invader"),
      K.pos(),
      K.area(),
      K.scale(1),
      K.body(),
      K.color(),
      "enemy",
    ]);
    const value1 = K.height() - this.sprite.height - 10;
    const posY = getRandomNumber(value1, 10);
    const posX = player.sprite.pos.x + 300;
    this.sprite.pos.x = posX;
    this.sprite.pos.y = posY;

    this.health = 100;
    this.speed = 1;

    this.sprite.add([moveEnemyTowardsPosition(player, this)]);

    this.sprite.move();

    this.sprite.onCollide("bullet", (bullet) => this.takeDamage(bullet.damage));
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 50) {
      this.sprite.color = { r: 255, g: 100, b: 100 };
    }

    if (this.health <= 0) {
      K.play("ghost-dead");
      const explosion = K.add([K.sprite("explosion"), K.pos(this.sprite.pos)]);
      this.sprite.destroy();
      explosion.play("boom");
    }
  }
}

export class Boss {
  constructor(player, homingEnemyLoop) {
    this.sprite = K.add([
      K.sprite("enemy"),
      K.pos(),
      K.area(),
      K.scale(0.5),
      K.body({ isStatic: true }),
      K.color(),
      "enemy",
    ]);
    K.play("bowserarrives");
    const posY = K.height() / 2;
    const posX = player.sprite.pos.x + 200;
    this.sprite.pos.x = posX;
    this.sprite.pos.y = posY;

    this.health = 600;
    this.speed = 0.5;
    this.player = player;
    this.sprite.move();
    this.direction = -1;
    this.sprite.add([moveEnemyUpAndDown(this)]);

    this.homingEnemyLoop = homingEnemyLoop;
    this.fireLoop = K.loop(2, () => this.shoot());
    this.sprite.onCollide("bullet", (bullet) => this.takeDamage(bullet.damage));
  }

  takeDamage(damage) {
    K.play("bowserhurt");
    this.health -= damage;
    if (this.health <= 50) {
      this.sprite.color = { r: 255, g: 100, b: 100 };
    }
    if (this.health <= 0) {
      K.play("bowserdies");
      const explosion = K.add([K.sprite("explosion"), K.pos(this.sprite.pos)]);
      this.sprite.destroy();
      this.fireLoop.cancel();
      if (this.homingEnemyLoop) {
        this.homingEnemyLoop.cancel();
      }
      explosion.play("boom");
    }
  }

  shoot() {
    const playerPos = this.player.sprite.pos;
    const spritePos = this.sprite.pos;
    K.play("bowsershoot");
    const bullet = K.add([
      K.sprite("bowserbullet"),
      K.pos(this.sprite.pos.x + 10, this.sprite.pos.y + 10),
      K.scale(0.5),
      K.body(),
      K.area(),
      K.offscreen({ destroy: true }),
      "enemy-bullet",
    ]);

    bullet.play("shot");
    const angleRadians = Math.atan2(
      playerPos.y - spritePos.y,
      playerPos.x - spritePos.x
    );

    const velocityX = 5 * Math.cos(angleRadians);
    const velocityY = 5 * Math.sin(angleRadians);

    bullet.add([bulletMovement(bullet, velocityX, velocityY)]);

    bullet.onCollide("player", () => {
      bullet.destroy();
    });
    bullet.onCollide("tiles", () => {
      bullet.destroy();
    });
  }
}

function enemyMovement(enemy) {
  return {
    add() {},
    update() {
      enemy.sprite.move(-enemy.speed * 100, 0);
    },
  };
}

function moveEnemyTowardsPosition(player, enemy) {
  return {
    add() {},
    update() {
      const enemyPosition = enemy.sprite.pos;
      const speed = enemy.speed;
      const playerPosition = player.sprite.pos;
      const direction = K.vec2(
        playerPosition.x - enemyPosition.x,
        playerPosition.y - enemyPosition.y
      );

      enemy.sprite.move(direction.scale(speed));
    },
  };
}

function moveEnemyUpAndDown(enemy) {
  return {
    add() {},
    update() {
      if (enemy.sprite.pos.y < 50) {
        enemy.direction = 1;
      }
      if (enemy.sprite.pos.y > 200) {
        enemy.direction = -1;
      }
      enemy.sprite.move(0, enemy.speed * 50 * enemy.direction);
    },
  };
}

export function bulletMovement(bullet, x, y) {
  return {
    add() {},
    update() {
      bullet.pos.x += x;
      bullet.pos.y += y;
    },
  };
}
