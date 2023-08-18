import Player from "../classes/Player"

export const commonObjects = {
    "P": () => {
        const player = new Player("dino", { x: K.width() / 2, y: K.height() / 2 }, 100, 2);
        return player.sprite;
    },
    ".": () => {
        return null;
    }
};