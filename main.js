import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls( camera, renderer.domElement );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
camera.position.set( 0, 10, 10 );
controls.update();

const girdhelper = new THREE.GridHelper(30,30);
scene.add(girdhelper);


const tableTopGeometry = new THREE.PlaneGeometry(15,20); // width, height, depth
const tableTopMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513,
    side: THREE.DoubleSide
});
const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
tableTop.rotation.x = -0.5 * Math.PI;
scene.add(tableTop);

const padle1G = new THREE.BoxGeometry(4,1,1);
const  padle1M = new THREE.MeshBasicMaterial({color: 0xff0004})
const padle1 = new THREE.Mesh(padle1G, padle1M);
scene.add(padle1);

const padle2G = new THREE.BoxGeometry(4,1,1);
const  padle2M = new THREE.MeshBasicMaterial({color: 0x001eff})
const padle2 = new THREE.Mesh(padle2G, padle2M);
scene.add(padle2);
camera.position.z = 15;

const geometry = new THREE.SphereGeometry(1, 35, 35); 
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false });

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

sphere.scale.set(0.5, 0.5, 0.5);

padle1.position.set(0.5, 0.5, 10);
padle2.position.set(0.5, 0.5, -10);
sphere.position.set(0.5, 0.5, 0);

let speed = 0.05; // Speed of the sphere
let direction = -1; // -1 means downward, 1 means upward

// Function to check collision between the sphere and box
function checkCollision() {
  // Create bounding boxes for the box and the sphere
  const boxBB = new THREE.Box3().setFromObject(padle2);
  const sphereBB = new THREE.Box3().setFromObject(sphere);

  // Check for intersection
  return boxBB.intersectsBox(sphereBB);
}

function handleKeyDown(event) {
	switch (event.key) {
	  case 'd': 
		padle2.position.x += 0.1;
		break;
	  case 'a':
		padle2.position.x -= 0.1;
		break;
	  case 'ArrowLeft': 
		padle1.position.x -= 0.1;
		break;
	  case 'ArrowRight':
		padle1.position.x += 0.1;
		break;
	}
  }
  
  window.addEventListener('keydown', handleKeyDown);

function animate() {
	requestAnimationFrame(animate);

  // Move the sphere along the Y-axis
  sphere.position.z += speed * direction;

  // Check if the sphere touches the box (collision)
  if (checkCollision()) {
    direction = 1; // Change direction to upward (bounce)
  }

  // If the sphere moves above a certain point, reverse direction again
  if (sphere.position.z > 2) {
    direction = -1; // Move downward again
  }

	console.log(sphere.position.z);

	renderer.render( scene, camera );
}

