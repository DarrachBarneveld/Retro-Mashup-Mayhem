import K from "../kaboom";
import {
  BowserAudio,
  PacmanAudio,
  PokemonAudio,
  SpaceInvaderAudio,
} from "../audioImports";
import bowser from "../../assets/images/sprites/mario/bowser.png";
import mewtwo from "../../assets/images/sprites/pokemon/mewtwo.png";
import redghost from "../../assets/images/sprites/pacman/pacman-boss.png";
import spaceship from "../../assets/images/sprites/space-invaders/boss.png";
import ghosts from "../../assets/images/sprites/pacman/pac-man-ghosts-blue.png";
import bullet from "../../assets/images/sprites/mario/sm-flying-bullet.png";
import ghostDeath from "../../assets/audio/effects/pacman/ghost-dead.mp3";
import bowserShot from "../../assets/images/sprites/mario/sm-bowser-shot.png";
import koopashot from "../../assets/images/sprites/mario/koopa-bullet.png";
import koopa from "../../assets/images/sprites/mario/koopa.png";
import koffing from "../../assets/images/sprites/pokemon/koffing.png";
import invader from "../../assets/images/invader.png";

// Level2
import arbok from "../../assets/images/sprites/pokemon/arbok.png";
import arbokbullet from "../../assets/images/sprites/pokemon/pokemon-bullet.png";

import invaderBullet from "../../assets/images/sprites/space-invaders/space-bullet.png";

import { delayTimer, getRandomNumber } from "../helpers/math";
import { loadFromLocalStorage } from "../home";

// Bosses
K.loadSprite("bowser", bowser);
K.loadSprite("mewtwo", mewtwo);
K.loadSprite("redghost", redghost);
K.loadSprite("spaceship", spaceship);

//
K.loadSprite("invader", invader);
K.loadSprite("bullet", bullet);
K.loadSprite("koffing", koffing);
K.loadSprite("ghost", ghosts, { sliceX: 4, sliceY: 1 });
K.loadSprite("bowserbullet", bowserShot, {
  sliceX: 4,
  sliceY: 1,
  anims: { shot: { from: 0, to: 3, loop: true } },
});
K.loadSprite("koopabullet", koopashot, {
  sliceX: 6,
  sliceY: 1,
  anims: { shot: { from: 0, to: 5, loop: true } },
});
K.loadSprite("koopa", koopa, {
  sliceX: 6,
  sliceY: 1,
  anims: { idle: { from: 0, to: 5, loop: true } },
});
K.loadSprite("arbok", arbok, {
  sliceX: 2,
  sliceY: 1,
  anims: { idle: { from: 0, to: 1, loop: true } },
});
K.loadSprite("arbokbullet", arbokbullet, {
  sliceX: 2,
  sliceY: 1,
  anims: { shot: { from: 0, to: 1, loop: true } },
});
K.loadSprite("invaderbullet", invaderBullet, {
  sliceX: 2,
  sliceY: 1,
  anims: { shot: { from: 0, to: 1, loop: true } },
});

// Sounds
K.loadSound("ghost-dead", ghostDeath);
K.loadSound("bowserarrives", BowserAudio.arrives);
K.loadSound("bowserdies", BowserAudio.dies);
K.loadSound("bowsershoot", BowserAudio.shoot);
K.loadSound("bowserhurt", BowserAudio.hurt);
K.loadSound("koopashoot", BowserAudio.staticShooter);
K.loadSound("mariowin", BowserAudio.win);

// level2
K.loadSound("mewtwoarrives", PokemonAudio.arrives);
K.loadSound("mewtwodies", PokemonAudio.dies);
K.loadSound("mewtwoshoot", PokemonAudio.shoot);
K.loadSound("mewtwohurt", PokemonAudio.hurt);
K.loadSound("arbokdead", PokemonAudio.staticDie);
K.loadSound("arbokshoot", PokemonAudio.staticShooter);
K.loadSound("pokemonwin", PokemonAudio.win);

// level3
K.loadSound("redghostarrives", PacmanAudio.arrives);
K.loadSound("redghostdie", PacmanAudio.dies);
K.loadSound("redghostshoot", PacmanAudio.shoot);
K.loadSound("redghosthurt", PacmanAudio.hurt);
K.loadSound("pacstaticdead", PacmanAudio.staticDie);
K.loadSound("pacstaticshot", PacmanAudio.staticShooter);
K.loadSound("pacmanwin", PacmanAudio.win);

// level4
K.loadSound("spaceshiparrives", SpaceInvaderAudio.arrives);
K.loadSound("spaceshipdie", SpaceInvaderAudio.dies);
K.loadSound("spaceshipshoot", SpaceInvaderAudio.shoot);
K.loadSound("spaceshiphurt", SpaceInvaderAudio.hurt);
K.loadSound("pacstaticdead", SpaceInvaderAudio.staticDie);
K.loadSound("pacstaticshot", SpaceInvaderAudio.staticShooter);
K.loadSound("spaceshipwin", SpaceInvaderAudio.win);

export class Enemy {
  constructor(player) {
    this.sprite = K.add([
      K.sprite("invader"),
      K.pos(),
      K.area(),
      K.scale(0.5),
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
    this.speed = 0.5;

    this.sprite.add([enemyMovement(player, this)]);

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

export class StaticEnemy {
  constructor(player, coords, spriteObject) {
    console.log(spriteObject);
    this.sprite = K.add([
      K.sprite(spriteObject.sprite, { flipX: true }),
      K.pos(coords),
      K.area(),
      K.scale(1),
      K.body({ isStatic: true }),
      K.color(),
      "enemy",
    ]);
    this.health = 100;
    this.spriteObject = spriteObject;

    this.sprite.play("idle");
    this.player = player;
    this.sprite.onCollide("bullet", (bullet) => this.takeDamage(bullet.damage));

    this.sprite.add([playerWithinRange(player, this)]);

    this.fireLoop = undefined;
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 50) {
      this.sprite.color = { r: 255, g: 100, b: 100 };
    }

    if (this.health <= 0) {
      K.play(this.spriteObject.die);
      const explosion = K.add([K.sprite("explosion"), K.pos(this.sprite.pos)]);
      this.sprite.destroy();
      explosion.play("boom");
      if (this.fireLoop) {
        this.fireLoop.cancel();
      }
    }
  }

  shoot() {
    const playerPos = this.player.sprite.pos;
    const spritePos = this.sprite.pos;

    K.play(this.spriteObject.shot);
    const bullet = K.add([
      K.sprite(this.spriteObject.bullet),
      K.pos(this.sprite.pos.x, this.sprite.pos.y),
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

export class HomingEnemy {
  constructor(player, name = "invader", scale = 1) {
    this.sprite = K.add([
      K.sprite(name),
      K.pos(),
      K.area(),
      K.scale(scale),
      K.body(),
      K.color(),
      "enemy",
    ]);
    const value1 = K.height() - this.sprite.height - 10;
    const posY = getRandomNumber(value1, 10);
    const posX = player.sprite.pos.x + 175;
    this.sprite.pos.x = posX;
    this.sprite.pos.y = posY;

    this.health = 100;
    this.speed = 0.75;

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
  constructor(player, homingEnemyLoop, spriteObject) {
    this.sprite = K.add([
      K.sprite(spriteObject.sprite),
      K.pos(),
      K.area(),
      K.scale(0.5),
      K.body({ isStatic: true }),
      K.color(),
      "enemy",
    ]);
    K.play(spriteObject.arrives);
    const posY = K.height() / 2;
    const posX = player.sprite.pos.x + 150;
    this.sprite.pos.x = posX;
    this.sprite.pos.y = posY;

    this.spriteObject = spriteObject;
    this.health = 600;
    this.speed = 0.5;
    this.player = player;
    this.sprite.move();
    this.direction = -1;
    this.sprite.add([moveEnemyUpAndDown(this)]);

    console.log(spriteObject);
    this.gameLevel = spriteObject.gameLevel;
    this.homingEnemyLoop = homingEnemyLoop;
    this.fireLoop = K.loop(2, () => this.shoot());
    this.sprite.onCollide("bullet", (bullet) => this.takeDamage(bullet.damage));
  }

  async takeDamage(damage) {
    K.play(this.spriteObject.hurt);
    this.health -= damage;
    if (this.health <= 50) {
      this.sprite.color = { r: 255, g: 100, b: 100 };
    }
    if (this.health <= 0) {
      K.play(this.spriteObject.die);
      const explosion = K.add([K.sprite("explosion"), K.pos(this.sprite.pos)]);
      this.sprite.destroy();
      this.fireLoop.cancel();
      if (this.homingEnemyLoop) {
        this.homingEnemyLoop.cancel();
      }
      explosion.play("boom");

      await delayTimer(1000);
      K.play(this.spriteObject.win);
      const gameOverModal = document.getElementById("testmodal");
      const heading = document.getElementById("modal-heading");
      heading.textContent = "Victory";
      const image = document.getElementById("modal-img");
      image.style.display = "block";
      gameOverModal.style.display = "flex";
      gameOverModal.style.opacity = 1;
      const levels = loadFromLocalStorage("levels");
      console.log(this.gameLevel);
      levels.push(this.gameLevel);
      localStorage.setItem("levels", JSON.stringify(levels));
    }
  }

  shoot() {
    const playerPos = this.player.sprite.pos;
    const spritePos = this.sprite.pos;
    K.play(this.spriteObject.shot);
    const bullet = K.add([
      K.sprite(this.spriteObject.bullet),
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

function enemyMovement(player, enemy) {
  return {
    add() {},
    update() {
      const direction = findDirectionRelationship(player, enemy);
      // Accounts for sprite variance of movement

      enemy.sprite.move(-enemy.speed * 100, direction.y);
    },
  };
}

function findDirectionRelationship(player, enemy) {
  const enemyPosition = enemy.sprite.pos;
  const playerPosition = player.sprite.pos;
  const direction = K.vec2(
    playerPosition.x - enemyPosition.x,
    playerPosition.y - enemyPosition.y
  );

  return direction;
}
function addRandomRangeToNum(number) {
  const range = Math.floor(Math.random() * 201) - 100;

  // Add the range to the input number

  return number + range;
}

function moveEnemyTowardsPosition(player, enemy) {
  return {
    add() {},
    update() {
      const speed = enemy.speed;
      const direction = findDirectionRelationship(player, enemy);
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

function playerWithinRange(player, enemy) {
  return {
    add() {},
    update() {
      const distance = K.vec2(player.sprite.pos).sub(enemy.sprite.pos).len();
      if (distance < 150 && !enemy.playerInRange) {
        enemy.playerInRange = true;
        enemy.fireLoop = K.loop(2, () => enemy.shoot());
      }
      if (distance > 150 && enemy.fireLoop) {
        enemy.playerInRange = false;
        enemy.fireLoop.cancel();
      }
    },
  };
}
