/**
 * Class representing keyboard and touch controls for player interaction in the game.
 * Extends from MovableObject.
 */
class Keyboard extends MovableObject {
  LEFT = false;
  RIGHT = false;
  UP = false;
  D = false;

  /**
   * Constructs the Keyboard object.
   * Sets up keyboard and touch event listeners for controlling player actions.
   */
  constructor() {
    super();
    this.setupKeyboardControls();
    this.setupTouchControls();
  }

  /**
   * Sets up keyboard event listeners for controlling player actions.
   */
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

  /**
   * Sets up touch event listeners for controlling player actions on touch devices.
   */
  setupTouchControls() {
    document.addEventListener("DOMContentLoaded", () => {
      let leftButton = document.querySelector(".left");
      let rightButton = document.querySelector(".right");
      let jumpButton = document.querySelector(".jump");
      let throwButton = document.querySelector(".throw");

      if (leftButton) {
        leftButton.addEventListener(
          "touchstart",
          (e) => {
            e.preventDefault();
            this.LEFT = true;
          },
          { passive: false }
        );

        leftButton.addEventListener(
          "touchend",
          (e) => {
            e.preventDefault();
            this.LEFT = false;
          },
          { passive: false }
        );
      }

      if (rightButton) {
        rightButton.addEventListener(
          "touchstart",
          (e) => {
            e.preventDefault();
            this.RIGHT = true;
          },
          { passive: false }
        );

        rightButton.addEventListener(
          "touchend",
          (e) => {
            e.preventDefault();
            this.RIGHT = false;
          },
          { passive: false }
        );
      }

      if (jumpButton) {
        jumpButton.addEventListener(
          "touchstart",
          (e) => {
            e.preventDefault();
            this.UP = true;
          },
          { passive: false }
        );

        jumpButton.addEventListener(
          "touchend",
          (e) => {
            e.preventDefault();
            this.UP = false;
          },
          { passive: false }
        );
      }

      if (throwButton) {
        throwButton.addEventListener(
          "touchstart",
          (e) => {
            e.preventDefault();
            this.D = true;
          },
          { passive: false }
        );

        throwButton.addEventListener(
          "touchend",
          (e) => {
            e.preventDefault();
            this.D = false;
          },
          { passive: false }
        );
      }
    });
  }
}
