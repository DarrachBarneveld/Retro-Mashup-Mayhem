import K from "./kaboom";
import { Level } from "./classes/Level";
import explosion from "../assets/images/sprites/explosion.png";
import {
  level1Config,
  level2Config,
  level3Config,
  level4Config,
} from "./config/level";

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
  if (url[0] == "/src/levels/game") {
    const level = new Level(level1Config);
  }
  if (url[0] == "/src/levels/game2") {
    const level = new Level(level2Config);
  }
  if (url[0] == "/src/levels/game3") {
    const level = new Level(level3Config);
  }
  if (url[0] == "/src/levels/game4") {
    const level = new Level(level4Config);
  }
});

K.go("demo");
