import K from "./kaboom";
import DinoSpriteTest from "../assets/images/sprites/dino.png";
import { Player } from "./classes/Player";

K.loadSprite("dino", DinoSpriteTest, {
  sliceX: 24,
  sliceY: 1,
  anims: {
    idle: { from: 1, to: 9, loop: true },
    run: { from: 17, to: 23, loop: true },
  },
});

K.scene("demo", () => {
  const player = new Player("dino", 0, 150, 2);
});

K.go("demo");

// BULLET UPDATE FRAME
