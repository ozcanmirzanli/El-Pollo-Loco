/**
 * Class representing a game level with enemies, clouds, background objects, coins, and a salsa bottle.
 */
class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  salsaBottle;
  level_end_x = 2000;

  /**
   * Constructs a Level object with specified elements.
   * @param {Array<MovableObject>} enemies - Array of enemies to be placed in the level.
   * @param {Array<MovableObject>} clouds - Array of clouds to be placed in the level.
   * @param {Array<DrawableObject>} backgroundObjects - Array of background objects to be placed in the level.
   * @param {Array<MovableObject>} coins - Array of coins to be placed in the level.
   * @param {MovableObject} salsaBottle - The salsa bottle object to be placed in the level.
   */
  constructor(enemies, clouds, backgroundObjects, coins, salsaBottle) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.salsaBottle = salsaBottle;
  }
}
