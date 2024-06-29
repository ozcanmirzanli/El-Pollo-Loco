class DrawableObject {
  img;
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  imageCache = [];
  currentImage = 0;

  // loadImage('img/test.png');
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   *
   * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.bottom - this.offset.top
      );

      ctx.stroke();
    } else if (this instanceof Coins) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "yellow";
      ctx.rect(this.x + 30, this.y + 30, this.width - 60, this.height - 60);
      ctx.stroke();
    } else if (this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.left - this.offset.right,
        this.height - this.offset.bottom - this.offset.top
      );
      ctx.stroke();
    }
  }
}
