class ThrowableObject extends MovableObject {
  throwing_sound = new Audio("audio/throw.mp3");

  constructor(x, y) {
    super();
    this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.throw();
  }

  throw() {
    this.throwing_sound.play();
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 5;
    }, 25);
  }
}
