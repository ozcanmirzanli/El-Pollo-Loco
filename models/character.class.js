/**
 * Represents the main character in the game.
 * Extends MovableObject, inheriting properties and methods related to movement and collision.
 */
class Character extends MovableObject {
  width = 120;
  height = 250;
  x = 50;
  y = 100;
  speed = 5;

  totalBottles = 100;
  salsaBottle = 0;

  lastThrowTime = 0;

  offset = {
    top: 120,
    bottom: 20,
    left: 30,
    right: 30,
  };

  lastJumpTime = 0;
  jumpCooldown = 300;
  idleTime = 0;
  isSleeping = false;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_SLEEPING = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;

  /**
   * Constructs a new Character instance.
   * Initializes default images, applies gravity, sets up animation, keyboard handling, and idle time tracking.
   */
  constructor() {
    super();
    this.loadDefaultImages();
    this.applyGravity();
    this.animate();
    this.keyboardInterval();
    this.trackIdleTime();
    this.keyboard = new Keyboard();
    this.endBoss = new Endboss();
  }

  /**
   * Loads default images for walking, jumping, hurt, dead, and sleeping animations.
   */
  loadDefaultImages() {
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_SLEEPING);
  }

  /**
   * Checks if the character had the first contact with the end boss.
   * @returns {boolean} True if the character had first contact with the end boss, false otherwise.
   */
  hadFirstContact() {
    return this.world.endBoss.hadFirstContact;
  }

  /**
   * Animates the character based on its state (walking, jumping, idle, hurt, dead).
   */
  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.deadAnimation();
      } else if (this.isHurtByAnyEnemy()) {
        this.hurtAnimation();
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        this.handleIdleOrWalkingAnimation();
      }
    }, 50);
  }

  /**
   * Determines and plays either walking or idle animation based on keyboard input.
   */
  handleIdleOrWalkingAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.handleIdleAnimation();
    }
  }

  /**
   * Plays idle animation when the character is not moving.
   */
  handleIdleAnimation() {
    if (this.idleTime < 2) {
      this.loadImage(this.IMAGES_WALKING[0]);
    }
  }

  /**
   * Sets up keyboard input handling at regular intervals.
   */
  keyboardInterval() {
    setInterval(() => {
      this.handleMovement();
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * Handles movement based on keyboard input.
   */
  handleMovement() {
    this.world.audioElements.walking_sound.pause();
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveHorizontally(false);
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveHorizontally(true);
    }
    if (this.world.keyboard.UP && !this.isAboveGround()) {
      this.jumpFunc();
    }
  }

  /**
   * Moves the character horizontally.
   * @param {boolean} left - Whether to move left (true) or right (false).
   */
  moveHorizontally(left) {
    if (left) {
      this.moveLeft();
      this.otherDirection = true;
    } else {
      this.moveRight();
      this.otherDirection = false;
    }
    this.world.audioElements.walking_sound.play();
    this.idleTime = 0;
    this.isSleeping = false;
  }

  /**
   * Initiates a jump for the character.
   */
  jumpFunc() {
    this.jump(30);
    this.world.audioElements.jumping_sound.play();
    this.world.audioElements.jumping_sound.volume = 0.5;
    this.idleTime = 0;
    this.isSleeping = false;
  }

  /**
   * Plays the animation sequence for the character's death.
   */
  deadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    this.world.audioElements.dead_sound.play();
  }

  /**
   * Plays the animation sequence for the character being hurt by an enemy.
   */
  hurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
    this.world.audioElements.hurt_sound.play();
    this.world.statusBar.setPercentage(this.energy);
  }

  /**
   * Checks if the character is hurt by any enemy and triggers the appropriate actions.
   * @returns {boolean} True if the character is hurt by any enemy, false otherwise.
   */
  isHurtByAnyEnemy() {
    const hurtByEnemy = this.world.level.enemies.some(
      (enemy) => this.isColliding(enemy) && !enemy.isEnemyDead
    );
    if (hurtByEnemy) {
      this.hit();
    }
    return hurtByEnemy;
  }

  /**
   * Tracks idle time and plays sleeping animation if the character remains idle for too long.
   */
  trackIdleTime() {
    setInterval(() => {
      if (!this.isSleeping && !this.isDead() && !this.isHurtByAnyEnemy()) {
        this.idleTime += 2; // Increment idleTime in seconds
        if (this.idleTime >= 0) {
          this.isSleeping = true;
          this.playSleepingAnimation();
        }
      }
    }, 500);
  }

  handleBottleThrow() {
    this.idleTime = 0;
    this.isSleeping = false;
    this.setThrowingState(); // Call setThrowingState method when bottle is thrown

    // Add the following line to clear the sleeping animation interval immediately
    clearInterval(this.sleepInterval);
  }

  /**
   * Plays the sleeping animation for the character.
   */
  // prettier-ignore
  playSleepingAnimation() {
    let currentFrame = 0;
    const sleepInterval = setInterval(() => {
      if (!this.isSleeping || this.isDead() || this.isHurtByAnyEnemy() || this.endBoss.isBossDead()
      ) {
        clearInterval(sleepInterval);
        return;
      }
      
      this.playAnimation([this.IMAGES_SLEEPING[currentFrame]]);
      currentFrame++;
      if (currentFrame >= this.IMAGES_SLEEPING.length) {
        currentFrame = 11; // Loop back to the 11th frame
      }
    }, 200);
  }

  /**
   * Sets the character state to throwing.
   */
  setThrowingState() {
    this.isThrowing = true;
    this.isIdle = false;
    this.isSleeping = false;
  }
}
