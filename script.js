console.log("Hello World");

const canvas = document.getElementById("canvas");
const numBalls = 70;
let c = canvas.getContext("2d");
let tx = canvas.width;
let ty = canvas.height;
let wx = window.innerWidth;
let wy = window.innerHeight;
let mouseX, mouseY;
let difX = wx-tx;
let difY = wy-ty;
console.log(difX/2);

document.addEventListener('mousemove', (event) => {
	mouseX=event.clientX;
    mouseY = event.clientY;
});

var grav = 0.99;
function randomColor() {
  return (
    "rgba(" +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.ceil(Math.random() * 10) / 10 +
    ")"
  );
}

function Ball(){
    this.color = randomColor();
    this.radius = Math.random() * 20 + 14;
    this.startR=this.radius;
    this.x = Math.random() * (tx - this.radius * 2) + this.radius;
    this.y = Math.random() * (ty - this.radius * 2) + this.radius;
    this.angle = Math.floor(Math.random() * (150 -30) + 30);
    this.vel = Math.random() * (10-1) +1;
    this.dirX = Math.cos(Math.PI / 180 * this.angle) * this.vel;
    this.dirY = Math.sin(Math.PI / 180 * this.angle) * this.vel;
    this.update = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
    }
}


let ballArray = [];
for(let i = 0; i<numBalls; i++ ){
    ballArray.push(new Ball())
}

let ball = ballArray[0];
ball.color = "black";
console.log({ball});

const animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, tx, ty);
    for(let i = 0; i<numBalls; i++){
        ballArray[i].update();
        if(ballArray[i].x+ballArray[i].radius >= tx || ballArray[i].x  - ballArray[i].radius<0){
            ballArray[i].dirX = -ballArray[i].dirX;
        }
        if(ballArray[i].y+ballArray[i].radius >= ty || ballArray[i].y  - ballArray[i].radius<0){
            ballArray[i].dirY = -ballArray[i].dirY;
        }
        
        ballArray[i].x +=ballArray[i].dirX;
        ballArray[i].y += ballArray[i].dirY;
        if(Math.abs(mouseX-difX/2-ballArray[i].x)<ballArray[i].radius && 
            Math.abs(mouseY-difY/2-ballArray[i].y)<ballArray[i].radius){
                if(ballArray[i].radius<50){
                    console.log(mouseX);
                    console.log(ballArray[i].x);
                    ballArray[i].radius+=5;
                }
        }
        else {
            if(ballArray[i].radius>ballArray[i].startR){
                ballArray[i].radius=ballArray[i].startR;
            }
        }
        
    }
    

    
    
}

animate();


