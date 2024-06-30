class ThrowableObject extends MovableObject {
  throwing_sound = new Audio("audio/throw.mp3");

  offset = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  };

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
    this.speedY = 20;
    this.acceleration = 2; // Gravity acceleration
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
      this.x += 5;

      if (this.y >= 380) {
        this.y = 380; // Ensure the object stays at y=370
        clearInterval(this.throwInterval); // Stop horizontal movement
        this.speedY = 0; // Stop vertical movement
        this.acceleration = 0; // Stop further acceleration effect
      }
    }, 25);
  }

  animate() {
    setInterval(() => {
      if (this.y === 380) {
        this.playAnimation(this.SPLASH_SALSA);
      }
    }, 100);
  }
}
