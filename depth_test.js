const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const objectWidth = 50;
const objectHeight = 50;
const minDepth = 0.5;
const maxDepth = 2;
let depth = 1;
let xShift = 0;

// Calculate the number of clones needed to fill the horizontal space
const clones = Math.ceil(canvas.width / objectWidth);

function drawObjects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';

    const baseX = 0;
    const baseY = (canvas.height - objectHeight) / 2 + xShift;
    const w = objectWidth * depth;
    const h = objectHeight * depth;

    for (let i = 0; i < clones; i++) {
        const x = baseX + i * objectWidth;
        ctx.fillRect(x, baseY, w, h);
    }
}

function requestAccess() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation);
                } else {
                    alert('Permission not granted. Motion events will not be accessible.');
                }
            })
            .catch(console.error);
    } else {
        // No need for permission on non-iOS devices
        window.addEventListener('deviceorientation', handleOrientation);
    }
}

function handleOrientation(event) {
    const { alpha, beta, gamma } = event;

    // Map beta (-90 to 90) to depth (minDepth to maxDepth)
    depth = mapRange(beta, -90, 90, minDepth, maxDepth);

    // Map gamma (-180 to 180) to xShift (-canvas.height / 2 to canvas.height / 
