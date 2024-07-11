// setup canvas

// select the `<canvas>` element and store it in a variable with the same name
const canvas = document.querySelector("canvas");
// use `getContext()` to specify the canvas's medium — in this case, it's 2d
const ctx = canvas.getContext("2d");

// set the width and the height of the canvas equal to the browser's width and height
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
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
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
  update() {
    // checks whether the ball has reached the of the canvas
    // if it does, then it reverses the velocity to make it travel in the opposite direction
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }
    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }
    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    // moves the coordinates of the ball by adding the corresponding velocities
    this.x += this.velX;
    this.y += this.velY;
  }
  collisionDetect() {
    // loop through each ball
    for (const ball of balls) {
      // check whether the current ball being looped through is the same as the
      // one we're currently checking
      if (this !== ball) {
        const dx = this.x - ball.x; // difference between x coords
        const dy = this.y - ball.y; // difference between y coords
        const distance = Math.sqrt(dx * dx + dy * dy); // distance formula

        // if a collision is detected between the balls, then set them both to a random color
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// put the animations here

const balls = [];

while (balls.length < 25) {
  const size = random(10, 20); // RNG for ball size
  const ball = new Ball( // create ball using random values
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball); // push ball onto balls array
}

function loop() {
  // sets the background to semi-transparent black
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  // draws and updates the position of the ball
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  // create continuous animation loop
  requestAnimationFrame(loop);
}

loop();
