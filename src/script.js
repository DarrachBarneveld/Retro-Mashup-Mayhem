import kaboom from "kaboom";

const kaboomInstance = kaboom({
  width: 300,
  height: 300,
  scale: 2.5,
  background: [0, 0, 0, 0.4],
  canvas: document.querySelector("#mycanvas"),
});

kaboomInstance.scene("demo", () => {
  add([
    text("Go Team 4!", {
      size: 24,
      font: "sans-serif",
      width: 300,
      align: "center",
    }),
    pos(0, 136),
    color(255, 215, 0),
  ]);
});

kaboomInstance.go("demo");
