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

  /**
   * Applies gravity to the movable object.
   * The object falls if it's above the ground or has a positive vertical speed.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 40);
  }

  /**
   * Checks if the object is above the ground level.
   * Throwable objects always fall, while others check their y position.
   * @returns {boolean} True if above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // ThrowableObject should always fall
      return true;
    } else {
      return this.y < 175;
    }
  }

  /**
   * Checks if the current object is colliding with another movable object.
   * @param {MovableObject} mo - The other movable object to check collision with.
   * @returns {boolean} True if colliding, false otherwise.
   */
  // character.isColliding(chicken);
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right >= mo.x + mo.offset.left && // R->L
      this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top && // T->B
      this.x + this.offset.left <= mo.x + mo.height - mo.offset.right && // L->R
      this.y + this.offset.top <= mo.y + mo.width - mo.offset.bottom // B->T
    );
  }

  /**
   * Checks if the current object is horizontally colliding with another movable object.
   * @param {MovableObject} mo - The other movable object to check horizontal collision with.
   * @returns {boolean} True if horizontally colliding, false otherwise.
   */
  isCollidingHorizontal(mo) {
    return this.x + this.width > mo.x && this.x < mo.x + mo.width;
  }

  /**
   * Checks if the current object has jumped on top of an enemy.
   * @param {MovableObject} enemy - The enemy object to check.
   * @returns {boolean} True if jumped on top of the enemy, false otherwise.
   */
  isJumpedOn(enemy) {
    return (
      this.isCollidingHorizontal(enemy) &&
      this.speedY <= 0 && // Ensure the character is moving upward
      this.y + this.height > enemy.y && // Ensure character is above the enemy
      this.y < enemy.y + enemy.height // Ensure character was not above in the previous frame
    );
  }

  /**
   * Reduces the energy (health) of the object when hit.
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is currently hurt based on the time elapsed since last hit.
   * @returns {boolean} True if currently hurt, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 800; // difference in s
    return timepassed < 1;
  }

  /**
   * Checks if the object is dead (energy is zero).
   * @returns {boolean} True if dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Plays animation by cycling through images.
   * @param {Array<string>} images - Array of image paths for animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right based on its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left based on its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Initiates a jump with a specified jump height.
   * @param {number} jumpHeight - The height of the jump.
   */
  jump(jumpHeight) {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastJumpTime > this.jumpCooldown) {
      // Get current timestamp
      // Check if jump cooldown has passed
      this.speedY = jumpHeight; // Set vertical speed for jump
      this.lastJumpTime = currentTime; // Update last jump time
    }
  }
}
