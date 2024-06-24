class Coins extends MovableObject {
  width = 100;
  height = 100;

  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;

    this.animate();
  }

  animate() {
    const randomInterval = 300 + Math.random() * 700;
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, randomInterval);
  }
}
