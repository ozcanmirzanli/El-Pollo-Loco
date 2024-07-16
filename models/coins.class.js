/**
 * Represents a coin object in the game.
 * Extends MovableObject, inheriting properties and methods related to movement and collision.
 */
class Coins extends MovableObject {
  width = 90;
  height = 90;

  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  /**
   * Constructs a new Coins instance.
   * Loads the default image for the coin, sets initial coordinates (x, y), and starts animation.
   * @param {number} x - Initial x-coordinate of the coin.
   * @param {number} y - Initial y-coordinate of the coin.
   */
  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;

    this.animate();
  }

  /**
   * Initiates animation for the coin object.
   * Plays animation by cycling through the array of coin images at random intervals.
   */
  animate() {
    const randomInterval = 300 + Math.random() * 700;
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, randomInterval);
  }
}
