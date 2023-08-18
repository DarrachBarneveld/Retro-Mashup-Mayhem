import K from "./kaboom";
import { Player } from "./classes/Player";
import { Enemy } from "./classes/Enemy";

K.scene("demo", () => {
  const player = new Player("dino", 0, 150, 2);
  const enemy = new Enemy();

  K.onKeyDown("left", () => player.moveLeft());
  K.onKeyDown("right", () => player.moveRight());
  K.onKeyDown("up", () => player.moveUp());
  K.onKeyDown("down", () => player.moveDown());
  K.onKeyPress("space", () => player.shoot());
  K.onKeyRelease("left", () => player.idle());
  K.onKeyRelease("right", () => player.idle());
});

K.go("demo");
