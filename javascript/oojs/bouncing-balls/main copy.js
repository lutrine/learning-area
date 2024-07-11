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
}
