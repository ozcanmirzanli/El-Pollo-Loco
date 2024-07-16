/**
 * Represents a background object in the game.
 * Extends MovableObject, inheriting properties and methods related to movement and collision.
 */
class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

   /**
   * Constructs a new BackgroundObject with the given imagePath and x-coordinate.
   * Automatically positions the object at the bottom of the canvas.
   * @param {string} imagePath - The path to the image file for the background object.
   * @param {number} x - The initial x-coordinate of the background object.
   */
  constructor(imagePath, x) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
