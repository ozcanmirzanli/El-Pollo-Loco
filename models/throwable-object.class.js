/**
 * Represents a throwable object (such as a salsa bottle) that extends MovableObject.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  hasSplashed = false;

  BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  SPLASH_SALSA = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Constructs a new ThrowableObject.
   * @param {number} x - The initial x-coordinate.
   * @param {number} y - The initial y-coordinate.
   * @param {object} world - The world object in which the throwable object exists.
   */
  constructor(x, y, world) {
    super();
    this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.SPLASH_SALSA);
    this.loadImages(this.BOTTLE_ROTATION);

    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.speedY = 25;
    this.acceleration = 2;
    this.world = world;

    this.checkBottlesPosition();
    this.throw();
    this.animate();
  }

  /**
   * Initiates the throw action.
   */
  throw() {
    this.world.audioElements.throwing_sound.play();
    this.applyGravity();
    this.hitBottleToFloor();
  }

  /**
   * Moves the bottle horizontally and detects collision with the floor.
   */
  hitBottleToFloor() {
    this.throwInterval = setInterval(() => {
      // Check the direction and move the bottle accordingly
      if (this.world.character.otherDirection) {
        this.x -= 5; // Move left if character is facing left
      } else {
        this.x += 5; // Move right if character is facing right
      }
      if (this.y >= 380) {
        this.y = 380; // Ensure the object stays at y=380
        this.playSplashAnimationAndRemove();
      }
    }, 20);
  }

  /**
   * Plays the splash animation and removes the bottle from the world.
   */
  playSplashAnimationAndRemove() {
    if (!this.hasSplashed) {
      this.hasSplashed = true;
      clearInterval(this.throwInterval); // Stop horizontal movement
      this.speedY = 0; // Stop vertical movement
      this.acceleration = 0; // Stop further acceleration effect
      this.playAnimation(this.SPLASH_SALSA);
      setTimeout(() => {
        this.world.removeBottle(this); // Remove the bottle after the splash animation
      }, this.SPLASH_SALSA.length * 100); // Each frame takes 100ms
    }
  }

  /**
   * Checks the position of thrown bottles and removes them if they fall below a certain y-coordinate.
   */
  checkBottlesPosition() {
    setInterval(() => {
      this.world.throwableObjects = this.world.throwableObjects.filter(
        (bottle) => bottle.y < 370
      );
    }, 1000);
  }

  animate() {
    setInterval(() => {
      if (this.y < 380 && !this.hasSplashed) {
        this.playAnimation(this.BOTTLE_ROTATION);
      }
    }, 100);
  }
}
