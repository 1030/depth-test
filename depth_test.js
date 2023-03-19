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

// Calculate the number of clones needed to fill the horizontal space
const clones = Math.ceil(canvas.height / objectHeight);

function drawObjects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';

    const baseX = (canvas.width - objectWidth) / 2 + yShift;
    const baseY = 0;
    const w = objectWidth * depth;
    const h = objectHeight * depth;

    for (let i = 0; i < clones; i++) {
        const y = baseY + i * objectHeight;
        ctx.fillRect(baseX, y, w, h);
    }
}

// Rest of the code remains the same



function drawReferenceDots() {
  const dotSize = 5;
  const dotSpacing = 50;

  ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';

  for (let y = dotSpacing; y < canvas.height; y += dotSpacing) {
    for (let x = dotSpacing; x < canvas.width; x += dotSpacing) {
      ctx.beginPath();
      ctx.arc(x, y, dotSize, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
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

  drawReferenceDots();
  drawObjects();
}

// Rest of the code remains the same
