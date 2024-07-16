/**
 * Represents a status bar for bottles in the game.
 * Extends MovableObject, inheriting properties and methods related to movement and collision.
 */
class Bottlebar extends MovableObject {
  /**
   * Array of image paths representing different percentage levels of bottles.
   * @type {string[]}
   */
  IMAGES_BOTTLES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   * Constructs a new Bottlebar with the given initial number of bottles.
   * @param {number} [initialBottles=0] - The initial number of bottles represented by the bar.
   */
  constructor(initialBottles = 0) {
    super();
    this.bottles = initialBottles;
    this.loadImages(this.IMAGES_BOTTLES);
    this.setPercentage(initialBottles);

    this.x = 10;
    this.y = 80;
    this.width = 200;
    this.height = 50;
  }

  /**
   * Sets the current percentage of bottles and updates the displayed image accordingly.
   * @param {number} bottles - The current number of bottles to represent.
   */
  setPercentage(bottles) {
    this.bottles = bottles;
    let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image in IMAGES_BOTTLES based on the current percentage of bottles.
   * @returns {number} The index of the image in IMAGES_BOTTLES.
   */
  resolveImageIndex() {
    if (this.bottles >= 100) {
      return 5;
    } else if (this.bottles > 80) {
      return 4;
    } else if (this.bottles > 60) {
      return 3;
    } else if (this.bottles > 40) {
      return 2;
    } else if (this.bottles >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
