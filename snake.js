const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const blockSize = 10;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let score = 0;
let snake = [{ x: 10, y: 10 }];
let food = {
  x: Math.floor(Math.random() * canvasWidth / blockSize) * blockSize,
  y: Math.floor(Math.random() * canvasHeight / blockSize) * blockSize
};
let direction = "right";

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "green";
    ctx.fillRect(snake[i].x, snake[i].y, blockSize, blockSize);
  }
}

function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, blockSize, blockSize);
}

function moveSnake() {
  let head = { x: snake[0].x, y: snake[0].y };

  if (direction === "right") {
    head.x += blockSize;
  } else if (direction === "left") {
    head.x -= blockSize;
  } else if (direction === "up") {
    head.y -= blockSize;
  } else if (direction === "down") {
    head.y += blockSize;
  }

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    food = {
      x: Math.floor(Math.random() * canvasWidth / blockSize) * blockSize,
      y: Math.floor(Math.random() * canvasHeight / blockSize) * blockSize
    };
  } else {
    snake.pop();
  }

  snake.unshift(head);
}

function checkCollision() {
  let head = snake[0];

  if (
    head.x < 0 ||
    head.x >= canvasWidth ||
    head.y < 0 ||
    head.y >= canvasHeight
  ) {
    clearInterval(gameLoop);
    alert("Game Over!");
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      clearInterval(gameLoop);
      alert("Game Over!");
    }
  }
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 10, 30);
}

function game() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();
  drawScore();
}

let gameLoop = setInterval(game, 100);

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 37 && direction !== "right") {
    direction = "left";
  } else if (event.keyCode === 38 && direction !== "down") {
    direction = "up";
  } else if (event.keyCode === 39 && direction !== "left") {
    direction = "right";
    } else if (event.keyCode === 40 && direction !== "up") {
    direction = "down";
    }
    });