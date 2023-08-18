import K from "./kaboom";
import { Player } from "./classes/Player";
import { Enemy } from "./classes/Enemy";
import Level from "./classes/Level";
import { level1Layout, level1Objects } from "./levels/level1Data";
import marioTileset from "../assets/images/tileset/mario_tileset.png";

K.scene("demo", () => {
  const player = new Player("dino", 0, 150, 1);
  level1();
  K.onKeyDown("left", () => player.moveLeft());
  K.onKeyDown("right", () => player.moveRight());
  K.onKeyDown("up", () => player.moveUp());
  K.onKeyDown("down", () => player.moveDown());
  K.onKeyPress("space", () => player.shoot());
  K.onKeyRelease("left", () => player.idle());
  K.onKeyRelease("right", () => player.idle());

  K.loop(2, () => new Enemy({ top: K.height(), bottom: 0 }));
});

const test = [
  "                           ",
  "                           ",
  "                           ",
  "                           ",
  "                           ",
  "                           ",
  "                           ",
  "                           ",
  "                           ",
  "                           ",
  "                    =      ",
  "        ====         =     ",
  "                      =    ",
  "       ^^      =      =    ",
  "===========================",
];

function level1() {
  K.loadSprite("tiles", marioTileset, { sliceX: 8, sliceY: 8 });
  K.addLevel(test, {
    tileWidth: 16,
    tileHeight: 16,
    tiles: {
      "=": () => [
        K.sprite("tiles", { frame: 2 }),
        K.area(),
        K.body({ isStatic: true }),
        "tiles",
      ],
      "^": () => [
        K.sprite("tiles", { frame: 4 }),
        area(),
        K.body({ isStatic: true }),
        "tiles",
      ],
    },
  });
}

K.go("demo");

// function addWallBounds() {
//   K.add([K.pos(0, K.height() - 2), K.rect(K.width(), 2), K.area(), "wall"]);
//   K.add([K.pos(0, 2), K.rect(K.width(), 2), K.area(), "wall"]);
//   K.add([K.pos(2, 0), K.rect(2, K.height()), K.area(), "wall"]);
// }
