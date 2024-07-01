let canvas;
let world;
let keyboard = new Keyboard();

async function init() {
  document.querySelector(".start-screen").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  document.querySelector(".play-btn").style.display = "none";

  initLevel();

  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp") {
    keyboard.UP = true;
  } else if (e.code === "ArrowDown") {
    keyboard.DOWN = true;
  } else if (e.code === "ArrowLeft") {
    keyboard.LEFT = true;
  } else if (e.code === "ArrowRight") {
    keyboard.RIGHT = true;
  } else if (e.code === "KeyD") {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code === "ArrowUp") {
    keyboard.UP = false;
  } else if (e.code === "ArrowDown") {
    keyboard.DOWN = false;
  } else if (e.code === "ArrowLeft") {
    keyboard.LEFT = false;
  } else if (e.code === "ArrowRight") {
    keyboard.RIGHT = false;
  } else if (e.code === "KeyD") {
    keyboard.D = false;
  }
});
