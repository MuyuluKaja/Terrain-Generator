import * as THREE from 'three';

//Defining objects for renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// Plane Geometry
const width = 100;
const height = 100;
const widthSegments = 100; 
const heightSegments = 100;

// Creating the plane
const planeGeometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0x88cc88,
  wireframe: false,
  flatShading: true,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

// adding plane to scene
plane.rotation.x = -Math.PI / 2;
scene.add(plane);


camera.position.z = 5;

// Renders Scene
function animate() {
  requestAnimationFrame(animate);
  // Update objects here
  plane.rotation

  renderer.render(scene, camera);
  plane.rotation.z += 0.01;
}

// Checks if WebGL is available
import WebGL from 'three/addons/capabilities/WebGL.js';

if ( WebGL.isWebGL2Available() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}