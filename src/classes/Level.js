import K from "../kaboom";
import marioTileset from "../../assets/images/tileset/mario_tileset.png";
import { testLevel } from "../levels/level1Data";

export class Level {
  constructor() {
    K.loadSprite("tiles", marioTileset, { sliceX: 8, sliceY: 8 });
    K.addLevel(testLevel, {
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
}
