  import * as THREE from 'three';
  // Importing Simpled
  import { PerlinNoise } from './noise/perlin.js';
  import { SimplexNoise } from './noise/simplex.js';
  import { addProceduralSky } from './sky.js';
  import { applyTexturesToTerrain } from './loadtextures.js';
  import { terrainMaterial } from './loadtextures.js'
  import * as dat from 'dat.gui'; 

  // Instantiating noise algorithms

  const perlin = new PerlinNoise();
  const simplex = new SimplexNoise(22);

  //Defining objects for renderer
  const scene = new THREE.Scene();
  // Defining things like FOV, Aspect Ratio, plane clipping
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(165, 150, 165); // Position the camera behind and above the plane
  camera.lookAt(0, 0, 0); // Point the camera at the center of the plane

  // Create WebGL Renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  addProceduralSky(scene);

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
  }

  // Apply Simplex Noise to the Terrain
  function applySimplexNoise(geometry, scale = 0.1, amplitude = 5) { // Corrected
    const simplex = new SimplexNoise();

    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        const z = vertices[i + 2];

        const noiseValue = simplex.noise(x * scale, y * scale, z * scale);

        vertices[i + 2] += noiseValue * amplitude;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();

    const material = terrainMaterial;
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }






  // Create dat.GUI instance to add control buttons 
  const gui = new dat.GUI(); 
  gui.add(params, 'noiseType', ['perlin', 'simplex']).name('Noise Type'); // Control for noise typr
  gui.add(params, 'frequency', 0.01, 1.0).step(0.01).name('Frequency'); // Control for Frequency
  gui.add(params, 'amplitude', 1, 100).step(1).name('Amplitude'); // Control for amplitude
  gui.add(params, 'terrainWidth', 100, 1000).step(1).name('Terrain Width');   // Control for width
  gui.add(params, 'terrainHeight', 100, 1000).step(1).name('Terrain Height');  // Control for height
  gui.add(params, 'segments', 1, 200).step(1).name('Segments');  // Add control for width segments
  gui.add(params, 'regenerate').name('Regenerate Terrain');

  // Generates Terrain based on user selection
  function generateTerrain(noiseType, frequency, amplitude, segments, terrainWidth, terrainHeight) { // Correct parameters
    if (terrain) {  
        terrain.geometry.dispose();
        scene.remove(terrain);
    }

    const geometry = new THREE.PlaneGeometry(terrainWidth, terrainHeight, segments, segments); // Use parameters here
    
    switch (noiseType) {
        case 'perlin':
            terrain = applyPerlinNoise(geometry, frequency, amplitude);
            break;
        case 'simplex':
            terrain = applySimplexNoise(geometry, frequency, amplitude);
            break;
        // ... worley case
        default:
            console.error("Invalid noise type");
            return;
    }

    terrain.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    scene.add(terrain); // Add the new mesh to the scene
}


    
  


  generateTerrain(params.noiseType, params.frequency, params.amplitude, params.segments, params.terrainWidth, params.terrainHeight); // Pass width and height


  // Renders Scene
  function animate() {
    requestAnimationFrame(animate);
    // Update objects here
    terrain.rotation.z += 0.0001; // Rotate around the Y-axis (adjust speed as needed)
    renderer.render(scene, camera);
    
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