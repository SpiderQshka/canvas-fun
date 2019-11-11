const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const mouse = {}

window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

class Circle{
    constructor(x, y, dx, dy){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.r = Math.random() * 5 + 5;
        this.maxSize = 40;
        this.minSize = this.r;
        this.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    }
    render(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(){
        if(this.x + this.r > canvas.width || this.x - this.r < 0){
            this.dx = - this.dx;
        }
        if(this.y + this.r > canvas.height || this.y - this.r < 0){
            this.dy = - this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // ________________________

        if(mouse.x - this.x < this.r + 50 && mouse.x - this.x > -(this.r + 50) && 
            mouse.y - this.y < this.r + 50 && mouse.y - this.y > -(this.r + 50) &&
            this.r < this.maxSize){
            this.r += 1;
        } else if(this.r > this.minSize){
            this.r -= 1;
        }
    }
}

const circles = [];

for(let i = 0; i < 800; i++){
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const dx = (Math.random() - .5) * 1;
    const dy = (Math.random() - .5) * 1;
    circles.push(new Circle(x, y, dx, dy))
}

setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    circles.forEach(
    circle => {
        circle.update();
        circle.render();
        }
    )
}, 1)