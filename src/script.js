import K from "./kaboom";
import { Level1 } from "./classes/Level";
import explosion from "../assets/images/sprites/explosion.png";
import { Level2 } from "./classes/Level2";
import { Level3 } from "./classes/Level3";
import { Level4 } from "./classes/Level4";
import { Player } from "./classes/Player";
import { level1Config } from "./levels/levelConfig";

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

K.scene("demo", async () => {
  // FOR TESTING
  // const player = new Player("dino", 0, 150, 1);
  // const level = new Level1(player);
  // timerCountdown(120, player);

  if (url[0] == "/src/levels/game") {
    const level = new Level1(level1Config);
  }
  if (url[0] == "/src/levels/game2") {
    const player = new Player("dino", 0, 150, 1);
    const level = new Level2(player);
    timerCountdown(120, player);
  }
  if (url[0] == "/src/levels/game3") {
    const player = new Player("dino", 0, 150, 1);
    const level = new Level3(player);
    timerCountdown(120, player);
  }
  if (url[0] == "/src/levels/game4") {
    const player = new Player("dino", 0, 150, 1);
    const level = new Level4(player);
    timerCountdown(120, player);
  }
});

K.go("demo");
