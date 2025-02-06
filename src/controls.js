import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

export function setupControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  
  // Enable damping for smooth camera movement
  controls.enableDamping = true;
  controls.dampingFactor = 0.25; // Adjust this for slower/faster damping
  controls.screenSpacePanning = false; // Disable panning vertically to keep the camera level
  
  return controls;
}
