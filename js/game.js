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

  checkScreenHeightAndRequestFullscreen();
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function requestFullscreen() {
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    // IE/Edge
    element.msRequestFullscreen();
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
