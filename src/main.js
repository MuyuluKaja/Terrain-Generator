<<<<<<< HEAD
  import * as THREE from 'three';
  // Controls
  import { setupControls } from './controls.js';  // Import the controls

  // Importing Noise Algorithms
  import { PerlinNoise } from './noise/perlin.js';
  import { SimplexNoise } from './noise/simplex.js';
  import { addProceduralSky } from './sky.js';
  import { applyTexturesToTerrain } from './loadtextures.js';
  import { terrainMaterial } from './loadtextures.js'
  import * as dat from 'dat.gui'; 

  // Instantiating noise algorithms
  const perlin = new PerlinNoise();
  const simplex = new SimplexNoise(22);
=======
import * as dat from 'dat.gui'; 
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { makeControls, makeButtons } from './controls.js';
import { addSky } from './sky.js';
import { addTextures, makeMaterial } from './loadtextures.js';
// instantiating noise algorithms
import { PerlinNoise } from './noise/perlin.js';
import { SimplexNoise } from './noise/simplex.js';

//new scene to display the program
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.set(165, 160, 165);
camera.lookAt(0,0,0);
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement ); 

// this will handle the resizing of the window
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
>>>>>>> 31bef91 (Fixed controls, added new textures, added settomhs for biomes , reorganised code)

// sets up the makeControls which just moves the camera around
const camera_controls = makeControls(camera, renderer)

<<<<<<< HEAD
  // Create WebGL Renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  addProceduralSky(scene);


// Set up OrbitControls for camera movement
const controls = setupControls(camera, renderer);

// Handle window resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
  
  // Terrin params defines
  const params = {
    noiseType: 'perlin',
    frequency: 0.1,
    amplitude: 5,
    segments: 50,
    terrainWidth: 200,   // Initial terrain width
    terrainHeight: 200,  // Initial terrain height
    regenerate: function() {
        generateTerrain(params.noiseType, params.frequency, params.amplitude, params.segments, params.terrainWidth, params.terrainHeight);
    }
  };

  // creating terrain
  let terrain;







  // Adding a directional light to simulating the sun
  const sunLight = new THREE.DirectionalLight(0xffffff, 1);
  sunLight.position.set(100, 100, 100).normalize();
  scene.add(sunLight);

  // Adding ambient light for dimmer light
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);  // Soft, ambient light
  scene.add(ambientLight);



  // Function to Apply Perlin Noise to the Terrain

  function applyPerlinNoise(geometry, scale = 0.1, amplitude = 5) {
    const perlin = new PerlinNoise();

    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        const z = vertices[i + 2];

        const noiseValue = perlin.noise(x * scale, y * scale, z * scale);

        vertices[i + 2] += noiseValue * amplitude;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();

    const material = terrainMaterial;
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
=======
// terrain parameters, changed later by user
const terrain_parameters = {
    width: 1000,
    height: undefined,
    noise_type: 'perlin',
    frequency: 0.0139,
    max_height: 30,
    segments: 1000,
    wireframe: false, // added setting for wireframe for clear segment view
    biome: 'snow',
    regenerate: function() { 
      generateTerrain(terrain_parameters.width, terrain_parameters.height, terrain_parameters.noise_type, terrain_parameters.frequency, terrain_parameters.max_height, terrain_parameters.segments, terrain_parameters.wireframe, terrain_parameters.biome); 
  terrain_parameters.height = terrain_parameters.width;
>>>>>>> 31bef91 (Fixed controls, added new textures, added settomhs for biomes , reorganised code)
  }
}

export {terrain_parameters}


/* creates the gui then make the different types of control buttons using dat.gui */
makeButtons(); 



// uses the different parameters the terrain will input and also a terrain 
let terrain;
let terrain_material = makeMaterial(terrain_parameters.wireframe, terrain_parameters.biome);
function generateTerrain(width, height, noise_type, frequency, max_height, segments, wireframe ,biome){
    if (terrain) {
        terrain.geometry.dispose(); 
        scene.remove(terrain);
    }
    // generaes a new geometry based on user choices
    const geometry = new THREE.PlaneGeometry(width, height, segments, segments); // segments repeated twice so that the x segments are equal to the y segments for consistency
    switch (noise_type){
        case 'perlin':
            terrain = addPerlinNoise(geometry, frequency, max_height);
            break;
        case 'simplex':
            terrain = addSimplexNoise(geometry, frequency, max_height);
            break;
        default:
            terrain = addPerlinNoise(geometry, frequency, max_height);
            return;
    }
    terrain_material = makeMaterial(wireframe, biome);
    terrain = new THREE.Mesh(geometry, terrain_material);
    
    terrain.rotation.x = -Math.PI / 2; // rotates terrain so it's horizontal
    scene.add(terrain);
    addTextures(geometry, terrain_material);
}


<<<<<<< HEAD
    
=======
/*  create the two main noise functions which are simplex and perlin noise */
>>>>>>> 31bef91 (Fixed controls, added new textures, added settomhs for biomes , reorganised code)

// perlin noise function
function addPerlinNoise(geometry, scale = 0.1, max_height = 5) {
  const perlin = new PerlinNoise();

<<<<<<< HEAD
generateTerrain(params.noiseType, params.frequency, params.amplitude, params.segments, params.terrainWidth, params.terrainHeight); // Pass width and height



  // Renders Scene
  function animate() {
    requestAnimationFrame(animate);
    // generateTerrain(params.noiseType, params.frequency, params.amplitude, params.segments, params.terrainWidth, params.terrainHeight); // Pass width and height
    controls.update();

    // Update objects here
    terrain.rotation.z += 0.0001; // Rotate around the Y-axis (adjust speed as needed)

    renderer.render(scene, camera);
    
=======
  const vertices = geometry.attributes.position.array;
  for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = vertices[i + 2];
      let noise_value = perlin.ridgeNoise(x * scale, y * scale, z * scale);
      noise_value = Math.pow(noise_value, 1.5 ) // to smooth the terrain
      vertices[i + 2] += noise_value * max_height;
>>>>>>> 31bef91 (Fixed controls, added new textures, added settomhs for biomes , reorganised code)
  }

  geometry.attributes.position.needsUpdate = true;
  geometry.computeVertexNormals();

  const material = makeMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}


// simplex function
function addSimplexNoise(geometry, scale = 0.1, max_height = 5) { 
  const simplex = new SimplexNoise();

  const vertices = geometry.attributes.position.array;
  for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = vertices[i + 2];
      const noise_value = simplex.noise(x * scale, y * scale, z * scale);
      vertices[i + 2] += noise_value * max_height;
  }
  geometry.attributes.position.needsUpdate = true;
  geometry.computeVertexNormals();
  const material = makeMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

// generates the initial terrain now, makes sure height and with is the same
terrain_parameters.height = terrain_parameters.width;
generateTerrain(terrain_parameters.width, terrain_parameters.height, terrain_parameters.noise_type, terrain_parameters.frequency, terrain_parameters.max_height, terrain_parameters.segments, terrain_parameters.wireframe, terrain_parameters.biome);

/* Handling Lighting stuff and also the sky */
const sun_light = new THREE.DirectionalLight(0xffffff, 1);
sun_light.position.set(100, 100, 100).normalize();
scene.add(sun_light);
const ambient_light = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambient_light);
addSky(scene);



// Animate function that renders the scene
function animate() {
    requestAnimationFrame(animate);
    // generateTerrain(terrain_parameters.width, terrain_parameters.height, terrain_parameters.noise_type, terrain_parameters.frequency, terrain_parameters.max_height, terrain_parameters.segments, terrain_parameters.wireframe);
    camera_controls.update();
    terrain.rotation.z += 0.0001; 
    renderer.render(scene, camera);
}




animate();