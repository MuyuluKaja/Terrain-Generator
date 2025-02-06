import * as THREE from 'three';

<<<<<<< HEAD
// Load the texture
const loader = new THREE.TextureLoader();
const landTexture = loader.load(
    'textures/land.jpg', // Ensure this path is correct
    () => {
      console.log("Land texture loaded successfully");
    },
    undefined,
    (err) => {
      console.error("Error loading land texture:", err);
    }
  );
// Create a basic material with the grass texture
const terrainMaterial = new THREE.MeshBasicMaterial({
  map: landTexture,
  side: THREE.FrontSide, // Make sure we apply the texture to the front face of the geometry
});

// Function to apply the material to the terrain geometry
function applyTexturesToTerrain(geometry) {
  // Check if UVs exist, if not, create default ones
  if (!geometry.attributes.uv) {
    console.warn("UVs not found on geometry. Applying default UVs.");
    geometry.computeVertexNormals();
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(geometry.attributes.position.count * 2), 2));
  }

  // Apply the material to the geometry and return the mesh
  const terrainMesh = new THREE.Mesh(geometry, terrainMaterial);
  return terrainMesh;
}

export { applyTexturesToTerrain };
export { terrainMaterial };
=======
// loader for terrain
const loader = new THREE.TextureLoader();
let biome_texture;




//Creating Terrain Materials
export function makeMaterial(value, biome){
    switch (biome){
        case ('grass'):
            biome_texture = loader.load("textures/grass.jpg");
            break;
        case ('snow'):
            biome_texture = loader.load("textures/snow.jpg");
            break;
        case ('ice'):
            biome_texture = loader.load("textures/ice.jpg");
            break;
        case('land'):
            biome_texture = loader.load("textures/land.jpg");
            break;
        case('water'):
            biome_texture = loader.load("textures/water.jpg");
            break;
        default:
            biome_texture = loader.load("textures/land.jpg");
    }

    return new THREE.MeshBasicMaterial({
        map: biome_texture,
        wireframe: value,
        side: THREE.FrontSide,
    });
}

export function addTextures(geometry, terrain_material){

    const terrainMesh = new THREE.Mesh(geometry, terrain_material);
    return terrainMesh;

}




>>>>>>> 31bef91 (Fixed controls, added new textures, added settomhs for biomes , reorganised code)
