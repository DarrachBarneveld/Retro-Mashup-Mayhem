import K from "./kaboom";
import { Player } from "./classes/Player";
import { Enemy } from "./classes/Enemy";
import Level from "./classes/Level";
import { level1Layout, level1Objects } from "./levels/level1Data";

K.scene("demo", () => {
  const player = new Player("dino", 0, 150, 2);
  const levelInstance = new Level(level1Layout, level1Objects);
  levelInstance.loadLevel();

  K.onKeyDown("left", () => player.moveLeft());
  K.onKeyDown("right", () => player.moveRight());
  K.onKeyDown("up", () => player.moveUp());
  K.onKeyDown("down", () => player.moveDown());
  K.onKeyPress("space", () => player.shoot());
  K.onKeyRelease("left", () => player.idle());
  K.onKeyRelease("right", () => player.idle());

  K.loop(2, () => new Enemy({ top: K.height(), bottom: 0 }));

  addWallBounds();
});

K.go("demo");

function addWallBounds() {
  K.add([K.pos(0, K.height() - 2), K.rect(K.width(), 2), K.area(), "wall"]);
  K.add([K.pos(0, 2), K.rect(K.width(), 2), K.area(), "wall"]);
  K.add([K.pos(2, 0), K.rect(2, K.height()), K.area(), "wall"]);
}
