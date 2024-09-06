export default class Player {

  constructor(x, y) {
    this.c = document.getElementById("game");
    this.ctx = this.c.getContext("2d");

    this.x = x;
    this.y = y;
    this.width = 56;
    this.height = 10;

    this.animStop = [
      {sx: 0, sy: 0, sw: 57, sh: 13},
    ];
    this.animWalkR = [
      {sx: 57, sy: 0, sw: 57, sh: 15},
      {sx: 114, sy: 0, sw: 57, sh: 15},
      {sx: 171, sy: 0, sw: 57, sh: 15},
      {sx: 228, sy: 0, sw: 57, sh: 15},
    ];
    this.animWalkL = [
      {sx: 285, sy: 0, sw: 57, sh: 15},
      {sx: 342, sy: 0, sw: 57, sh: 15},
      {sx: 399, sy: 0, sw: 57, sh: 15},
      {sx: 456, sy: 0, sw: 57, sh: 15},
    ];
    this.animAtkL = [
      {sx: 0, sy: 33, sw: 55, sh: 27},
      {sx: 55, sy: 33, sw: 55, sh: 27},
      {sx: 110, sy: 33, sw: 55, sh: 27},
    ];
    this.animAtkR = [
      {sx: 165, sy: 33, sw: 55, sh: 27},
      {sx: 220, sy: 33, sw: 55, sh: 27},
      {sx: 275, sy: 33, sw: 55, sh: 27},
    ];
    this.curAnimList = [];
    this.curAnim = 0;
    this.curFrames = 0;
    this.maxFrames = 3;
    this.isAttackingL = false;
    this.isAttackingR = false;
    this.wasAttacking = false;

    this.left = false;
    this.right = false;
  }

  tick() {
    if(this.isAttackingL || this.isAttackingR) {
      if(this.isAttackingL)
        this.curAnimList = this.animAtkL;
      else
        this.curAnimList = this.animAtkR;
      if(!this.wasAttacking) {
        this.curAnim = 0;
        this.wasAttacking = true;
      }
    } else if(this.right) {
			this.x++;
      this.curAnimList = this.animWalkR;
		} else if(this.left) {
			this.x--;
      this.curAnimList = this.animWalkL;
		} else {
      this.curAnim = 0;
      this.curAnimList = this.animStop;
    }

    if(this.x + this.width > this.c.width) {
			this.x = this.c.width - this.width;
		} else if (this.x < 0) {
			this.x = 0;
		}

    this.curFrames++;
    if(this.curFrames > this.maxFrames) {
      this.curFrames = 0;
      this.curAnim++;
      if (this.curAnim >= this.curAnimList.length) {
        this.curAnim = 0;
        if(this.isAttackingL || this.isAttackingR) {
          this.curAnimList = this.animStop;
          this.isAttackingL = false;
          this.isAttackingR = false;
          this.wasAttacking = false;
        }
      }
    }
  }

  render(spritesheet) {
      if(!this.wasAttacking) {
        this.ctx.drawImage(spritesheet, this.curAnimList[this.curAnim].sx, this.curAnimList[this.curAnim].sy, this.curAnimList[this.curAnim].sw, this.curAnimList[this.curAnim].sh, this.x, this.y - 1, this.curAnimList[this.curAnim].sw, this.curAnimList[this.curAnim].sh);
      } else {
        this.ctx.drawImage(spritesheet, this.curAnimList[this.curAnim].sx, this.curAnimList[this.curAnim].sy, this.curAnimList[this.curAnim].sw, this.curAnimList[this.curAnim].sh, this.x, this.y - 13, this.curAnimList[this.curAnim].sw, this.curAnimList[this.curAnim].sh);
      }

    // this.ctx.fillStyle = "blue";
    // this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

}