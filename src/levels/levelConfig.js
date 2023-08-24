// MARIO IMPORTS
import marioMusic from "../../assets/audio/music/mario-level-music.mp3";
import marioTileset from "../../assets/images/tileset/mario_tileset.png";
import mario from "../../assets/images/sprites/mario/sm-mario-one.png";
import princess from "../../assets/images/sprites/mario/sm-princess.png";
import cloud from "../../assets/images/sprites/mario/sm-cloud.png";
import pipe from "../../assets/images/sprites/mario/sm-pipe.png";
import castle from "../../assets/images/sprites/mario/sm-castle.png";
import hill from "../../assets/images/sprites/mario/sm-hill.png";

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
};
