class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  salsaBottle;
  level_end_x = 2000;

  constructor(enemies, clouds, backgroundObjects, coins, salsaBottle) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.salsaBottle = salsaBottle;
  }
}
