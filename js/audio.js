const audioElements = {
  coin_sound: new Audio("audio/coin.mp3"),
  bottle_sound: new Audio("audio/bottle.mp3"),
  chicken_dead: new Audio("audio/chicken_dead.mp3"),
  game_over_sound: new Audio("audio/game_over.mp3"),
  won_sound: new Audio("audio/won.mp3"),
  boss_fight: new Audio("audio/boss-fight.mp3"),
  walking_sound: new Audio("audio/walking.mp3"),
  jumping_sound: new Audio("audio/jumping.mp3"),
  hurt_sound: new Audio("audio/hurt.mp3"),
  dead_sound: new Audio("audio/dead.mp3"),
  endboss_jump: new Audio("audio/endboss_jump.mp3"),
  endboss_angry: new Audio("audio/endboss_angry.mp3"),
  endboss_dead: new Audio("audio/endboss_dead.mp3"),
  throwing_sound: new Audio("audio/throw.mp3"),
};

// Set muted property to true for each audio element
Object.values(audioElements).forEach((audio) => {
  audio.muted = true;
});
