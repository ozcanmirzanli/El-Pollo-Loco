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

      const options = { passive: true };

      if (leftButton) {
        leftButton.addEventListener(
          "touchstart",
          (e) => {
            this.LEFT = true;
          },
          options
        );

        leftButton.addEventListener(
          "touchend",
          (e) => {
            this.LEFT = false;
          },
          options
        );
      }

      if (rightButton) {
        rightButton.addEventListener(
          "touchstart",
          (e) => {
            this.RIGHT = true;
          },
          options
        );

        rightButton.addEventListener(
          "touchend",
          (e) => {
            this.RIGHT = false;
          },
          options
        );
      }

      if (jumpButton) {
        jumpButton.addEventListener(
          "touchstart",
          (e) => {
            this.UP = true;
          },
          options
        );

        jumpButton.addEventListener(
          "touchend",
          (e) => {
            this.UP = false;
          },
          options
        );
      }

      if (throwButton) {
        throwButton.addEventListener(
          "touchstart",
          (e) => {
            this.D = true;
          },
          options
        );

        throwButton.addEventListener(
          "touchend",
          (e) => {
            this.D = false;
          },
          options
        );
      }
    });
  }
}
