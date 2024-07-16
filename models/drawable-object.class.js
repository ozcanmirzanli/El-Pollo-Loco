/**
 * Base class representing a drawable object.
 */
class DrawableObject {
  img;
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  imageCache = [];
  currentImage = 0;

  /**
   * Loads an image from the given path and assigns it to the `img` property.
   * @param {string} path - Path to the image file.
   */
  // loadImage('img/test.png');
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images from an array of paths and stores them in the `imageCache`.
   * @param {string[]} arr - Array of paths to image files.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the drawable object on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
