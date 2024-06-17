class Character extends MovableObject {
  width = 200;
  height = 300;
  x = 50;
  y = 130;

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
  }

  jump() {}
}
