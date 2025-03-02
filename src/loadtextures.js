import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.140.0/build/three.module.js';

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
        case('sand'):
            biome_texture = loader.load("textures/sand.jpg")
            break;
        case('purple land'):
            biome_texture = loader.load("textures/purpleland.jpg");
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




