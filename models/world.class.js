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
  coin_sound = new Audio("audio/coin.mp3");
  bottle_sound = new Audio("audio/bottle.mp3");
  chicken_dead = new Audio("audio/chicken_dead.mp3");
  game_over_sound = new Audio("audio/game_over.mp3");
  won_sound = new Audio("audio/won.mp3");
  boss_fight = new Audio("audio/boss-fight.mp3");

  isGameOver = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.character.world = this;
    this.endBoss.world = this;
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
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isJumpedOn(enemy) && !enemy.isEnemyDead && 
      this.character.isAboveGround() && new Date().getTime() -
      this.character.lastJumpTime > this.character.jumpCooldown)  // Check cooldown
      {
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
      this.coin_sound.play();
    } else {
      this.bottle_sound.play();
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

    if (this.isBossDead()) {
      this.endBoss.deadAnimation();
    }
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
      this.game_over_sound.play();
    } else if (this.isBossDead()) {
      finishedGameText.innerHTML = "YOU WON!";
      this.won_sound.play();
    }
    this.pauseAudio();
  }

  bossFightSound() {
    if (this.character.hadFirstContact() && !this.isGameOver) {
      if (this.boss_fight.paused) {
        this.boss_fight.play();
      }
      this.boss_fight.volume = 0.3;
      music.pause();
    } else if (this.isGameOver) {
      this.pauseAudio();
    }
  }

  pauseAudio() {
    music.pause();
    this.boss_fight.pause();
    this.boss_fight.currentTime = 0;
  }

  clearAllIntervals() {
    let highestIntervalId = setInterval(() => {}, 1000);
    for (let i = 0; i <= highestIntervalId; i++) {
      clearInterval(i);
    }
  }
}
