import K from "./kaboom";
import { Player } from "./classes/Player";
import { Enemy, HomingEnemy } from "./classes/Enemy";
import { Level1, Level4 } from "./classes/Level";
import explosion from "../assets/images/sprites/explosion.png";
import { delayTimer } from "./helpers/math";
import { Level2 } from "./classes/Level2";
import { Level3 } from "./classes/Level3";

const replayBtn = document.getElementById("replay");

replayBtn.addEventListener("click", () => {
  location.reload();
});

// When pages loads change background url

const url = window.location.pathname.split(".");

K.loadSprite("explosion", explosion, {
  sliceX: 20,
  sliceY: 1,
  anims: {
    boom: { from: 1, to: 19, speed: 32 },
  },
});

console.log(url[0]);

K.scene("demo", async () => {
  if (url[0] == "/src/levels/game") {
    const level = new Level1();
  }
  if (url[0] == "/src/levels/game2") {
    const level = new Level2();
  }
  if (url[0] == "/src/levels/game3") {
    const level = new Level3();
  }
  if (url[0] == "/src/levels/game4") {
    const level = new Level4();
  }

  // console.log("run ani");
  // await delayTimer(3000);
  // const level = new Level3();
});

K.go("demo");

// function addWallBounds() {
//   K.add([K.pos(0, K.height() - 2), K.rect(K.width(), 2), K.area(), "wall"]);
//   K.add([K.pos(0, 2), K.rect(K.width(), 2), K.area(), "wall"]);
//   K.add([K.pos(2, 0), K.rect(2, K.height()), K.area(), "wall"]);
// }
