const canvas = document.getElementById('canvas');
canvas.width = 400;
canvas.height = 400;
const ctx = canvas.getContext('2d');

class Player{
    constructor(){
        this.w = 70;
        this.h = 10;
        this.x = (canvas.width + this.w) / 2;
        this.y = canvas.height - this.h;
        this.leftPressed = false;
        this.rightPressed = false;
        this.color = '#0095DD';
    }
    init(){
        document.onkeydown = e => {
            if(e.key == "Right" || e.key == "ArrowRight"){
                this.rightPressed = true;
            } else if(e.key == "Left" || e.key == "ArrowLeft"){
                this.leftPressed = true;
            }
        }

        document.onkeyup = e => {
            if(e.key == "Right" || e.key == "ArrowRight"){
                this.rightPressed = false;
            } else if(e.key == "Left" || e.key == "ArrowLeft"){
                this.leftPressed = false;
            }
        }

        document.onmousemove = e => {
            const x = e.clientX
            console.log(canvas.offsetWidth)
            if(x > 0 && x < canvas.width){
                this.x = x - this.w / 2;
            }
        }
    }
    render(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    update(){
        if(this.rightPressed){
            this.x += 7;
            if(this.x + this.w > canvas.width){
                this.x = canvas.width - this.w
            }
        }
        if(this.leftPressed){
            this.x -= 7;
            if(this.x < 0){
                this.x = 0
            }
        }
    }
}

class Ball{
    constructor(x, y, r, dx, dy){
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
    }
    render(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fill();
    }
    update(){
        if(this.x + this.r > canvas.width || this.x < this.r){
            this.dx = -this.dx;
        }
        if(this.y + this.r > canvas.height || this.y < this.r){
            this.dy = -this.dy
        }
        this.x += this.dx;
        this.y += this.dy;
    }
}

class Bricks{
    constructor(rows, columns, w, h, mt, ml, p){
        this.rows = rows;
        this.columns = columns;
        this.w = w;
        this.h = h;
        this.mt = mt;
        this.ml = ml;
        this.p = p;
        this.bricks = [];
        this.color = '#0095DD';
    }
    init(){
        for(let i = 0; i < this.rows; i++){
            this.bricks[i] = [];
            for(let j = 0; j < this.columns; j++){
                this.bricks[i][j] = {x: 0, y: 0, status: true};
            }
        }
    }
    render(){
        this.bricks.map(
            (row, i) => row.map(
                (brick, j) => {
                    if(brick.status){
                        const x = this.ml + (i * (this.w + this.p));
                        const y = this.mt + (j * (this.h + this.p));
                        row[j].x = x;
                        row[j].y = y;
                        ctx.fillStyle = this.color;
                        ctx.fillRect(x, y, this.w, this.h);
                        ctx.fill();
                    }
                    
                }
            )
        )
    }
}

class Game{
    constructor(){
        this.player = new Player();
        this.ball = new Ball(50, 100, 10, 2, 2);
        this.bricks = new Bricks(3, 2, 100, 20, 20, 30, 15)
        this.interval = null;
        this.score = 0;
        this.lives = 3;
        this.isBallOnPlayerX = false;
    }
    init(){
        this.player.init();
        this.bricks.init();
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + this.score, 8, 20);
        ctx.fillText("Lives: " + this.lives, canvas.width-65, 20);
    }
    update(){
        if(this.player.x < this.ball.x && this.player.x + this.player.w > this.ball.x){
            this.isBallOnPlayerX = true;
        } else {
            this.isBallOnPlayerX = false;
        }
        if(!this.isBallOnPlayerX && this.ball.y + this.ball.r > canvas.height){
            this.lives -= 1;
            if(!this.lives){
                clearInterval(this.interval);
            } else {
                this.ball.x = canvas.width / 2;
                this.ball.y = canvas.height - 30;
                this.ball.dx = 2;
                this.ball.dy = -2;
                this.player.x = (canvas.width - this.player.w) / 2
            }
        } else {
            this.player.update();
            this.bricks.bricks.map(
                (row, i) => row.map(
                    (b, j) => {
                        if(b.status){
                            if(this.ball.x > b.x && this.ball.x < b.x + this.bricks.w &&
                                this.ball.y > b.y && this.ball.y < b.y + this.bricks.h){
                                    this.ball.dy = -this.ball.dy;
                                    b.status = false;
                                    this.score++;
                                    if(this.score === this.bricks.rows * this.bricks.columns){
                                        clearInterval(this.interval);
                                    }
                                }
                        }
                    }
                )
            )
            this.ball.update();
        }
        
    }
    render(){
        this.player.render();
        this.ball.render();
        this.bricks.render();
        ctx.fillText("Score: "+this.score, 8, 20);
        ctx.fillText("Lives: " + this.lives, canvas.width-65, 20);
    }
    run(){
        this.interval = setInterval(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            this.update();
            this.render();
        }, 20)
    }
    stop(){
        clearInterval(this.interval);
    }
}

const game = new Game();
game.init();
game.run();
// game.stop()

// const bricks = new Bricks(3, 2, 100, 20, 20, 30, 15)
// bricks.init();
// console.log(bricks.bricks)

// player.init();
// setInterval(() => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     player.update();
//     ball.update();
//     player.render();
//     ball.render();
// })