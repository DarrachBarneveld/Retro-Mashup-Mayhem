import K from "./kaboom";
import { Player } from "./classes/Player";
import { Enemy } from "./classes/Enemy";
import { Level, Level2 } from "./classes/Level";

// When pages loads change background url

K.scene("demo", () => {
  const player = new Player("dino", 0, 150, 1);
  const level = new Level();
  // const enemy = new Enemy(player);
  // const level2 = new Level2();
  K.onKeyDown("left", () => player.moveLeft());
  K.onKeyDown("right", () => player.moveRight());
  K.onKeyDown("up", () => player.moveUp());
  K.onKeyDown("down", () => player.moveDown());
  K.onKeyPress("space", () => player.shoot());
  K.onKeyRelease("left", () => player.idle());
  K.onKeyRelease("right", () => player.idle());
  const newLocal = K.loop(1, () => new Enemy(player));
});

K.go("demo");

// function addWallBounds() {
//   K.add([K.pos(0, K.height() - 2), K.rect(K.width(), 2), K.area(), "wall"]);
//   K.add([K.pos(0, 2), K.rect(K.width(), 2), K.area(), "wall"]);
//   K.add([K.pos(2, 0), K.rect(2, K.height()), K.area(), "wall"]);
// }
