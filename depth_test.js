const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const objectWidth = 50;
const objectHeight = 50;
const minDepth = 0.5;
const maxDepth = 2;
let depth = 1;
let yShift = 0;

function drawObject() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';

  const x = (canvas.width - objectWidth) / 2;
  const y = (canvas.height - objectHeight) / 2 + yShift;
  const w = objectWidth * depth;
  const h = objectHeight * depth;

  ctx.fillRect(x, y, w, h);
}

function handleTilt(event) {
  const beta = event.beta;
  const gamma = event.gamma;

  // Map the tilt angle (beta) to the depth range
  depth = ((beta + 90) % 180 - 90) / 180 * (maxDepth - minDepth) + minDepth;

  // Clamp depth value between minDepth and maxDepth
  depth = Math.max(minDepth, Math.min(maxDepth, depth));

  // Calculate yShift based on the gamma angle
  yShift = -gamma * (canvas.height / 180);

  drawObject();
}

window.addEventListener('deviceorientation', handleTilt, true);
drawObject();
