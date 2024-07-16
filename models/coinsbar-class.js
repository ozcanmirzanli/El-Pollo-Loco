/**
 * Represents a status bar displaying the player's coins.
 * Extends MovableObject, inheriting properties and methods related to movement and collision.
 */
class Coinsbar extends MovableObject {
  IMAGES_COINSBAR = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  coins = 0;

  /**
   * Constructs a new Coinsbar instance.
   * Loads images for the coins bar, sets initial percentage, and initializes position and size.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_COINSBAR);
    this.setPercentage(0);

    this.x = 10;
    this.y = 40;
    this.width = 200;
    this.height = 50;
  }

  /**
   * Sets the percentage of coins and updates the displayed image accordingly.
   * @param {number} coins - Number of coins to set.
   */
  setPercentage(coins) {
    this.coins = coins;
    let path = this.IMAGES_COINSBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the index of the image in IMAGES_COINSBAR based on the current percentage of coins.
   * @returns {number} Index of the image in IMAGES_COINSBAR.
   */
  resolveImageIndex() {
    if (this.coins >= 100) {
      return 5;
    } else if (this.coins > 80) {
      return 4;
    } else if (this.coins > 60) {
      return 3;
    } else if (this.coins > 40) {
      return 2;
    } else if (this.coins >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
