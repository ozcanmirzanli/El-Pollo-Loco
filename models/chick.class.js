/**
 * Represents a chick enemy in the game.
 * Extends MovableObject, inheriting properties and methods related to movement and collision.
 */

class Chick extends MovableObject {
  width = 25;
  height = 25;
  y = 400;
  isEnemyDead = false;

  offset = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGE_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Constructs a new Chick instance.
   * Initializes default image for walking, sets random position and speed, and starts animation.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);

    this.x = 500 + Math.random() * 2000;
    this.speed = 0.5 + Math.random() * 1;

    this.animate();
  }

  /**
   * Starts animation loops for walking and handling death state of the chick.
   */
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
