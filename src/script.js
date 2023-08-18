import K from "./kaboom";
import { Player } from "./classes/Player";

K.scene("demo", () => {
  const player = new Player("dino", 0, 150, 2);
});

K.go("demo");

// BULLET UPDATE FRAME
