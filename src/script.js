import kaboom from "kaboom";
import DinoSpriteTest from "../assets/images/sprites/dino.png";

const speed = 150;
const K = kaboom({
    width: 1100,
    height: 900,
    scale: 1,
    background: [0, 0, 0],
    canvas: document.querySelector("#mycanvas"),
});

K.loadSprite("dino", DinoSpriteTest, {
    sliceX: 24,
    sliceY: 1,
    anims: {
        idle: { from: 1, to: 9, loop: true },
        run: { from: 17, to: 23, loop: true },
    },
});

K.scene("demo", () => {
    const player = K.add([K.sprite("dino", { animSpeed: 0.6, flipX: false }), K.scale(2), K.pos(0, 0)]);

    player.play("idle");

    K.onKeyPress("left", () => {
        player.play("run");
        player.flipX = true;
    });

    K.onKeyDown("left", () => {
        player.move(-speed, 0);
        player.flipX = true;
    });

    K.onKeyPress("right", () => {
        player.play("run");
        player.flipX = false;
    });

    K.onKeyDown("right", () => {
        player.flipX = false;
        player.move(speed, 0);
    });

    K.onKeyRelease("left", () => player.play("idle"));
    K.onKeyRelease("right", () => player.play("idle"));

    K.onKeyPress("space", () => {
        const direction = player.flipX ? -5 : 5;

        K.add([
            K.sprite("dino"),
            K.pos(player.pos.x + 40, player.pos.y + 15),
            K.scale(1),
            bulletMovement(direction, 0),
        ]);
    });
});

K.go("demo");

// BULLET UPDATE FRAME
function bulletMovement(x, y) {
    return {
        add() {},
        update() {
            this.pos.x += x;
            this.pos.y += y;
        },
    };
}
