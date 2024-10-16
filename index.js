const canvas = document.getElementById("canvas");
const xDistUI = document.getElementById("distX");
const yDistUI = document.getElementById("distY");
const xyDistance = document.getElementById("distance");
const ballStatus = document.getElementById("status");
const width = window.innerWidth - 50;
const height = window.innerHeight - 50;
canvas.height = height;
canvas.width = width;
const ctx = canvas.getContext('2d');
const maxSpeed = 2;
const maxSize = 20;
const colorChangeSpeed = 0.1;
let hslValue = 0;
const radiChangeSpeed = 0.5;


const ballCollection = [];
const maxBallNumber = 20;
const randomPosX = () => {
    return Math.random() * width + 5;
};
const randomPosY = () => {
    return Math.random() * height + 5;
};
const randomVelX = () => {
    return Math.random() * maxSpeed + 5; 
};
const randomVelY = () => {
    return Math.random() * maxSpeed + 5;
};
const randomColor = () => {''
    hslValue += colorChangeSpeed;
    return `hsl(${hslValue}, 100%, 50%)`
};
const randomStartRadius = () => {
    return Math.random() * maxSize + 5;
};



class Ball {
    constructor (posX, posY, velX, velY, color, radius, radi) {
        this.posX = posX;
        this.posY = posY;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.radius = radius;
        this.radi = radi;
    }

    draw_ball () {
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move_ball () {
        this.posX += this.velX;
        this.posY += this.velY;
        if (this.posX + this.radius > width){
            this.velX *= -1;
        };
        if (this.posX - this.radius < 0){
            this.velX *= -1;
        }
        if (this.posY + this.radius > height){
            this.velY *= -1;
        };
        if (this.posY - this.radius < 0){
            this.velY *= -1;
        }
        
        if (this.posX + this.radius > width){
            this.posX = width - this.radius;
        };
        if (this.posX - this.radius < 0){
            this.posX = this.radius;
        }
        if (this.posY + this.radius > height){
            this.posY = height - this.radius;
        };
        if (this.posY - this.radius < 0){
            this.posY = this.radius;
        }
    }

    inc_dec_ball () {
        this.radius += this.radi;
        if (this.radius > maxSize + 10){
            this.radi *= -1;
        }
        if (this.radius <= maxSize - 10){
            this.radi *= -1;
        }
    }

    collisionDetection (otherBall) {
        const dx = otherBall.posX - this.posX;
        const dy = otherBall.posY - this.posY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < otherBall.radius + this.radius){
            otherBall.velX *= 1;
            otherBall.velY *= -1;
            this.velX *= -1;
            this.velY *= 1;
        }
    }
};

for (let i = 0; i < maxBallNumber; i++){
    ballCollection.push(new Ball(randomPosX(), randomPosY(), randomVelX(), randomVelY(), randomColor(), randomStartRadius(), radiChangeSpeed));
};


// create animation frame function
function animationFrame () {
    requestAnimationFrame(animationFrame);

    ctx.fillStyle = '#00000009';
    ctx.fillRect(0, 0, width, height);
    ctx.fill();
    for (let i = 0; i < ballCollection.length; i++){
        ballCollection[i].draw_ball();
        ballCollection[i].move_ball();
        ballCollection[i].inc_dec_ball();
        ballCollection[i].color = randomColor();
        
        for (let n = 0; n < ballCollection.length; n++){
            if (i !== n){
                // ballCollection[i].collisionDetection(ballCollection[n]);
            }
        }
    }
};

animationFrame();