class Cloud extends MovableObject {
  y = 20;
  height = 250;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.x = Math.random() * 500;
    this.width = 500;
    this.height = 300;
  }
}
