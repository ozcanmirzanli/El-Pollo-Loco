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

  checkScreenHeightAndRequestFullscreen();

  let musicBtn = document.querySelector(".music-btn");
  musicBtn.src = "img/music-off.png";

  initLevel();

  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function requestFullscreen() {
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  }
}

function checkScreenHeightAndRequestFullscreen() {
  if (window.innerHeight < 480) {
    requestFullscreen();
  }
}

// Add event listener for orientation change to handle dynamic changes
window.addEventListener(
  "orientationchange",
  checkScreenHeightAndRequestFullscreen
);

// Add event listener for resize to handle window size changes
window.addEventListener("resize", checkScreenHeightAndRequestFullscreen);

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

function toggleSound() {
  let soundBtn = document.querySelector(".sound-btn");

  // Toggle muted property for each audio element
  for (const key in audioElements) {
    if (audioElements.hasOwnProperty(key)) {
      audioElements[key].muted = !audioElements[key].muted;
    }
  }

  // Update sound button image based on current state
  soundBtn.src = audioElements.coin_sound.muted
    ? "img/sound-off.png"
    : "img/sound-on.png";
}
