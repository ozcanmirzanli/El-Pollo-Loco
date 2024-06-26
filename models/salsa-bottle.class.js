class SalsaBottle extends MovableObject {
  width = 80;
  height = 80;
  y = 350;

  IMAGES = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];
  constructor() {
    super();
    this.loadImage(this.IMAGES[0]);
    this.x = 200 + Math.random() * 2000;
  }
}
