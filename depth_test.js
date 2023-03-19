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
let clones = 5;

function drawObjects() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'blue';

  const baseX = (canvas.width - objectWidth * clones) / 2;
  const baseY = (canvas.height - objectHeight) / 2 + yShift;
  const w = objectWidth * depth;
  const h = objectHeight * depth;

  for (let i = 0; i < clones; i++) {
    const x = baseX + i * objectWidth;
    ctx.fillRect(x, baseY, w, h);
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

  drawObjects();
}

function handleMotion(event) {
  const alpha = event.rotationRate.alpha;
  const beta = event.rotationRate.beta;
  const gamma = event.rotationRate.gamma;

  if (alpha !== null && beta !== null && gamma !== null) {
    window.removeEventListener('devicemotion', handleMotion);
    window.addEventListener('deviceorientation', handleTilt, true);
  }
}

async function requestAccess() {
  try {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      const motionPermission = await DeviceMotionEvent.requestPermission();
      if (motionPermission === 'granted') {
        window.addEventListener('devicemotion', handleMotion, true);
      } else {
        alert('Permission not granted. Motion events will not be accessible.');
      }
    } else {
      window.addEventListener('devicemotion', handleMotion, true);
    }

    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      const orientationPermission = await DeviceOrientationEvent.requestPermission();
      if (orientationPermission === 'granted') {
        window.addEventListener('deviceorientation', handleTilt, true);
      } else {
        alert('Permission not granted. Orientation events will not be accessible.');
      }
    } else {
      window.addEventListener('deviceorientation', handleTilt, true);
    }
    
    document.getElementById('requestButton').style.display = 'none';
  } catch (error) {
    console.error('Error requesting permissions:', error);
    alert('Error requesting permissions. Please try again.');
  }
}

drawObjects();

