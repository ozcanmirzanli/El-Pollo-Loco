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
    this.checkBottlesPosition();
  }

  setWorld() {
    this.character.world = this;
    this.endBoss.world = this;
  }

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

  throwBottle() {
    setInterval(() => {
      this.checkThrowObjects();
    }, 550);
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
      this.audioElements.bottle_sound.play();
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

  // prettier-ignore
  checkIsJumpedOn() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isJumpedOn(enemy) &&
        !enemy.isEnemyDead &&
        this.character.isAboveGround()
      ) {
        this.killedEnemy(enemy);
        this.character.jump(5); // Example: Make the character bounce back after jump
      }
    });
  }

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

  collectCoins() {
    this.collectItems("coins", 15, this.coinsBar);
  }

  collectSalsaBottles() {
    this.collectItems("salsaBottle", 15, this.bottleBar);
  }

  collectItems(itemType, increment, bar) {
    if (this.isMaxValueReached(itemType, bar)) {
      return;
    }
    this.level[itemType] = this.filterAndCollectItems(itemType, increment, bar);
  }

  isMaxValueReached(itemType, bar) {
    return (
      bar[itemType] >= 100 ||
      (itemType === "salsaBottle" && this.character.salsaBottle >= 100)
    );
  }

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

  incrementItem(itemType, increment) {
    if (itemType === "salsaBottle") {
      this.character.salsaBottle += increment;
    } else {
      this.character[itemType] += increment;
    }
  }

  updateBar(bar, itemType) {
    if (itemType === "salsaBottle") {
      bar.setPercentage(this.character.salsaBottle);
    } else {
      bar.setPercentage(this.character[itemType]);
    }
  }

  playItemSound(itemType) {
    if (itemType === "coins") {
      this.audioElements.coin_sound.play();
    } else {
      this.audioElements.bottle_sound.play();
    }
  }

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

  checkGameOver() {
    if (this.character.isDead() || (this.isBossDead() && !this.isGameOver)) {
      this.gameOver();
    }
  }

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
      this.clearAllIntervals();
    }, 2000);
    this.finishedGameTextAndSoundChange();
  }

  finishedGameTextAndSoundChange() {
    let finishedGameText = document.querySelector(".finished-game-text");

    if (this.character.isDead()) {
      finishedGameText.innerHTML = "GAME OVER!";
      this.audioElements.game_over_sound.play();
    } else if (this.isBossDead()) {
      finishedGameText.innerHTML = "YOU WON!";
      this.audioElements.won_sound.play();
    }
    this.pauseAudio();
  }

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

  pauseAudio() {
    music.pause();
    this.audioElements.boss_fight.pause();
    this.audioElements.boss_fight.currentTime = 0;
  }

  clearAllIntervals() {
    let highestIntervalId = setInterval(() => {}, 1000);
    for (let i = 0; i <= highestIntervalId; i++) {
      clearInterval(i);
    }
  }
}
