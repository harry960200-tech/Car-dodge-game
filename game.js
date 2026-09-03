const car = document.getElementById("car");
const game = document.getElementById("game");

let carPosition = 45;
let playing = false;
let score = 0;
let obstacleTimer;

function startGame() {
  playing = true;
  score = 0;
  carPosition = 45;

  car.style.left = carPosition + "%";

  document.querySelectorAll(".obstacle, .score, .controls").forEach(e => e.remove());

  const scoreBox = document.createElement("div");
  scoreBox.className = "score";
  scoreBox.innerText = "Score: 0";
  game.appendChild(scoreBox);

  createControls();

  clearInterval(obstacleTimer);
  obstacleTimer = setInterval(createObstacle, 1000);
}

function moveCar(direction) {
  if (!playing) return;

  carPosition += direction * 6;

  if (carPosition < 5) carPosition = 5;
  if (carPosition > 85) carPosition = 85;

  car.style.left = carPosition + "%";
}

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowLeft") moveCar(-1);
  if (event.key === "ArrowRight") moveCar(1);
});

function createObstacle() {
  if (!playing) return;

  const obstacle = document.createElement("div");
  obstacle.className = "obstacle";
  obstacle.innerText = "🚙";

  obstacle.style.left = Math.random() * 80 + 5 + "%";
  obstacle.style.top = "-50px";

  game.appendChild(obstacle);

  let position = -50;

  const fall = setInterval(() => {
    if (!playing) {
      clearInterval(fall);
      obstacle.remove();
      return;
    }

    position += 5;
    obstacle.style.top = position + "px";

    const carRect = car.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
      carRect.left < obstacleRect.right &&
      carRect.right > obstacleRect.left &&
      carRect.top < obstacleRect.bottom &&
      carRect.bottom > obstacleRect.top
    ) {
      gameOver();
      clearInterval(fall);
    }

    if (position > 500) {
      obstacle.remove();
      clearInterval(fall);

      score++;
      const scoreBox = document.querySelector(".score");
      if (scoreBox) scoreBox.innerText = "Score: " + score;
    }
  }, 50);
}

function gameOver() {
  playing = false;
  clearInterval(obstacleTimer);
  alert("Game Over! 🚗💥 Score: " + score);
}

function createControls() {
  const controls = document.createElement("div");
  controls.className = "controls";

  const left = document.createElement("button");
  left.innerText = "⬅️";
  left.onclick = () => moveCar(-1);

  const right = document.createElement("button");
  right.innerText = "➡️";
  right.onclick = () => moveCar(1);

  controls.appendChild(left);
  controls.appendChild(right);
  game.appendChild(controls);
}
