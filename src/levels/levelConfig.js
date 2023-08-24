// MARIO IMPORTS
import marioMusic from "../../assets/audio/music/mario-level-music.mp3";
import marioTileset from "../../assets/images/tileset/mario_tileset.png";
import mario from "../../assets/images/sprites/mario/sm-mario-one.png";
import princess from "../../assets/images/sprites/mario/sm-princess.png";
import cloud from "../../assets/images/sprites/mario/sm-cloud.png";
import pipe from "../../assets/images/sprites/mario/sm-pipe.png";
import castle from "../../assets/images/sprites/mario/sm-castle.png";
import hill from "../../assets/images/sprites/mario/sm-hill.png";
import {
  constructLevel1,
  constructLevel2,
  constructLevel3,
  constructLevel4,
} from "./constructLevel";

// POKEMON IMPORTS
import pokemonTileset from "../../assets/images/tileset/pokemon-tileset.png";
import house from "../../assets/images/tileset/pokemon-house.png";
import center from "../../assets/images/tileset/pokemon-center.png";
import pika from "../../assets/images/sprites/pokemon/pikasprite.png";
import pokemonMusic from "../../assets/audio/music/pokemon-win-music.mp3";

// PACMAN IMPORTS
import mazebrick from "../../assets/images/sprites/pacman/mazebrick.png";
import pacman from "../../assets/images/sprites/pacman/pacman.png";
import pacmanMusic from "../../assets/audio/music/pacman-level-music.mp3";

// SPACE INVADERS IMPORTS

import iceplanet from "../../assets/images/sprites/space-invaders/iceplanet.png";
import shattered_planet from "../../assets/images/sprites/space-invaders/shattered_planet.png";
import redplanet from "../../assets/images/sprites/space-invaders/redplanet.png";
import sphereplanet from "../../assets/images/sprites/space-invaders/sphereplanet.png";
import asteroid from "../../assets/images/sprites/space-invaders/asteroid.png";
import spaceInvaderMusic from "../../assets/audio/music/space-invaders-level-music.mp3";
import spaceBackground from "../../assets/images/backgrounds/space-background.png";

export const level1Config = {
  boss: {
    sprite: "bowser",
    die: "bowserdies",
    hurt: "bowserhurt",
    bullet: "bowserbullet",
    shot: "bowsershoot",
    arrives: "bowserarrives",
    win: "mariowin",
    gameLevel: 1,
    health: 600,
  },

  homingEnemy: {
    sprite: "bullet",
    scale: 1,
  },

  staticEnemy: {
    sprite: "koopa",
    die: "ghost-dead",
    bullet: "koopabullet",
    shot: "koopashoot",
  },

  sprites: {
    tileset: marioTileset,
    mario,
    princess,
    cloud,
    pipe,
    castle,
    hill,
  },

  music: {
    main: marioMusic,
  },
  background: "var(--clr-mario-sky)",
  constructLevel: constructLevel1,
};

export const level2Config = {
  boss: {
    sprite: "mewtwo",
    die: "mewtwodies",
    hurt: "mewtwohurt",
    bullet: "arbokbullet",
    shot: "mewtwoshoot",
    arrives: "mewtwoarrives",
    win: "pokemonwin",
    gameLevel: 2,
    health: 800,
  },

  homingEnemy: {
    sprite: "koffing",
    scale: 0.75,
  },

  staticEnemy: {
    sprite: "arbok",
    die: "arbokdead",
    bullet: "arbokbullet",
    shot: "arbokshoot",
  },

  sprites: {
    tileset: pokemonTileset,
    house,
    center,
    pika,
  },

  music: {
    main: pokemonMusic,
  },
  background: "var(--clr-pokemon-color)",
  constructLevel: constructLevel2,
};

export const level3Config = {
  boss: {
    sprite: "redghost",
    die: "redghostdie",
    hurt: "redghosthurt",
    bullet: "arbokbullet",
    shot: "redghostshoot",
    arrives: "redghostarrives",
    win: "pacmanwin",
    gameLevel: 3,
    health: 1000,
  },

  sprites: {
    mazebrick,
    pacman,
  },

  music: {
    main: pacmanMusic,
  },
  background: "black",
  constructLevel: constructLevel3,
};

export const level4Config = {
  boss: {
    sprite: "spaceship",
    die: "spaceshipdie",
    hurt: "spaceshiphurt",
    bullet: "invaderbullet",
    shot: "spaceshipshoot",
    arrives: "spaceshiparrives",
    win: "spaceshipwin",
    gameLevel: 4,
    health: 1200,
  },

  homingEnemyShoot: {
    sprite: "invader",
    bullet: "invaderbullet",
    shot: "spaceshipshoot",
  },

  sprites: {
    iceplanet,
    shattered_planet,
    redplanet,
    sphereplanet,
    asteroid,
  },

  music: {
    main: spaceInvaderMusic,
  },
  background: spaceBackground,
  constructLevel: constructLevel4,
};
