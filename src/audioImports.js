import bowserDies from "../assets/audio/effects/mario/bowser-die.mp3";
import bowserArrives from "../assets/audio/effects/mario/bowser-arrive.mp3";
import bowserHurt from "../assets/audio/effects/mario/bowser-hurt.mp3";
import bowserShoot from "../assets/audio/effects/mario/bowser-shoot.mp3";
import koopaBullet from "../assets/audio/effects/mario/koopa-shoot.mp3";
import bowserwin from "../assets/audio/music/mario-win.mp3";

import arbokdie from "../assets/audio/effects/pokemon/arbok-dead.mp3";
import arbokshot from "../assets/audio/effects/pokemon/arbok-shoot.mp3";
import mewtwoDies from "../assets/audio/effects/pokemon/mewtwo-dead.mp3";
import mewtwoArrives from "../assets/audio/effects/pokemon/mewtwo-arrive.mp3";
import mewtwoHurt from "../assets/audio/effects/pokemon/mewtwo-hurt.mp3";
import mewtwoShoot from "../assets/audio/effects/pokemon/mewtwo-shoot.mp3";
import mewtwowin from "../assets/audio/music/pokemon-win.mp3";

import redGhostHurt from "../assets/audio/effects/pacman/pacman-death.mp3";
import redGhostDie from "../assets/audio/effects/pacman/pacman-player-death.mp3";
import redGhostArrives from "../assets/audio/effects/pacman/ghost-arrives.mp3";
import pacmanWin from "../assets/audio/music/pacman-win-music.mp3";
import pacmanShoot from "../assets/audio/effects/pacman/pacman-shoot.mp3";

export const BowserAudio = {
  dies: bowserDies,
  arrives: bowserArrives,
  hurt: bowserHurt,
  shoot: bowserShoot,
  staticShooter: koopaBullet,
  win: bowserwin,
};

export const PokemonAudio = {
  dies: mewtwoDies,
  arrives: mewtwoArrives,
  hurt: mewtwoHurt,
  shoot: mewtwoShoot,
  staticDie: arbokdie,
  staticShooter: arbokshot,
  win: mewtwowin,
};

export const PacmanAudio = {
  dies: redGhostDie,
  arrives: redGhostArrives,
  hurt: redGhostHurt,
  shoot: pacmanShoot,
  staticDie: arbokdie,
  staticShooter: arbokshot,
  win: pacmanWin,
};
