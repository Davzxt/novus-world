// ===============================
// NOVUS WORLD MAKER - VIEWPORT FIX
// ===============================

const canvas = document.getElementById("viewport3d");

// Cena
const scene = new THREE.Scene();

// Skybox antiga (cor sólida estilo Roblox velho)
scene.background = new THREE.Color(0x9ecae8);

// Câmera
const camera = new THREE.PerspectiveCamera(
  60,
  1,
  0.1,
  1000
);

// posição inicial tipo Roblox
camera.position.set(0, 15, 25);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

// Luz ambiente
const ambient = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambient);

// Sol
const sun = new THREE.DirectionalLight(0xffffff, 0.8);
sun.position.set(50, 60, 30);
sun.castShadow = true;
scene.add(sun);

// ===============================
// BASEPLATE COM STUD TEXTURE
// ===============================

const textureLoader = new THREE.TextureLoader();
const studTexture = textureLoader.load("stud.png"); // textura antiga

studTexture.wrapS = studTexture.wrapT = THREE.RepeatWrapping;
studTexture.repeat.set(50, 50);

const baseMaterial = new THREE.MeshStandardMaterial({
  map: studTexture
});

const baseGeometry = new THREE.BoxGeometry(200, 1, 200);
const baseplate = new THREE.Mesh(baseGeometry, baseMaterial);

baseplate.position.y = -0.5;
baseplate.receiveShadow = true;
scene.add(baseplate);

// ===============================
// CONTROLE DE ZOOM (ROBLOX)
// ===============================

let zoom = 25;

canvas.addEventListener("wheel", (e) => {
  zoom += e.deltaY * 0.01;
  zoom = Math.max(8, Math.min(80, zoom));
  camera.position.set(0, zoom * 0.6, zoom);
  camera.lookAt(0, 5, 0);
});

// ===============================
// LOOP
// ===============================

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// ===============================
// RESIZE REAL (SEM JANELINHA)
// ===============================

function resizeViewport() {
  const width = canvas.parentElement.clientWidth;
  const height = canvas.parentElement.clientHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", resizeViewport);
resizeViewport();
