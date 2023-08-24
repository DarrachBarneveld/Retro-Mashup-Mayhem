import K from "../kaboom";
import { level1, level2, level3, level4 } from "./layouts";
import {
  level1Config,
  level2Config,
  level3Config,
  level4Config,
} from "./levelConfig";

export function constructLevel1() {
  const { tileset, mario, princess, cloud, pipe, castle, hill } =
    level1Config.sprites;
  const staticEnemyCoords = [];
  K.loadSprite("tiles", tileset, { sliceX: 8, sliceY: 8 });
  K.loadSprite("mario", mario, { sliceX: 1, sliceY: 2 });
  K.loadSprite("princess", princess, { sliceX: 1, sliceY: 2 });
  K.loadSprite("cloud", cloud);
  K.loadSprite("pipe", pipe, { sliceX: 1, sliceY: 2 });
  K.loadSprite("castle", castle, { sliceX: 4, sliceY: 4 });
  K.loadSprite("hill", hill, { sliceX: 4, sliceY: 2 });
  K.addLevel(level1, {
    tileWidth: 16,
    tileHeight: 16,
    tiles: {
      // Ground tile
      "=": () => [
        K.sprite("tiles", { frame: 2 }),
        K.area(),
        K.body({ isStatic: true }),
        "tiles",
      ],
      // Aerial block
      "+": () => [
        K.sprite("tiles", { frame: 3 }),
        K.area(),
        K.body({ isStatic: true }),
        "tiles",
      ],
      // Player placement

      // Static Enemy placement
      e: (coords) => {
        coords.x = coords.x * 16;
        coords.y = coords.y * 16;
        staticEnemyCoords.push(coords);
        return [staticEnemyCoords];
      },

      // Small bush
      a: () => [K.sprite("tiles", { frame: 48 }), "tiles"],
      b: () => [K.sprite("tiles", { frame: 49 }), "tiles"],
      c: () => [K.sprite("tiles", { frame: 50 }), "tiles"],

      // Clouds - to add the whole cloud you need to put out ^^ in the layout
      "^": () => [K.sprite("cloud"), "cloud"],

      // Super Mario
      // "^": () => [K.sprite("cloud"), "cloud"],
      "<": () => [
        K.sprite("mario", { frame: 0 }), // top half
        K.scale(1),
        K.area(),
        K.body({ isStatic: true }),
        "mario",
      ],
      ">": () => [
        K.sprite("mario", { frame: 1 }), // bottom half
        K.scale(1),
        K.area(),
        K.body({ isStatic: true }),
        "mario",
      ],

      // Princess
      // "^": () => [K.sprite("cloud"), "cloud"],
      ":": () => [
        K.sprite("princess", { frame: 0 }), // top half
        K.scale(1),
        K.area(),
        K.body({ isStatic: true }),
        "princess",
      ],
      "|": () => [
        K.sprite("princess", { frame: 1 }), // bottom half
        K.scale(1),
        K.area(),
        K.body({ isStatic: true }),
        "princess",
      ],

      // Pipe
      x: () => [
        K.sprite("pipe", { frame: 0 }), // top half
        K.area(),
        K.body({ isStatic: true }),
        "pipe",
      ],
      y: () => [
        K.sprite("pipe", { frame: 1 }), // bottom half
        K.area(),
        K.body({ isStatic: true }),
        "pipe",
      ],

      // Castle
      A: () => [K.sprite("castle", { frame: 0 })], // Top-left corner
      B: () => [K.sprite("castle", { frame: 1 })], // Top-second from left
      C: () => [K.sprite("castle", { frame: 2 })], // Top-third from left
      D: () => [K.sprite("castle", { frame: 3 })], // Top-right corner

      E: () => [K.sprite("castle", { frame: 4 })], // Second row - left
      F: () => [K.sprite("castle", { frame: 5 })], // Second row - second from left
      G: () => [K.sprite("castle", { frame: 6 })], // Second row - third from left
      H: () => [K.sprite("castle", { frame: 7 })], // Second row - right

      I: () => [K.sprite("castle", { frame: 8 })], // Third row - left
      J: () => [K.sprite("castle", { frame: 9 })], // Third row - second from left
      K: () => [K.sprite("castle", { frame: 10 })], // Third row - third from left
      L: () => [K.sprite("castle", { frame: 11 })], // Third row - right

      M: () => [K.sprite("castle", { frame: 12 })], // Bottom row - left
      N: () => [K.sprite("castle", { frame: 13 })], // Bottom row - second from left
      O: () => [K.sprite("castle", { frame: 14 })], // Bottom row - third from left
      P: () => [K.sprite("castle", { frame: 15 })], // Bottom row - right

      // Hill
      Q: () => [K.sprite("hill", { frame: 0 })], // Top-left corner
      R: () => [K.sprite("hill", { frame: 1 })], // Top-second from left
      S: () => [K.sprite("hill", { frame: 2 })], // Top-third from left
      T: () => [K.sprite("hill", { frame: 3 })], // Top-right corner

      U: () => [K.sprite("hill", { frame: 4 })], // Bottom row - left
      V: () => [K.sprite("hill", { frame: 5 })], // Bottom row - second from left
      W: () => [K.sprite("hill", { frame: 6 })], // Bottom row - third from left
      X: () => [K.sprite("hill", { frame: 7 })], // Bottom row - right
    },
  });

  return staticEnemyCoords;
}

export function constructLevel2() {
  const { tileset, house, center, pika } = level2Config.sprites;
  const staticEnemyCoords = [];

  K.loadSprite("tiles", tileset, { sliceX: 8, sliceY: 8 });
  K.loadSprite("house", house);
  K.loadSprite("center", center);
  K.loadSprite("pika", pika, {
    sliceX: 3,
    sliceY: 1,
    anims: { idle: { from: 1, to: 3 } },
  });

  K.addLevel(level2, {
    tileWidth: 16,
    tileHeight: 16,
    tiles: {
      // Ground tile
      "=": () => [
        K.sprite("tiles", { frame: 42 }),
        K.area(),
        K.body({ isStatic: true }),
        "tiles",
      ],
      // mountain grass dirt
      "+": () => [
        K.sprite("tiles", { frame: 34 }),
        K.area(),
        K.body({ isStatic: true }),
        "tiles",
      ],
      // grass
      "<": () => [
        K.sprite("tiles", { frame: 14 }),
        K.area(),
        K.body({ isStatic: true }),
        "tiles",
      ],

      // road
      ">": () => [K.sprite("tiles", { frame: 7 }), "tiles"],

      // Tree
      a: () => [
        K.sprite("tiles", { frame: 1 }),
        K.area(),
        K.body({ isStatic: true }),
        "tiles",
      ],
      b: () => [
        K.sprite("tiles", { frame: 2 }),
        K.area(),
        K.body({ isStatic: true }),
        "tiles",
      ],
      c: () => [
        K.sprite("tiles", { frame: 9 }),
        K.area(),
        K.body({ isStatic: true }),
        "tiles",
      ],
      d: () => [
        K.sprite("tiles", { frame: 10 }),
        K.area(),
        K.body({ isStatic: true }),
        "tiles",
      ],
      f: () => [
        K.sprite("house"),
        K.area(),
        K.body({ isStatic: true }),
        "tiles",
      ],
      g: () => [
        K.sprite("center"),
        K.area(),
        K.body({ isStatic: true }),
        "tiles",
      ],
      // Player placement

      // Static Enemy placement
      e: (coords) => {
        coords.x = coords.x * 16;
        coords.y = coords.y * 16;
        staticEnemyCoords.push(coords);
        return [staticEnemyCoords];
      },
      // Pikachu
      p: () => [
        K.sprite("pika"),
        K.area(),
        K.body({ isStatic: true }),
        K.scale(1),
        "tiles",
      ],
    },
  });
  return staticEnemyCoords;
}

export function constructLevel3() {
  const { mazebrick, pacman } = level3Config.sprites;

  K.loadSprite("mazebrick", mazebrick);
  K.loadSprite("pacman", pacman);

  K.addLevel(level3, {
    tileWidth: 16,
    tileHeight: 16,
    tiles: {
      // mazebrick
      "=": () => [
        K.sprite("mazebrick"),
        K.area(),
        K.body({ isStatic: true }),
        "mazebrick",
      ],

      p: () => [
        K.sprite("pacman"),
        K.area(),
        K.body({ isStatic: true }),
        "mazebrick",
      ],
    },
  });

  return null;
}

export function constructLevel4() {
  const { iceplanet, redplanet, shattered_planet, sphereplanet, asteroid } =
    level4Config.sprites;

  K.loadSprite("iceplanet", iceplanet);
  K.loadSprite("redplanet", redplanet);
  K.loadSprite("shattered_planet", shattered_planet, {
    sliceX: 2,
    sliceY: 2,
  });
  K.loadSprite("sphereplanet", sphereplanet, { sliceX: 2, sliceY: 2 });
  K.loadSprite("asteroid", asteroid);

  K.addLevel(level4, {
    tileWidth: 16,
    tileHeight: 16,
    tiles: {
      // Iceplanet
      "+": () => [
        K.sprite("iceplanet"),
        K.area(),
        K.body({ isStatic: true }),
        "iceplanet",
      ],

      // Red planet
      "<": () => [
        K.sprite("redplanet"),
        K.area(),
        K.body({ isStatic: true }),
        "redplanet",
      ],
      // Asteroid
      "=": () => [
        K.sprite("asteroid"),
        K.area(),
        K.body({ isStatic: true }),
        "tiles",
      ],

      //  Shattered_planet
      a: () => [
        K.sprite("shattered_planet", { frame: 0 }),
        "shattered_planet",
        K.area(),
        K.body({ isStatic: true }),
      ],
      b: () => [
        K.sprite("shattered_planet", { frame: 1 }),
        "shattered_planet",
        K.area(),
        K.body({ isStatic: true }),
      ],

      c: () => [
        K.sprite("shattered_planet", { frame: 2 }),
        "shattered_planet",
        K.area(),
        K.body({ isStatic: true }),
      ],
      d: () => [
        K.sprite("shattered_planet", { frame: 3 }),
        "shattered_planet",
        K.area(),
        K.body({ isStatic: true }),
      ],

      // sphereplanet
      e: () => [
        K.sprite("sphereplanet", { frame: 0 }),
        K.area(),
        K.body({ isStatic: true }),
        "sphereplanet",
      ],
      f: () => [
        K.sprite("sphereplanet", { frame: 1 }),
        K.area(),
        K.body({ isStatic: true }),
        "sphereplanet",
      ],

      g: () => [
        K.sprite("sphereplanet", { frame: 2 }),
        K.area(),
        K.body({ isStatic: true }),
        "sphereplanet",
      ],
      h: () => [
        K.sprite("sphereplanet", { frame: 3 }),
        K.area(),
        K.body({ isStatic: true }),
        "sphereplanet",
      ],
    },
  });

  return null;
}
