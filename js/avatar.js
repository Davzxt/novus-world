let scene, camera, renderer, controls, avatar;

init();
loadAvatar();
animate();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcfd3d6);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 3, 6);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth - 260, window.innerHeight - 65);
  document.getElementById("viewport").appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.target.set(0, 2, 0);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 5);
  scene.add(light);

  const amb = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(amb);

  window.addEventListener("resize", onResize);
}

function loadAvatar() {
  const loader = new THREE.GLTFLoader();
  loader.load("model/r6_rigged.glb", gltf => {
    avatar = gltf.scene;
    avatar.scale.set(1.5, 1.5, 1.5);
    scene.add(avatar);
  });
}

function setSkin(color) {
  if (!avatar) return;

  avatar.traverse(obj => {
    if (obj.isMesh) {
      obj.material.color.set(color);
    }
  });
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function onResize() {
  camera.aspect = (window.innerWidth - 260) / (window.innerHeight - 65);
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth - 260, window.innerHeight - 65);
}

function goProfile() {
  window.location.href = "home.html";
}
