class Chicken extends MovableObject {
  width = 50;
  height = 50;
  y = 375;
  isEnemyDead = false;

  offset = {
    top: 30,
    bottom: 30,
    left: 40,
    right: 40,
  };

  walking_sound = new Audio("audio/chickens.mp3");

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGE_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImage(this.IMAGE_DEAD[0]);

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
    }, 200);
  }
}
