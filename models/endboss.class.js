class Endboss extends MovableObject {
  height = 250;
  width = 200;
  y = 0;

  offset = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  };

  world;
  endboss_jump = new Audio("audio/endboss_jump.mp3");
  endboss_angry = new Audio("audio/endboss_angry.mp3");
  endboss_dead = new Audio("audio/endboss_dead.mp3");

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
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  hadFirstContact = false;
  alertAnimationPlayed = false;

  constructor() {
    super();

    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 2300;

    this.speed = 10;
    this.applyGravity();

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.hurtAnimation();
      this.walkAnimation();
      this.checkFirstContact();
      this.endBossEscaped();
    }, 150);
  }

  checkFirstContact() {
    if (world.character.x > 1700 && !this.hadFirstContact) {
      this.hadFirstContact = true;
      this.playAlertAnimation();
      this.endboss_angry.play();
    }
  }

  walkAnimation() {
    if (
      this.hadFirstContact &&
      this.alertAnimationPlayed &&
      !world.bottleHitEndBoss() &&
      !world.isBossDead()
    ) {
      this.moveLeft();
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  playAlertAnimation() {
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < this.IMAGES_ALERT.length) {
        this.img = this.imageCache[this.IMAGES_ALERT[i]];
        i++;
      } else {
        clearInterval(intervalId);
        this.alertAnimationPlayed = true;
      }
    }, 150);
  }

  hurtAnimation() {
    if (world.bottleHitEndBoss()) {
      this.playAnimation(this.IMAGES_HURT);
      this.endboss_angry.play();
      setTimeout(() => this.attackAnimation(), 800);
    }
  }

  deadAnimation() {
    if (world.isBossDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      this.endboss_dead.play();
    }
  }

  attackAnimation() {
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < this.IMAGES_ATTACK.length) {
        this.img = this.imageCache[this.IMAGES_ATTACK[i]];
        i++;
      } else {
        clearInterval(intervalId);
        this.performAttackActions();
      }
    }, 150);
  }

  performAttackActions() {
    this.jump(15);
    setTimeout(() => {
      this.endboss_jump.play();
    }, 500);
  }

  hitEndboss() {
    if (!world.isBossDead()) {
      this.energy -= 0.5;
    }
  }

  endBossEscaped() {
    if (this.x <= 0) {
      world.gameOver();
    }
  }
}
