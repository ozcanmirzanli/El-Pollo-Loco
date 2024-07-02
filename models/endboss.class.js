class Endboss extends MovableObject {
  height = 250;
  width = 200;
  y = 0;
  isEnemyDead = false;

  offset = {
    top: 200,
    bottom: 200,
    left: 200,
    right: 200,
  };

  world;

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

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/3_attack/G21.png",
    "img/4_enemie_boss_chicken/3_attack/G22.png",
    "img/4_enemie_boss_chicken/3_attack/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/3_attack/G24.png",
    "img/4_enemie_boss_chicken/3_attack/G25.png",
    "img/4_enemie_boss_chicken/3_attack/G26.png",
  ];

  hadFirstContact = false;

  constructor() {
    super();

    this.loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);

    this.x = 2300;

    this.speed = 10;
    this.applyGravity();

    this.animate();

    this.attack();
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

  attack() {
    setInterval(() => {
      if (this.hadFirstContact) {
        this.playAttackAnimation();

        setTimeout(() => {
          this.jump(30);
        }, 2000);
      }
    }, 5000);
  }

  playAttackAnimation() {
    let attackFrame = 0;
    const attackInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ATTACK);
      attackFrame++;
      if (attackFrame >= this.IMAGES_ATTACK.length) {
        clearInterval(attackInterval);
      }
    }, 300);
  }
}
