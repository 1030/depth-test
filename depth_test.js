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

function handleDepthSliderChange(value) {
  depth = value;
}

function handlePositionSliderChange(value) {
  xShift = value;
}
