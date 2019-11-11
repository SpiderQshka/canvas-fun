const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = 400;
const ctx = canvas.getContext('2d');

const gravity = 1;

const getRandomNumberFromTo = (num1, num2) => {
    return num1 + Math.random() * (num2 - num1)
}

class Ball{
    constructor(x, y, r, dx, dy, color, g){
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
        this.g = g;
    }
    render(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }
    update(){
        if(this.y + this.r + this.dy > canvas.height){
            this.dy = -this.dy * .98;
        } else {
            this.dy += this.g;
        }
        if(this.x + this.r + this.dx > canvas.width || this.x - this.r <= 0){
            this.dx = -this.dx;
        }
        this.y += this.dy;
        this.x += this.dx;
    }
}

const ballArray = [];

for(let i = 0; i < 500; i++){
    const r = getRandomNumberFromTo(5, 20);
    const dx = getRandomNumberFromTo(-2, 2);
    const dy = 1;
    const x = getRandomNumberFromTo(r, canvas.width - r);
    const y = getRandomNumberFromTo(0, canvas.height - r);
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    ballArray.push(new Ball(x, y, r, dx, dy, color, gravity))
}

console.log(ballArray)

setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ballArray.forEach(
        ball => {
            ball.update();
            ball.render();
        }
    )
}, 0)