class Keyboard extends MovableObject {
  LEFT = false;
  RIGHT = false;
  UP = false;
  D = false;

  constructor() {
    super();
    this.setupTouchControls();
  }

  setupTouchControls() {
    document.addEventListener("DOMContentLoaded", () => {
      const leftButton = document.querySelector(
        ".left-controls .control-button.left"
      );
      const rightButton = document.querySelector(
        ".left-controls .control-button.right"
      );
      const jumpButton = document.querySelector(
        ".right-controls .control-button.jump"
      );
      const throwButton = document.querySelector(
        ".right-controls .control-button.throw"
      );

      if (leftButton) {
        leftButton.addEventListener("touchstart", (event) => {
          this.LEFT = true;
        });

        leftButton.addEventListener("touchend", (event) => {
          this.LEFT = false;
        });
      }

      if (rightButton) {
        rightButton.addEventListener("touchstart", (event) => {
          this.RIGHT = true;
        });

        rightButton.addEventListener("touchend", (event) => {
          this.RIGHT = false;
        });
      }

      if (jumpButton) {
        jumpButton.addEventListener("touchstart", (event) => {
          this.SPACE = true;
        });

        jumpButton.addEventListener("touchend", (event) => {
          this.SPACE = false;
        });
      }

      if (throwButton) {
        throwButton.addEventListener("touchstart", (event) => {
          this.D = true;
        });

        throwButton.addEventListener("touchend", (event) => {
          this.D = false;
        });
      }
    });
  }
}
