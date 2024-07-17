/**
 * Class representing the end boss character in the game.
 * Extends from MovableObject.
 */
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

  /**
   * Constructs the Endboss object.
   * Loads initial images and sets initial properties.
   */
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
    this.initAttackTimer();
  }

  /**
   * Initiates animations for the end boss.
   * Includes hurt animation, walking animation, checking first contact, and handling escape.
   */
  animate() {
    setInterval(() => {
      this.hurtAnimation();
      this.walkAnimation();
      this.checkFirstContact();
      this.endBossEscaped();
    }, 150);

    setInterval(() => {
      this.bossFightSound();
    }, 15);
  }

  /**
   * Checks if the character has made first contact with the end boss and triggers alert animation.
   * Plays angry sound effect.
   */
  checkFirstContact() {
    if (world.character.x > 1700 && !this.hadFirstContact) {
      this.hadFirstContact = true;
      this.playAlertAnimation();
      world.audioElements.endboss_angry.play();
    }
  }

  /**
   * Initiates walking animation of the end boss.
   * Moves left, plays walking animation if first contact and alert animation have been played,
   * and the boss is not hit by a bottle or dead.
   */
  walkAnimation() {
    if (
      this.hadFirstContact &&
      this.alertAnimationPlayed &&
      !world.bottleHitEndBoss() &&
      !this.isBossDead()
    ) {
      this.moveLeft();
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Plays the alert animation of the end boss.
   * Sets a timer to mark the end of animation and sets the alert animation flag.
   */
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

  /**
   * Initiates hurt animation of the end boss upon hit by a bottle.
   * Plays angry sound effect and sets a timer to initiate attack animation after a delay.
   */
  hurtAnimation() {
    if (world.bottleHitEndBoss()) {
      this.playAnimation(this.IMAGES_HURT);
      world.audioElements.endboss_angry.play();
    }
  }

  /**
   * Initiates dead animation of the end boss upon defeat.
   * Plays dead sound effect.
   */
  deadAnimation() {
    if (this.isBossDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      world.audioElements.endboss_dead.play();
    }
  }

  /**
   * Initializes the attack timer to trigger attack actions every 5 seconds.
   */
  initAttackTimer() {
    setInterval(() => {
      if (
        this.hadFirstContact &&
        this.alertAnimationPlayed &&
        !this.isBossDead()
      ) {
        this.attackAnimation();
      }
    }, 5000); // Attack every 5 seconds
  }

  /**
   * Initiates attack animation of the end boss.
   * Plays attack animation frames and executes attack actions after animation ends.
   */
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
    }, 60);
  }

  jumpBoss(jumpHeight) {
    this.speedY = jumpHeight;
  }

  /**
   * Performs attack actions of the end boss.
   * Initiates a jump action and plays jump sound effect.
   */
  performAttackActions() {
    this.jumpBoss(30); // Adjust jump height as needed
    setTimeout(() => {
      world.audioElements.endboss_jump.play();
    }, 550);
  }

  /**
   * Decreases the energy of the end boss upon being hit by a bottle.
   * Energy is reduced unless the boss is already dead.
   */
  hitEndboss() {
    if (!this.isBossDead()) {
      this.energy -= 0.5;
    }
  }

  /**
   * Checks if the end boss is dead.
   * @returns {boolean} - True if the end boss is dead, otherwise false.
   */
  isBossDead() {
    let isBossDead = false;

    if (this.energy <= 0) {
      this.energy = 0;
      isBossDead = true;
    }
    return isBossDead;
  }

  /**
   * Controls the boss fight sound effects during gameplay.
   */
  bossFightSound() {
    if (this.hadFirstContact && !world.isGameOver) {
      if (world.audioElements.boss_fight.paused) {
        world.audioElements.boss_fight.play();
      }
      world.audioElements.boss_fight.volume = 0.3;
      music.pause();
    } else if (world.isGameOver) {
      world.pauseAudio();
    }
  }

  /**
   * Checks if the end boss has escaped off-screen and triggers game over if true.
   */
  endBossEscaped() {
    if (this.x <= 0) {
      world.gameOver();
    }
  }
}
