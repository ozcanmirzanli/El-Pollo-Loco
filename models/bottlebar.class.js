class Bottlebar extends MovableObject {
  IMAGES_BOTTLES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];
  bottles = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLES);
    this.setPercentage(0);

    this.x = 10;
    this.y = 80;
    this.width = 200;
    this.height = 50;
  }

  setPercentage(bottles) {
    this.bottles = bottles;
    let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.bottles === 100) {
      return 5;
    } else if (this.bottles > 80) {
      return 4;
    } else if (this.bottles > 60) {
      return 3;
    } else if (this.bottles > 40) {
      return 2;
    } else if (this.bottles > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
