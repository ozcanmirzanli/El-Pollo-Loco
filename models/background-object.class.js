class BackgroundObject extends MovableObject {
  width = 720;
  height = 500;
  x = 0;
  y = 0;

  constructor(imagePath) {
    super().loadImage(imagePath);
  }
}
