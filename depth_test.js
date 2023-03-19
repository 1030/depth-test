let scene, camera, renderer;
let geometry, material, mesh;
let clones = 5;
let depth = 1;
let xShift = 0;

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    for (let i = 0; i < clones; i++) {
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = i * 2;
        scene.add(mesh);
    }

    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);

    for (let i = 0; i < clones; i++) {
        const obj = scene.children[i];
        obj.position.x = i * 2 + xShift;
        obj.scale.set(depth, depth, depth);
    }

    renderer.render(scene, camera);
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

    // Map beta (-90 to 90) to depth (0.5 to 2)
    depth = mapRange(beta, -90, 90, 0.5, 2);

    // Map gamma (-180 to 180) to xShift (-2 to 2)
    xShift = mapRange(gamma, -180, 180, -2, 2);
}

function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
