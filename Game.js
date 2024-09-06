import Ball from './Ball.js';
import Enemy from './Enemy.js';
import Player from './Player.js';

export default class Game {
  constructor() {
    const c = document.getElementById("game");
    this.ctx = c.getContext("2d");

    this.width = c.width;
    this.height = c.height;
    this.player = new Player(this.width/2 - 28, this.height - 18);
    this.enemy = new Enemy(this.width/2 - 28, 18);
    this.ball = new Ball(this.width/2 - 2.5, this.height/2 - 1);
    this.player_points = 0;
    this.enemy_points = 0;
    this.spritesheet = new Image();
    this.spritesheet.src = './img/spritesheet.png';
  }

  tick() {
    this.player.tick();
    this.enemy.tick(this, this.ball);
    this.ball.tick(this, this.player, this.enemy);
  }

  render(spritesheet) {
    this.ctx.fillStyle = "#C68767";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.player.render(spritesheet);
    this.enemy.render(spritesheet);
    this.ball.render(spritesheet);

    let pPoints = document.querySelector('#player-points span');
    let ePoints = document.querySelector('#enemy-points span');

    pPoints.textContent = this.player_points;
    ePoints.textContent = this.enemy_points;
  }

  keyboardEvent() {
    let leftButton = document.querySelector('#left');
    let rightButton = document.querySelector('#right');

    document.addEventListener ('keydown', (event) => {
      if (event.key == 'ArrowLeft') {
        this.player.left = true;
      } else if (event.key == 'ArrowRight') {
        this.player.right = true;
      } 
    });
    document.addEventListener ('keyup', (event) => {
      if (event.key == 'ArrowLeft') {
        this.player.left = false;
      } else if (event.key == 'ArrowRight') {
        this.player.right = false;
      } 
    });

    document.addEventListener('touchstart', (event) => {
      if (event.target == leftButton) {
        this.player.left = true;
      } else if (event.target == rightButton) {
        this.player.right = true;
      }
    });
    document.addEventListener('touchend', (event) => {
      if (event.target == leftButton) {
        this.player.left = false;
      } else if (event.target == rightButton) {
        this.player.right = false;
      } 
    });
  }

  run() {
    this.keyboardEvent();
    setInterval(() => {
      this.tick();
      this.render(this.spritesheet);
    }, 1000/60);
  }

}