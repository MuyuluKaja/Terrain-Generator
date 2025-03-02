import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { terrain_parameters } from './main';

export function makeControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  
  // Enable damping for smooth camera movement
  controls.enableDamping = true;
  controls.dampingFactor = 0.25; // Adjust this for slower/faster damping
  controls.screenSpacePanning = false; // Disable panning vertically to keep the camera level
  
  return controls;
}

export function makeButtons() {
  const gui = new dat.GUI();

  gui.add(terrain_parameters, 'noise_type', ['ridge', 'fractal' , 'simplex']).name('Noise Type').onChange( value => {
    console.log("Changed noise to value: ", value);
    terrain_parameters.regenerate();
  }); 

  gui.add(terrain_parameters, 'biome', ['grass', 'ice', 'snow', 'land', 'water', 'sand', 'purple land']).name('Biome').onChange( value => {
    console.log("Changed biome to: ", value);
    terrain_parameters.biome = value;
      terrain_parameters.regenerate();
  });

  gui.add(terrain_parameters, 'frequency', 0.01, 0.1).step(0.0001).name('Frequency').onChange( value => {
    console.log("Changed frequency to value: ", value);
    terrain_parameters.regenerate();
  }); 

  gui.add(terrain_parameters, 'max_height', 1, 100).step(1).name('Max Height').onChange( value => {
    console.log("Changed max height to value: ", value);
    terrain_parameters.regenerate();
  }); 

  gui.add(terrain_parameters, 'width', 100, 1000).step(1).name('size').onChange( value => {
    terrain_parameters.height = value;
    console.log("Changed width to value: ", terrain_parameters.width);
    console.log("Changed height to value: ", terrain_parameters.height);

    terrain_parameters.regenerate();
  
  });  

  gui.add(terrain_parameters, 'segments', 1, 1000).step(1).name('Segments').onChange(value => {
    console.log("Changed segments to value: ", value);
    terrain_parameters.regenerate();
  });

  gui.add(terrain_parameters, 'wireframe').name('Wireframe?').onChange(value => {

    console.log("Toggled wireframe to value: ", value);
    terrain_parameters.wireframe = value; 
    terrain_parameters.regenerate();});
  gui.add(terrain_parameters, 'regenerate').name('Regenerate Terrain');

}


