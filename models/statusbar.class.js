class Statusbar extends MovableObject {
  width = 250;
  height = 70;
  x = 0;
  y = 10;

  IMAGES_GREEN = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
  ];

  constructor() {
    super();
    this.loadImage(this.IMAGES_GREEN[0]);
    this.loadImages(this.IMAGES_GREEN);
  }
}
