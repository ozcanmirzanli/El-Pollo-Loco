let canvas;
let world;
let keyboard = new Keyboard();

let music = new Audio("audio/music.mp3");
music.volume = 0.3;

async function init() {
  clearAllIntervals();
  this.isGameOver = false;

  hideFinishedGameOverlay();
  hideStartScreen();

  let musicBtn = document.querySelector(".music-btn");
  musicBtn.src = "img/music-off.png";

  initLevel();

  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function hideFinishedGameOverlay() {
  let finishedGameOverlay = document.querySelector(".finished-game-overlay");
  finishedGameOverlay.style.display = "none";
  finishedGameOverlay.classList.remove("visible");
}

function hideStartScreen() {
  document.querySelector(".start-screen").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  document.querySelector(".play-btn").style.display = "none";
}

function toggleMusic() {
  let musicBtn = document.querySelector(".music-btn");

  if (music.paused) {
    music.play();
    musicBtn.src = "img/music-on.png";
  } else {
    music.pause();
    musicBtn.src = "img/music-off.png";
  }
}
