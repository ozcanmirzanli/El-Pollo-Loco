class Endboss extends MovableObject {
  height = 250;
  width = 200;
  y = 0;
  isEnemyDead = false;
  energy = 100;

  offset = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
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

  constructor() {
    super();

    this.loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);

    this.x = 2300;

    this.speed = 10;
    this.applyGravity();

    this.animate();
    this.attackAnimation();
    this.deadAnimation();
  }

  animate() {
    let i = 0;
    setInterval(() => {
      this.playAnimation(this.IMAGES_ALERT[0]);

      if (i < 10) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.hadFirstContact && !this.isEnemyDead) {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.isHurtByCharacter() && !this.isEnemyDead) {
        this.playAnimation(this.IMAGES_HURT);
        this.world.statusBar.setPercentage(this.energy);
      } else if (this.isEnemyDead) {
        this.playAnimation(this.IMAGES_DEAD);
      } else {
        this.loadImage("img/4_enemie_boss_chicken/1_walk/G1.png");
      }
      i++;

      if (world.character.x > 1900 && !this.hadFirstContact) {
        i = 0;
        this.hadFirstContact = true;
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 150);
  }

  attackAnimation() {
    setInterval(() => {
      if (this.hadFirstContact && !this.isEnemyDead) {
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

  deadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
  }

  isHurtByCharacter() {
    if (!this.world || !this.world.salsaBottle) return false;
    const hurtByCharacter = this.world.salsaBottle.some(
      (bottle) => bottle.isColliding(this) && !this.isEnemyDead
    );
    if (hurtByCharacter) {
      this.hit();
    }
    return hurtByCharacter;
  }

  hit() {
    this.energy -= 5;
    if (this.energy <= 0) {
      this.energy = 0;
      this.isEnemyDead = true;
    }
  }
}
