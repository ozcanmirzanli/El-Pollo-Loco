/**
 * Represents a status bar displaying health percentage, extending the MovableObject class.
 * @extends MovableObject
 */
class Statusbar extends MovableObject {
  IMAGES_HEALTH = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];
  percentage = 100;

  /**
   * Constructs a new Statusbar object.
   * Loads the health images and initializes the status bar position and dimensions.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_HEALTH);
    this.setPercentage(100);

    this.x = 10;
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
