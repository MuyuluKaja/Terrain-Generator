import * as THREE from 'three';
import { makeControls, makeButtons } from './controls.js';
import { addSky } from './sky.js';
import { addTextures, makeMaterial } from './loadtextures.js';
// instantiating noise algorithms
import { PerlinNoise } from './noise/perlin.js';
import { SimplexNoise } from './noise/simplex.js';
import Stats from "stats.js";

//initialising stats to show fps
const stats = new Stats();
stats.showPanel(0); // 0: FPS, 1: ms, 2: memory, 3+: custom
document.body.appendChild(stats.dom);


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

// sets up the makeControls which just moves the camera around
const camera_controls = makeControls(camera, renderer)

// terrain parameters, changed later by user
const terrain_parameters = {
    width: 1000,
    height: 1000,
    noise_type: 'ridge',
    frequency: 0.0139,
    max_height: 30,
    segments: 1000,
    wireframe: false, // added setting for wireframe for clear segment view
    biome: 'snow',
    regenerate: function() { 
      generateTerrain(terrain_parameters.width, terrain_parameters.height, terrain_parameters.noise_type, terrain_parameters.frequency, terrain_parameters.max_height, terrain_parameters.segments, terrain_parameters.wireframe, terrain_parameters.biome); 
  //terrain_parameters.height = terrain_parameters.width;
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
        case 'ridge':
            terrain = perlinRidgeNoise(geometry, frequency, max_height);
            break;
        case 'fractal':
            terrain = perlinFractalNoise(geometry, frequency, max_height);
            break; 
        case 'simplex':
            terrain = addSimplexNoise(geometry, frequency, max_height);
            break;
        default:
            terrain = perlinRidgeNoise(geometry, frequency, max_height);
            return;
    }
    terrain_material = makeMaterial(wireframe, biome);
    terrain = new THREE.Mesh(geometry, terrain_material);
    
    terrain.rotation.x = -Math.PI / 2; // rotates terrain so it's horizontal
    scene.add(terrain);
    addTextures(geometry, terrain_material);
}


/*  create the two main noise functions which are simplex and perlin noise */

// perlin ridge noise function
function perlinRidgeNoise(geometry, scale = 0.1, max_height = 5) {
  const perlin = new PerlinNoise();

  const vertices = geometry.attributes.position.array;
  for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = vertices[i + 2];
      let noise_value = perlin.ridgeNoise(x * scale, y * scale, z * scale);
      noise_value = Math.pow(noise_value, 1.5 ) // to smooth the terrain
      vertices[i + 2] += noise_value * max_height;
      // console.log(noise_value)
  }

  geometry.attributes.position.needsUpdate = true;
  geometry.computeVertexNormals();
  const material = makeMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;

}

function perlinFractalNoise(geometry, scale = 0.1, max_height = 5) {
    const perlin = new PerlinNoise();
  
    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        const z = vertices[i + 2];
        let noise_value = perlin.fractalNoise(x * scale, y * scale, z * scale);
        noise_value = Math.pow(noise_value, 1.5 ) // to smooth the terrain
        vertices[i + 2] += noise_value * max_height;
        // console.log(noise_value)
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
      // console.log(noise_value);
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
    stats.begin();
    // generateTerrain(terrain_parameters.width, terrain_parameters.height, terrain_parameters.noise_type, terrain_parameters.frequency, terrain_parameters.max_height, terrain_parameters.segments, terrain_parameters.wireframe);
    camera_controls.update();
    terrain.rotation.z += 0.0001; 
    renderer.render(scene, camera);
    stats.end();
}




animate();