class World {
  character = new Character();
  level = level1;
  // prettier-ignore
  enemies = level1.enemies;
  endBoss = new Endboss();
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
  coin_sound = new Audio("audio/coin.mp3");
  bottle_sound = new Audio("audio/bottle.mp3");
  chicken_dead = new Audio("audio/chicken_dead.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.character.world = this;
    this.endBoss.world = this;
    this.bottleBar = new Bottlebar(this.character.salsaBottle);

    this.draw();
    this.setWorld();
    this.run();
    this.throwBottle();
    this.checkBottlesPosition();
  }

  setWorld() {
    this.character.world = this;
    this.endBoss.world = this;
  }

  run() {
    setInterval(() => {
      this.checkIsJumpedOn();
      this.collectItems("coins", 15, this.coinsBar);
      this.collectItems("salsaBottle", 15, this.bottleBar);
      this.bottleHitEnemy();
      this.bottleHitEndBoss();
      this.showGameOver();
    }, 15);
  }

  throwBottle() {
    setInterval(() => {
      this.checkThrowObjects();
    }, 100);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.canThrowBottle()) {
      let bottle = new ThrowableObject(
        this.character.x + 50,
        this.character.y + 120,
        this
      );
      this.throwableObjects.push(bottle);
      this.character.salsaBottle -= 10; // Decrement bottles by 10
      this.bottleBar.setPercentage(this.character.salsaBottle); // Update bottle bar
      this.bottle_sound.play();
    }
  }

  canThrowBottle() {
    return this.character.salsaBottle >= 10;
  }

  checkBottlesPosition() {
    setInterval(() => {
      this.throwableObjects = this.throwableObjects.filter(
        (bottle) => bottle.y < 370
      );
    }, 1000);
  }

  bottleHitEnemy() {
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (
          bottle.isColliding(enemy) &&
          bottle.y < 380 &&
          !bottle.hasSplashed
        ) {
          this.killedEnemy(enemy);
          bottle.playSplashAnimationAndRemove();
        }
      });
    });
  }

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

  isBossDead() {
    let isBossDead = false;

    if (this.endBoss.energy <= 0) {
      this.endBoss.energy = 0;
      isBossDead = true;
    }
    return isBossDead;
  }

  removeBottle(bottle) {
    const index = this.throwableObjects.indexOf(bottle);
    if (index > -1) {
      this.throwableObjects.splice(index, 1);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkIsJumpedOn() {
    this.level.enemies.forEach((enemy, index) => {
      if (
        this.character.isJumpedOn(enemy) &&
        !enemy.isEnemyDead &&
        this.character.isAboveGround() && // Ensure character is not on the ground
        new Date().getTime() - this.character.lastJumpTime >
          this.character.jumpCooldown // Check cooldown
      ) {
        this.killedEnemy(enemy);
        this.character.jump(5); // Make the character bounce back after hitting an enemy
        this.character.lastJumpTime = new Date().getTime(); // Update last jump time
      }
    });
  }

  killedEnemy(enemy) {
    if (!enemy.isEnemyDead && !(enemy instanceof Endboss)) {
      enemy.isEnemyDead = true;
      this.chicken_dead.play();

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

  collectItems(itemType, increment, bar) {
    if (bar[itemType] >= 100) {
      return;
    } else if (
      itemType === "salsaBottle" &&
      this.character.salsaBottle >= 100
    ) {
      return;
    }

    this.level[itemType] = this.level[itemType].filter((mo) => {
      if (this.character.isColliding(mo)) {
        if (itemType === "salsaBottle") {
          this.character.salsaBottle += increment; // Increment by the specified amount
        } else {
          this.character[itemType] += increment;
        }
        bar.setPercentage(this.character.salsaBottle); // Update the bar with the correct value
        if (itemType === "coins") {
          this.coin_sound.play();
        } else {
          this.bottle_sound.play();
        }

        return false; // Remove item from array
      }
      return true; // Keep item in array
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);
    // ----- Space for fixed objects -----
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarEndBoss);
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

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  showGameOver() {
    const gameOverOverlay = document.querySelector(".game-over-overlay");

    if (this.character.isDead()) {
      gameOverOverlay.style.display = "flex";
      // Force a reflow to ensure the transition applies
      void gameOverOverlay.offsetWidth;
      gameOverOverlay.classList.add("visible");
      clearAllIntervals();
    } else {
      gameOverOverlay.classList.remove("visible");
      gameOverOverlay.style.display = "none";
    }
  }
}
