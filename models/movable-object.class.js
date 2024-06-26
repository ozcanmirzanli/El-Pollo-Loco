class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 1;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  coins = 0;
  salsaBottle = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // ThrowableObject should always fall
      return true;
    } else {
      return this.y < 175;
    }
  }

  // character.isColliding(chicken);
  isColliding(obj) {
    return (
      this.x + this.width > obj.x &&
      this.x < obj.x + obj.width &&
      this.y + this.height > obj.y &&
      this.y < obj.y + obj.height
    );
  }

  isHorizontallyOverlapping(obj) {
    return this.x + this.width > obj.x && this.x < obj.x + obj.width;
  }

  isJumpedOn(obj) {
    return (
      this.isHorizontallyOverlapping(obj) &&
      this.y + this.height <= obj.y + 10 && // Adjust to allow for a margin
      this.y + this.height - this.speedY > obj.y
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 800; // difference in s
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump(jumpHeight) {
    this.speedY = jumpHeight;
  }
}
