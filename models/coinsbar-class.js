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

  constructor() {
    super();
    this.loadImages(this.IMAGES_COINSBAR);
    this.setPercentage(0);

    this.x = 10;
    this.y = 40;
    this.width = 200;
    this.height = 50;
  }

  setPercentage(coins) {
    this.coins = coins;
    let path = this.IMAGES_COINSBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.coins === 100) {
      return 5;
    } else if (this.coins > 80) {
      return 4;
    } else if (this.coins > 60) {
      return 3;
    } else if (this.coins > 40) {
      return 2;
    } else if (this.coins > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
