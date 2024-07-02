class Endboss extends MovableObject {
  height = 400;
  width = 300;
  y = 55;
  isEnemyDead = false;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  hadFirstContact = false;

  constructor() {
    super();

    this.loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);

    this.x = 2300;
    this.speed = 10;

    this.animate();
  }

  animate() {
    let i = 0;
    setInterval(() => {
      this.playAnimation(this.IMAGES_ALERT[0]);

      if (i < 10) {
        this.playAnimation(this.IMAGES_ALERT[0]);
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.hadFirstContact) {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
      i++;

      if (world.character.x > 1900 && !this.hadFirstContact) {
        i = 0;

        this.hadFirstContact = true;
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 150);
  }
}
