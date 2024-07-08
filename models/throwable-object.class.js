class ThrowableObject extends MovableObject {
  throwing_sound = new Audio("audio/throw.mp3");
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
    this.throw();
    this.animate();
  }

  throw() {
    this.throwing_sound.play();
    this.applyGravity();
    this.hitBottleToFloor();
  }

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

  animate() {
    setInterval(() => {
      if (this.y < 380 && !this.hasSplashed) {
        this.playAnimation(this.BOTTLE_ROTATION);
      }
    }, 100);
  }
}
