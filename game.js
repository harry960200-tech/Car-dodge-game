const car = document.getElementById("car");
const game = document.getElementById("game");

let carPosition = 45;
let playing = false;

function startGame() {
  playing = true;
  carPosition = 45;
  car.style.left = carPosition + "%";
  alert("Game Started! 🚗💨");
}

document.addEventListener("keydown", function(event) {
  if (!playing) return;

  if (event.key === "ArrowLeft") {
    carPosition -= 5;
  }

  if (event.key === "ArrowRight") {
    carPosition += 5;
  }

  if (carPosition < 5) carPosition = 5;
  if (carPosition > 85) carPosition = 85;

  car.style.left = carPosition + "%";
});
