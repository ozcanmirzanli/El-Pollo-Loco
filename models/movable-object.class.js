class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 3;
  energy = 100;
  lastHit = 0;
  coins = 0;
  salsaBottle = 0;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 40);
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
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right >= mo.x + mo.offset.left && // R->L
      this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top && // T->B
      this.x + this.offset.left <= mo.x + mo.height - mo.offset.right && // L->R
      this.y + this.offset.top <= mo.y + mo.width - mo.offset.bottom // B->T
    );
  }

  isCollidingHorizontal(mo) {
    return this.x + this.width > mo.x && this.x < mo.x + mo.width;
  }

  isJumpedOn(enemy) {
    return (
      this.isCollidingHorizontal(enemy) &&
      this.speedY <= 0 && // Ensure the character is moving upward
      this.y + this.height > enemy.y && // Ensure character is above the enemy
      this.y < enemy.y + enemy.height // Ensure character was not above in the previous frame
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
    const currentTime = new Date().getTime();
    if (currentTime - this.lastJumpTime > this.jumpCooldown) {
      this.speedY = jumpHeight;
      this.lastJumpTime = currentTime; // Update last jump time
    }
  }
}
