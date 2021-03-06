const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width = /*window.innerWidth*/3000;
const height = canvas.height = /*window.innerHeight*/3000;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
function randomRGB(){
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {

    constructor(x, y, velX, velY, color, size) {
       this.x = x;
       this.y = y;
       this.velX = velX;
       this.velY = velY;
       this.color = color;
       this.size = size;
    }

    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        context.fill();
    }

      update() {
        if ((this.x + this.size) >= width) {
           this.velX = -(this.velX);
        }
     
        if ((this.x - this.size) <= 0) {
           this.velX = -(this.velX);
        }
     
        if ((this.y + this.size) >= height) {
           this.velY = -(this.velY);
        }
     
        if ((this.y - this.size) <= 0) {
           this.velY = -(this.velY);
        }
     
        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (const ball of balls) {
           if (!(this === ball)) {
              const dx = this.x - ball.x;
              const dy = this.y - ball.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
     
              if (distance < this.size + ball.size) {
                ball.color = this.color = randomRGB();
              }
           }
        }
     }
}

const balls = [];

while (balls.length < 100) {
   const size = random(10,20);
   const ball = new Ball(
      // ball position always drawn at least one ball width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-7,7),
      random(-7,7),
      randomRGB(),
      size);

  balls.push(ball);
}

function loop() {
    context.fillStyle = 'rgba(0, 0, 0, 0.25)';
    context.fillRect(0, 0, width, height);
 
    for (const ball of balls) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
 
    requestAnimationFrame(loop);
 }

 loop();


    // MAKE CANVAS SCROLL WITH MOUSE PRESSED

 var down=false;
 var scrollLeft=0;
 var scrollTop =0;
 var x = 0;
 var y = 0;
 
 const element = document.getElementById("window");
 const container = document.getElementById("container");

 element.addEventListener('mousedown', function(e) {
    down = true;
    scrollLeft = container.scrollLeft;
    scrollTop = container.scrollTop;
    x = e.clientX;
    y = e.clientY;
});
element.addEventListener('mousemove', function(e) {
    if (down) {
        container.scrollLeft = scrollLeft + x - e.clientX;
        container.scrollTop = scrollTop + y - e.clientY;
    }
});
element.addEventListener('mouseleave', function() {
    down = false;
});
element.addEventListener('mouseup', function() {
    down = false;
});