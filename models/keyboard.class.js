class Keyboard extends MovableObject {
  LEFT = false;
  RIGHT = false;
  UP = false;
  D = false;

  constructor() {
    super();
    this.setupKeyboardControls();
    this.setupTouchControls();
  }

  setupKeyboardControls() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowUp") {
        keyboard.UP = true;
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
      } else if (e.code === "ArrowLeft") {
        keyboard.LEFT = false;
      } else if (e.code === "ArrowRight") {
        keyboard.RIGHT = false;
      } else if (e.code === "KeyD") {
        keyboard.D = false;
      }
    });
  }

  setupTouchControls() {
    document.addEventListener("DOMContentLoaded", () => {
      let leftButton = document.querySelector(".left");
      let rightButton = document.querySelector(".right");
      let jumpButton = document.querySelector(".jump");
      let throwButton = document.querySelector(".throw");

      if (leftButton) {
        leftButton.addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.LEFT = true;
        });

        leftButton.addEventListener("touchend", (e) => {
          e.preventDefault();
          this.LEFT = false;
        });
      }

      if (rightButton) {
        rightButton.addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.RIGHT = true;
        });

        rightButton.addEventListener("touchend", (e) => {
          e.preventDefault();
          this.RIGHT = false;
        });
      }

      if (jumpButton) {
        jumpButton.addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.UP = true;
        });

        jumpButton.addEventListener("touchend", (e) => {
          e.preventDefault();
          this.UP = false;
        });
      }

      if (throwButton) {
        throwButton.addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.D = true;
        });

        throwButton.addEventListener("touchend", (e) => {
          e.preventDefault();
          this.D = false;
        });
      }
    });
  }
}
