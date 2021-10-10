const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;

let score = 0;

let gamespeed = 2;
let starting = true;

const gradiant = ctx.createLinearGradient(0, 0, 0, 70);
gradiant.addColorStop("0.4", "#fff");
gradiant.addColorStop("0.5", "#000");
gradiant.addColorStop("0.55", "#4040ff");
gradiant.addColorStop("0.6", "#000");
gradiant.addColorStop("0.9", "#fff");

const background = new Image();
background.src = "background.jpg";

const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height
};

function handleBackground() {
  if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
  else BG.x1 -= gamespeed;

  if (BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
  else BG.x2 -= gamespeed;

  const { x1: x, y, width, height, x2 } = BG;

  ctx.drawImage(background, x, y, width, height);
  ctx.drawImage(background, x2, y, width, height);
}
function restart() {
  angle = 0;
  hue = 0;
  frame = 0;
  score = 0;
  gamespeed = 2;
  Obstacle.reset();
  bird.reset();
  animate();
}

function init() {
  ctx.font = "20px Georgia";
  ctx.fillStyle = "black";
  ctx.fillText(
    `Click space bar to flap. Click here to begin`,
    160,
    canvas.height / 2
  );
}
async function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBackground();
  handleObstacles();
  handleParticles();
  bird.update();
  bird.draw();
  ctx.fillStyle = gradiant;
  ctx.font = "90px Georgia";
  ctx.strokeText(score, 450, 70);
  ctx.fillText(score, 450, 70);
  handleCollisions();
  if (handleCollisions()) {
    postSave();
    return;
  }
  requestAnimationFrame(animate);
  angle += 0.12;
  hue++;
  frame++;
}
init();

canvas.addEventListener("click", e => {
  if (handleCollisions()) {
    restart();
  }
  if (starting) {
    starting = false;
    animate();
  }
});
window.addEventListener("keydown", e => {
  if (e.code === "Space") spacePressed = true;
});

window.addEventListener("keyup", e => {
  if (e.code === "Space") spacePressed = false;
  bird.frameX = 0;
});

const bang = new Image();
bang.src = "bang.png";

function handleCollisions() {
  for (let i = 0; i < obstaclesArray.length; i++) {
    let o = obstaclesArray[i];
    if (
      bird.x < o.x + o.width &&
      bird.x + bird.width > o.x &&
      ((bird.y < 0 + o.top && bird.y + bird.height > 0) ||
        (bird.y > canvas.height - o.bottom &&
          bird.y + bird.height < canvas.height))
    ) {
      ctx.drawImage(bang, bird.x, bird.y, 50, 50);
      ctx.font = "20px Georgia";
      ctx.fillStyle = "white";
      ctx.fillText(
        `Game over! your score is: ${score}. Click to restart.`,
        160,
        canvas.height / 2
      );
      return true;
    }
  }
}
