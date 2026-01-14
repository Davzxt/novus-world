// ===================================
// NOVUS WORLD MAKER - VIEWPORT FINAL
// ===================================

const canvas = document.getElementById("viewport3d");

// ---------- SCENE ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9ecae8); // céu antigo

// ---------- CAMERA ----------
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);

// ---------- RENDERER ----------
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: false
});
renderer.setClearColor(0x9ecae8, 1);
renderer.shadowMap.enabled = true;

// ---------- LIGHT ----------
scene.add(new THREE.AmbientLight(0xffffff, 0.7));

const sun = new THREE.DirectionalLight(0xffffff, 0.8);
sun.position.set(50, 80, 50);
sun.castShadow = true;
scene.add(sun);

// ---------- BASEPLATE ----------
const studTex = new THREE.TextureLoader().load("stud.png");
studTex.wrapS = studTex.wrapT = THREE.RepeatWrapping;
studTex.repeat.set(50, 50);

const baseplate = new THREE.Mesh(
  new THREE.BoxGeometry(200, 1, 200),
  new THREE.MeshStandardMaterial({ map: studTex })
);
baseplate.position.y = -0.5;
baseplate.receiveShadow = true;
scene.add(baseplate);

// ---------- PLAYER ----------
let player = null;
let velocityY = 0;
let onGround = false;
let playMode = false;

const loader = new THREE.GLTFLoader();

function spawnPlayer() {
  if (player) return;

  loader.load("r6_rigged.glb", (gltf) => {
    player = gltf.scene;
    player.position.set(0, 3, 0);

    player.traverse(obj => {
      if (obj.isMesh) obj.castShadow = true;
    });

    scene.add(player);
  });
}

function removePlayer() {
  if (!player) return;
  scene.remove(player);
  player = null;
}

// ---------- INPUT ----------
const keys = {};
window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

// ---------- CAMERA CONTROL ----------
let camDistance = 18;
let firstPerson = false;

canvas.addEventListener("wheel", e => {
  camDistance += e.deltaY * 0.01;
  camDistance = Math.max(0, Math.min(40, camDistance));
});

// ---------- PLAY / STOP ----------
window.startPlay = function () {
  playMode = true;
  spawnPlayer();
};

window.stopPlay = function () {
  playMode = false;
  removePlayer();
};

// ---------- LOOP ----------
function animate() {
  requestAnimationFrame(animate);

  if (playMode && player) {
    const speed = 0.25;

    if (keys["w"]) player.position.z -= speed;
    if (keys["s"]) player.position.z += speed;
    if (keys["a"]) player.position.x -= speed;
    if (keys["d"]) player.position.x += speed;

    if (keys[" "] && onGround) {
      velocityY = 0.5;
      onGround = false;
    }

    velocityY -= 0.03;
    player.position.y += velocityY;

    if (player.position.y <= 3) {
      player.position.y = 3;
      velocityY = 0;
      onGround = true;
    }

    // ---- CAMERA MODE ----
    if (camDistance <= 1.5) {
      firstPerson = true;
    } else {
      firstPerson = false;
    }

    if (firstPerson) {
      // Primeira pessoa
      player.visible = false;

      camera.position.set(
        player.position.x,
        player.position.y + 2,
        player.position.z
      );
      camera.lookAt(
        player.position.x,
        player.position.y + 2,
        player.position.z - 1
      );
    } else {
      // Terceira pessoa
      player.visible = true;

      camera.position.set(
        player.position.x,
        player.position.y + camDistance * 0.6,
        player.position.z + camDistance
      );
      camera.lookAt(player.position);
    }
  }

  renderer.render(scene, camera);
}

animate();

// ---------- RESIZE ----------
function resize() {
  const w = canvas.parentElement.clientWidth;
  const h = canvas.parentElement.clientHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize);
resize();
