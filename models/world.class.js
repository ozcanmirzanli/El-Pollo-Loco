/**
 * Represents the game world where characters, enemies, and objects interact.
 */
class World {
  character = new Character();
  endBoss = new Endboss();
  level = level1;
  // prettier-ignore
  enemies = level1.enemies;
  clouds = level1.clouds;
  backgroundObjects = level1.backgroundObjects;
  canvas;
  ctx;
  camera_x = 0;
  keyboard;
  statusBar = new Statusbar();
  statusBarEndBoss = new StatusbarEndBoss();
  coinsBar = new Coinsbar();
  bottleBar = new Bottlebar();
  throwableObjects = [];
  coins = level1.coins;
  salsaBottle = level1.salsaBottle;

  isGameOver = false;
  lastThrowTime = 0; // Timestamp of the last bottle throw
  throwCooldown = 1000; // Cooldown period in milliseconds (1 second)

  /**
   * Constructs a new World instance.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
   * @param {Keyboard} keyboard - The keyboard input manager.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.character.world = this;
    this.endBoss.world = this;
    this.audioElements = audioElements;
    this.draw();
    this.setWorld();
    this.run();
    this.throwBottle();
  }

  /**
   * Sets the character and end boss references for the world.
   */
  setWorld() {
    this.character.world = this;
    this.endBoss.world = this;
  }

  /**
   * Starts the game loop.
   */
  run() {
    setInterval(() => {
      this.checkIsJumpedOn();
      this.collectCoins();
      this.collectSalsaBottles();
      this.bottleHitEnemy();
      this.bottleHitEndBoss();
      this.checkGameOver();
      this.bossFightSound();
    }, 15);
  }

  /**
   * Initiates throwing a bottle by the character.
   */
  throwBottle() {
    setInterval(() => {
      this.checkThrowObjects();
    }, 100);
  }

  /**
   * Checks if the character can throw a bottle and initiates the action.
   */
  checkThrowObjects() {
    const now = new Date().getTime();
    if (
      this.keyboard.D &&
      this.canThrowBottle() &&
      now - this.lastThrowTime >= this.throwCooldown
    ) {
      let bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 120,
        this
      );
      this.throwableObjects.push(bottle);
      this.character.salsaBottle -= 10; // Decrement bottles by 10
      this.bottleBar.setPercentage(this.character.salsaBottle); // Update bottle bar
      this.audioElements.bottle_sound.play();
      this.lastThrowTime = now; // Update the last throw time
    }
  }

  /**
   * Checks if the character has enough salsa bottles to throw.
   * @returns {boolean} - True if the character can throw a bottle, otherwise false.
   */
  canThrowBottle() {
    return this.character.salsaBottle >= 10;
  }

  /**
   * Checks if any thrown bottle collides with an enemy and performs actions accordingly.
   */
  // prettier-ignore
  bottleHitEnemy() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && bottle.y < 380 && !bottle.hasSplashed) {
          this.killedEnemy(enemy);
          bottle.playSplashAnimationAndRemove();
        }
      });
    });
  }

  /**
   * Checks if any thrown bottle collides with the end boss and performs actions accordingly.
   * @returns {boolean} - True if a bottle hit the end boss, otherwise false.
   */
  bottleHitEndBoss() {
    let hit = false;
    this.throwableObjects.forEach((bottle) => {
      if (bottle.isColliding(this.endBoss) && bottle.y < 380) {
        hit = true;
        this.endBoss.hitEndboss();
        this.statusBarEndBoss.setPercentage(this.endBoss.energy);
        bottle.playSplashAnimationAndRemove();
      }
    });
    return hit;
  }

  /**
   * Removes a thrown bottle from the world.
   * @param {ThrowableObject} bottle - The bottle object to be removed.
   */
  removeBottle(bottle) {
    const index = this.throwableObjects.indexOf(bottle);
    if (index > -1) {
      this.throwableObjects.splice(index, 1);
    }
  }

  /**
   * Checks collisions between the character and enemies, and performs actions accordingly.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Checks if the character has jumped on an enemy and performs actions accordingly.
   */
  // prettier-ignore
  checkIsJumpedOn() {
    for (let enemy of this.level.enemies) {
      if (
        this.character.isJumpedOn(enemy) &&
        !enemy.isEnemyDead &&
        this.character.isAboveGround()
      ) {
        this.killedEnemy(enemy);
        this.character.jump(5); // Example: Make the character bounce back after jump
        break; // Exit the loop after killing one enemy
      }
    }
  }

  /**
   * Marks an enemy as killed and removes it from the level after a delay.
   * @param {MovableObject} enemy - The enemy object to be removed.
   */
  killedEnemy(enemy) {
    if (!enemy.isEnemyDead && !(enemy instanceof Endboss)) {
      enemy.isEnemyDead = true;
      this.audioElements.chicken_dead.play();

      // Remove regular enemy after 1 second
      setTimeout(() => {
        const index = this.level.enemies.indexOf(enemy);
        if (index !== -1) {
          this.level.enemies.splice(index, 1);
        }
      }, 1000);

      this.character.lastJumpTime = new Date().getTime();
    }
  }

  /**
   * Collects coins from the level and updates the character's coin count and UI bar.
   */
  collectCoins() {
    this.collectItems("coins", 15, this.coinsBar);
  }

  /**
   * Collects salsa bottles from the level and updates the character's salsa bottle count and UI bar.
   */
  collectSalsaBottles() {
    this.collectItems("salsaBottle", 15, this.bottleBar);
  }

  /**
   * Collects items (coins or salsa bottles) from the level and updates the character's counts and UI bar.
   * @param {string} itemType - The type of item to collect ("coins" or "salsaBottle").
   * @param {number} increment - The amount to increment the item count.
   * @param {object} bar - The UI bar to update.
   */
  collectItems(itemType, increment, bar) {
    if (this.isMaxValueReached(itemType, bar)) {
      return;
    }
    this.level[itemType] = this.filterAndCollectItems(itemType, increment, bar);
  }

  /**
   * Checks if the maximum value for an item (coins or salsa bottles) has been reached.
   * @param {string} itemType - The type of item to check ("coins" or "salsaBottle").
   * @param {object} bar - The UI bar to check.
   * @returns {boolean} - True if the maximum value is reached, otherwise false.
   */
  isMaxValueReached(itemType, bar) {
    return (
      bar[itemType] >= 100 ||
      (itemType === "salsaBottle" && this.character.salsaBottle >= 100)
    );
  }

  /**
   * Filters and collects items (coins or salsa bottles) from the level.
   * @param {string} itemType - The type of item to collect ("coins" or "salsaBottle").
   * @param {number} increment - The amount to increment the item count.
   * @param {object} bar - The UI bar to update.
   * @returns {Array<MovableObject>} - The filtered array of items after collection.
   */
  filterAndCollectItems(itemType, increment, bar) {
    return this.level[itemType].filter((mo) => {
      if (this.character.isColliding(mo)) {
        this.incrementItem(itemType, increment);
        this.updateBar(bar, itemType);
        this.playItemSound(itemType);
        return false; // Remove item from array
      }
      return true; // Keep item in array
    });
  }

  /**
   * Increments the character's count of coins or salsa bottles.
   * @param {string} itemType - The type of item to increment ("coins" or "salsaBottle").
   * @param {number} increment - The amount to increment.
   */
  incrementItem(itemType, increment) {
    if (itemType === "salsaBottle") {
      this.character.salsaBottle += increment;
    } else {
      this.character[itemType] += increment;
    }
  }

  /**
   * Updates the UI bar for coins or salsa bottles.
   * @param {object} bar - The UI bar to update.
   * @param {string} itemType - The type of item to update ("coins" or "salsaBottle").
   */
  updateBar(bar, itemType) {
    if (itemType === "salsaBottle") {
      bar.setPercentage(this.character.salsaBottle);
    } else {
      bar.setPercentage(this.character[itemType]);
    }
  }

  /**
   * Plays a sound effect based on the collected item type (coins or salsa bottles).
   * @param {string} itemType - The type of item collected ("coins" or "salsaBottle").
   */
  playItemSound(itemType) {
    if (itemType === "coins") {
      this.audioElements.coin_sound.play();
    } else {
      this.audioElements.bottle_sound.play();
    }
  }

  /**
   * Draws all game elements on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);
    // ----- Space for fixed objects -----
    this.addToMap(this.statusBar);

    if (this.endBoss.hadFirstContact) {
      this.addToMap(this.statusBarEndBoss);
    }

    this.addToMap(this.coinsBar);
    this.addToMap(this.bottleBar);

    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);

    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.salsaBottle);

    this.ctx.translate(-this.camera_x, 0);

    // Draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds an array of objects to the rendering map.
   * @param {Array<MovableObject>} objects - The array of objects to add.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds an object to the rendering map, handling flipping if necessary.
   * @param {MovableObject} mo - The object to add to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }
  /**
   * Flips an image horizontally for rendering.
   * @param {MovableObject} mo - The object whose image to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
  /**
   * Restores the original orientation of an image after flipping.
   * @param {MovableObject} mo - The object whose image to restore.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  checkGameOver() {
    if (
      this.character.isDead() ||
      (this.endBoss.isBossDead() && !this.isGameOver)
    ) {
      this.gameOver();
    }
  }

  /**
   * Checks if the game is over due to character death or boss defeat.
   */
  gameOver() {
    if (this.isGameOver) {
      return;
    }

    this.isGameOver = true;
    let finishedGameOverlay = document.querySelector(".finished-game-overlay");

    finishedGameOverlay.style.display = "flex";
    // Force a reflow to ensure the transition applies
    void finishedGameOverlay.offsetWidth;
    finishedGameOverlay.classList.add("visible");
    setTimeout(() => {
      clearAllIntervals();
    }, 2000);
    this.finishedGameTextAndSoundChange();
  }

  /**
   * Changes the text and plays the sound effect based on game outcome (win/lose).
   */
  finishedGameTextAndSoundChange() {
    let finishedGameText = document.querySelector(".finished-game-text");

    if (this.character.isDead()) {
      finishedGameText.innerHTML = "GAME OVER!";
      this.audioElements.game_over_sound.play();
    } else if (this.endBoss.isBossDead()) {
      finishedGameText.innerHTML = "YOU WON!";
      this.audioElements.won_sound.play();
    }
    this.pauseAudio();
  }

  /**
   * Controls the boss fight sound effects during gameplay.
   */
  bossFightSound() {
    if (this.character.hadFirstContact() && !this.isGameOver) {
      if (this.audioElements.boss_fight.paused) {
        this.audioElements.boss_fight.play();
      }
      this.audioElements.boss_fight.volume = 0.3;
      music.pause();
    } else if (this.isGameOver) {
      this.pauseAudio();
    }
  }

  /**
   * Pauses music and the boss fight Audio.
   */
  pauseAudio() {
    music.pause();
    this.audioElements.boss_fight.pause();
    this.audioElements.boss_fight.currentTime = 0;
  }
}
