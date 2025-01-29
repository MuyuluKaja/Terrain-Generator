import { exp } from "three/tsl";
import * as THREE from 'three';




const loader = new THREE.TextureLoader();
const grassTexture = loader.load('textures/gass.jpg');   // Grass/Soil texture
const waterTexture = loader.load('textures/water.jpg'); // Ocean texture
const snowTexture = loader.load('textures/snow.jpg');   // Snowy mountain texture

const terrainMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.8,    // Rough surface
    metalness: 0.1,    // Less metallic
    color: 0x2d3e2f,   // Earthy color
    emissive: 0x0a3a2a, // Slight ambient light 
    normalScale: new THREE.Vector2(1, 1),  // Intensity of the normal map
    wireframe: true,
});

// Apply the textures based on height values 
function applyTexturesToTerrain(geometry) {
    const position = geometry.attributes.position;
    
    for (let i = 0; i < position.count; i++) {
        const height = position.getZ(i);
        let texture;

        // Use water texture for lower heights
        if (height < -5) {
            texture = waterTexture;
        } 
        // Use snow texture for higher heights
        else if (height > 15) {
            texture = snowTexture;
        }
        // Use land/grass texture for medium heights
        else {
            texture = grassTexture;
        }

        // Set the texture for each vertex with UV Mapping
        geometry.attributes.uv = new THREE.BufferAttribute(new Float32Array(position.count * 2), 2);
        const uv = geometry.attributes.uv;
        uv.setXY(i, position.getX(i) / 200, position.getY(i) / 200); 
    }
}

export { applyTexturesToTerrain }
export { terrainMaterial }
