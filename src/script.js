import K from "./kaboom";
import { Player } from "./classes/Player";
import { Enemy, HomingEnemy } from "./classes/Enemy";
import { Level1, Level3, Level4 } from "./classes/Level";
import explosion from "../assets/images/sprites/explosion.png";
import { delayTimer } from "./helpers/math";

// When pages loads change background url

K.loadSprite("explosion", explosion, {
  sliceX: 20,
  sliceY: 1,
  anims: {
    boom: { from: 1, to: 19, speed: 32 },
  },
});

K.scene("demo", async () => {
  // console.log("run ani");
  // await delayTimer(3000);
  const level = new Level3();
});

K.go("demo");

// function addWallBounds() {
//   K.add([K.pos(0, K.height() - 2), K.rect(K.width(), 2), K.area(), "wall"]);
//   K.add([K.pos(0, 2), K.rect(K.width(), 2), K.area(), "wall"]);
//   K.add([K.pos(2, 0), K.rect(2, K.height()), K.area(), "wall"]);
// }
