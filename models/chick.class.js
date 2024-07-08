class Chick extends MovableObject {
  width = 25;
  height = 25;
  y = 390;
  isEnemyDead = false;

  offset = {
    top: 10,
    bottom: 10,
    left: 20,
    right: 20,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGE_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  walking_sound = new Audio("audio/chickens.mp3");

  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);

    this.x = 500 + Math.random() * 2000;
    this.speed = 0.5 + Math.random() * 1;

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.isEnemyDead) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isEnemyDead) {
        this.loadImage(this.IMAGE_DEAD);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 100);
  }
}
