export default class Enemy {

    constructor(x, y) {
        this.c = document.getElementById("game");
        this.ctx = this.c.getContext("2d");

        this.x = x;
        this.y = y;
        this.width = 56;
        this.height = 10;

        this.animStop = [
            {sx: 0, sy: 20, sw: 60, sh: 13},
        ];
        this.animWalkR = [
            {sx: 420, sy: 15, sw: 60, sh: 18},
            {sx: 480, sy: 15, sw: 60, sh: 18},
            {sx: 540, sy: 15, sw: 60, sh: 18},
            {sx: 600, sy: 15, sw: 60, sh: 18},
            {sx: 660, sy: 15, sw: 60, sh: 18},
            {sx: 720, sy: 15, sw: 60, sh: 18},
        ];
        this.animWalkL = [
            {sx: 60, sy: 15, sw: 60, sh: 18},
            {sx: 120, sy: 15, sw: 60, sh: 18},
            {sx: 180, sy: 15, sw: 60, sh: 18},
            {sx: 240, sy: 15, sw: 60, sh: 18},
            {sx: 300, sy: 15, sw: 60, sh: 18},
            {sx: 360, sy: 15, sw: 60, sh: 18},
        ];
        this.animAtkR = [
            {sx: 0, sy: 60, sw: 63, sh: 48},
            {sx: 63, sy: 60, sw: 63, sh: 48},
            {sx: 126, sy: 60, sw: 63, sh: 48},
        ];
        this.animAtkL = [
            {sx: 189, sy: 60, sw: 63, sh: 48},
            {sx: 252, sy: 60, sw: 63, sh: 48},
            // {sx: 315, sy: 60, sw: 63, sh: 48},
            {sx: 378, sy: 60, sw: 63, sh: 48},
            {sx: 441, sy: 60, sw: 63, sh: 48},
            {sx: 504, sy: 60, sw: 63, sh: 48},
        ];
        this.curAnimList = this.animStop;
        this.curAnim = 0;
        this.curFrames = 0;
        this.maxFrames = 3;
        this.isAttackingL = false;
        this.isAttackingR = false;
        this.wasAttacking = false;

        this.lastBallPosition = 0;
    }

    tick(game, ball) {
        let enemyVision = 0.5 + (game.player_points * 0.05);

        if(this.isAttackingL || this.isAttackingR) {
            if(this.isAttackingL)
                this.curAnimList = this.animAtkL;
            else
                this.curAnimList = this.animAtkR;
            if(!this.wasAttacking) {
                this.curAnim = 0;
                this.wasAttacking = true;
            }
        } else if(ball.y < game.width * enemyVision && this.lastBallPosition > ball.y) {
            if(ball.x - this.x - (this.width/2 - ball.width/2) > 1) {
                this.x += 1;
                if (this.curAnimList !== this.animWalkR) {
                    this.curAnim = 0;
                    this.curAnimList = this.animWalkR;
                }
            } else if(ball.x - this.x - (this.width/2 - ball.width/2) < -1) {
                this.x -= 1;
                if (this.curAnimList !== this.animWalkL) {
                    this.curAnim = 0;
                    this.curAnimList = this.animWalkL;
                }
            }
        } else {
            this.curAnim = 0;
            this.curAnimList = this.animStop;
        }

        if(this.x + this.width > this.c.width) {
            this.x = this.c.width - this.width;
        } else if (this.x < 0) {
            this.x = 0;
        }

        this.lastBallPosition = ball.y;

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
        // this.ctx.fillStyle = "red";
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);

        if(!this.wasAttacking) {
            this.ctx.drawImage(spritesheet, this.curAnimList[this.curAnim].sx, this.curAnimList[this.curAnim].sy, this.curAnimList[this.curAnim].sw, this.curAnimList[this.curAnim].sh, this.x, this.y - 11, this.curAnimList[this.curAnim].sw, this.curAnimList[this.curAnim].sh);
        } else {
            this.ctx.drawImage(spritesheet, this.curAnimList[this.curAnim].sx, this.curAnimList[this.curAnim].sy, this.curAnimList[this.curAnim].sw, this.curAnimList[this.curAnim].sh, this.x, this.y - 13, this.curAnimList[this.curAnim].sw, this.curAnimList[this.curAnim].sh);
        }
    }

}