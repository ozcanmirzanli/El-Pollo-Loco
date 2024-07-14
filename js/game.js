let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];

intervalIds.push(this.walkingInterval);

async function init() {
  document.querySelector(".start-screen").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  document.querySelector(".play-btn").style.display = "none";

  initLevel();

  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function stopGame() {
  clearInterval(this.intervalIds);
}
