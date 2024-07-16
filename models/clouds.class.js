/**
 * Represents a cloud object in the game.
 * Extends MovableObject, inheriting properties and methods related to movement and collision.
 */
class Cloud extends MovableObject {
  y = 50;
  height = 250;
  width = 500;

  /**
   * Constructs a new Cloud instance.
   * Loads the default image for the cloud, sets a random x-coordinate, and starts animation.
   */
  constructor() {
    super();
    this.loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = Math.random() * 500;
    this.animate();
  }

  /**
   * Initiates animation for the cloud object.
   * Moves the cloud to the left continuously.
   */
  animate() {
    this.moveLeft();
  }
}
