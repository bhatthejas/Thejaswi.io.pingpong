const canvas = document.getElementById("pingPongCanvas");
const ctx = canvas.getContext("2d");

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
const ballRadius = 10;
let ballSpeedX = 5;
let ballSpeedY = 5;

let paddleWidth = 10;
let paddleHeight = 100;
let playerPaddleY = (canvas.height - paddleHeight) / 2;
let computerPaddleY = (canvas.height - paddleHeight) / 2;

let playerScore = 0;
let computerScore = 0;

const winningScore = 5;

canvas.addEventListener("mousemove", (event) => {
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;
  playerPaddleY = mouseY - paddleHeight / 2;
});

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX; 
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function drawPaddles() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, playerPaddleY, paddleWidth, paddleHeight);

  ctx.fillStyle = "white";
  ctx.fillRect(canvas.width - paddleWidth, computerPaddleY, paddleWidth, paddleHeight);
}

function moveComputerPaddle() {
  const computerPaddleCenter = computerPaddleY + paddleHeight / 2;
  if (computerPaddleCenter < ballY - 35) {
    computerPaddleY += 5;
  } else if (computerPaddleCenter > ballY + 35) {
    computerPaddleY -= 5;
  }
}

function update() {
  moveComputerPaddle();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  if (
    ballX - ballRadius < paddleWidth &&
    ballY > playerPaddleY &&
    ballY < playerPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
    ballSpeedX *= 1.1;
    ballSpeedY *= 1.1;
  }

  if (
    ballX + ballRadius > canvas.width - paddleWidth &&
    ballY > computerPaddleY &&
    ballY < computerPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
    ballSpeedX *= 1.1;
    ballSpeedY *= 1.1;
  }

  if (ballX - ballRadius < 0) {
    computerScore++;
    if (computerScore === winningScore) {
      alert("Computer wins!");
      document.location.reload();
    }
    resetBall();
  }

  if (ballX + ballRadius > canvas.width) {
    playerScore++;
    if (playerScore === winningScore) {
      alert("Player wins!");
      document.location.reload();
    }
    resetBall();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddles();

  ctx.fillText("Player: " + playerScore, 100, 50);
  ctx.fillText("Computer: " + computerScore, canvas.width - 200, 50);
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();