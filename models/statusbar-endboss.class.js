/**
 * Represents a status bar for the end boss in the game, extending the MovableObject class.
 * @extends MovableObject
 */
class StatusbarEndBoss extends MovableObject {
  IMAGES_HEALTH = [
    "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  percentage = 100;

  /**
   * Constructs a new StatusbarEndBoss object.
   * Loads the health images and initializes the status bar position and dimensions.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.setPercentage(100);

    this.x = 500;
    this.y = 0;
    this.width = 200;
    this.height = 50;
  }

  /**
   * Sets the percentage of the status bar and updates the displayed image accordingly.
   * @param {number} percentage - The new percentage value (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the index of the image in IMAGES_HEALTH based on the current percentage.
   * @returns {number} The index of the image in IMAGES_HEALTH array.
   */
  resolveImageIndex() {
    if (this.percentage === 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
