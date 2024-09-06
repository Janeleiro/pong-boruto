export default class Ball {

    constructor(x, y) {
        this.c = document.getElementById("game");
        this.ctx = this.c.getContext("2d");

        this.x = x;
        this.y = y;
        this.width = 5;
        this.height = 5;

        this.frames = [
            {sx: 668, sy: 65, sw: 27, sh: 27},
            {sx: 640, sy: 65, sw: 27, sh: 27},
        ];
        this.curAnim = 0;
        this.curFrames = 0;
        this.maxFrames = 1;

        this.speed = 1.3;

        this.angle = (Math.random() * (120 - 45)) + 46;
        this.dx = Math.cos(this.angle * (Math.PI / 180));
        this.dy = Math.sin(this.angle * (Math.PI / 180));
    }

    tick(game, player, enemy) {
        if (this.x + (this.dx * this.speed) + this.width >= this.c.width) {
            this.dx *= -1;
        } else if (this.x + (this.dx * this.speed) < 0) {
            this.dx *= -1;
        }

        if(this.y + this.height >= this.c.height) {
            game.player.x = game.width/2 - 28;
            game.enemy.x = game.width/2 - 28;
            this.x = game.width/2 - this.width;
            this.y = player.y - this.height;
            this.speed = 1.3;
            game.ball.dy *= -1;
            game.enemy_points += 1;
		} else if (this.y < 0) {
            game.player.x = game.width/2 - 28;
            game.enemy.x = game.width/2 - 28;
            this.x = game.width/2 - this.width;
            this.y = enemy.y + enemy.height + this.height;
            this.speed = 1.3;
            game.ball.dy *= -1;
            game.player_points += 1;
		}

        if(this.checkCollision(player, this)) {
            this.angle = (Math.random() * (120 - 45)) + 46;
            this.dx = Math.cos(this.angle * (Math.PI / 180));
            this.dy = Math.sin(this.angle * (Math.PI / 180));
            if (this.dy > 0)
                this.dy *= -1;
            this.speed *= 1.1;
            if(this.checkCollisionL(player, this)) {
                player.isAttackingL = true;
            } else {
                player.isAttackingR = true;
            }
        } else if (this.checkCollision(enemy, this)) {
            this.angle = (Math.random() * (120 - 45)) + 46;
            this.dx = Math.cos(this.angle * (Math.PI / 180));
            this.dy = Math.sin(this.angle * (Math.PI / 180));
            if (this.dy < 0)
                this.dy *= -1;
            this.speed *= 1.1;
            if(this.checkCollisionL(enemy, this)) {
                enemy.isAttackingL = true;
            } else {
                enemy.isAttackingR = true;
            }
        }

        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;

        this.curFrames++;
        if(this.curFrames > this.maxFrames) {
			this.curFrames = 0;
			this.curAnim++;
			if (this.curAnim >= this.frames.length) {
				this.curAnim = 0;
			}
		}
    }

    render(spritesheet) {
        this.ctx.drawImage(spritesheet, this.frames[this.curAnim].sx, this.frames[this.curAnim].sy, this.frames[this.curAnim].sw, this.frames[this.curAnim].sh, this.x - 3, this.y - 3, 12, 12);
        
        // this.ctx.fillStyle = "yellow";
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    checkCollision(r1,r2){
        return !(
            r1.x>r2.x+r2.width || 
            r1.x+r1.width<r2.x || 
            r1.y>r2.y+r2.height || 
            r1.y+r1.height<r2.y
        );
    }

    checkCollisionL(r1,r2){
        return !(
            r1.x>r2.x+r2.width || 
            r1.x+r1.width/2<r2.x || 
            r1.y>r2.y+r2.height || 
            r1.y+r1.height<r2.y
        );
    }

}