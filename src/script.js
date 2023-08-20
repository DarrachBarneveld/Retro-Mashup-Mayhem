import K from "./kaboom";
import { Player } from "./classes/Player";
import { Enemy, HomingEnemy } from "./classes/Enemy";
import { Level1 } from "./classes/Level";

// When pages loads change background url

K.scene("demo", () => {
  // const newBaseEnemy = K.loop(1, () => new Enemy(player));
  // const newHomingEnemy = K.loop(3, () => new HomingEnemy(player));
  const level = new Level1();
});

K.go("demo");

// function addWallBounds() {
//   K.add([K.pos(0, K.height() - 2), K.rect(K.width(), 2), K.area(), "wall"]);
//   K.add([K.pos(0, 2), K.rect(K.width(), 2), K.area(), "wall"]);
//   K.add([K.pos(2, 0), K.rect(2, K.height()), K.area(), "wall"]);
// }
