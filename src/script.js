import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * Three essential elements
 */
// Canvas
const canvas = document.querySelector("#webgl");

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Start particles
 */

// Add Particles ( Dots )
const count = 600; // small dot amounts   7000
const particlesGeometry = new THREE.BufferGeometry();
const positionArray = new Float32Array(count *3);

for(let i=0; i < count * 3; i++){
  positionArray[i] = (Math.random()-0.5)*15;
}

particlesGeometry.setAttribute(
  "position", new THREE.BufferAttribute(positionArray, 3)
);

const particlesMateiral = new THREE.PointsMaterial({
  size: 0.05, // Dot size    0.01
  color: "#7df9ff", // Dot color  #7df9ff
});

const particles = new THREE.Points(particlesGeometry, particlesMateiral);

scene.add(particles);  // Add things in scene


// Camera control setting ( Mouse operation setting )
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableRotate = false; /* マウスで回すの禁止 */

/**
 * Animation
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Camera work ( Roating motion )
  camera.position.x = Math.cos(elapsedTime *0.5)*6;
  camera.position.z = Math.sin(elapsedTime *0.5)*6;

  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

//Browser resize setting
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
