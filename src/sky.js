import * as THREE from 'three';

/* This function will add a procedural sky to the terrain, this is inspired by
https://www.youtube.com/watch?v=Vkbju0GrrXs&ab_channel=CulerDamage
*/
export function addSky(scene) {
    const skyRadius = 500;
    const sunPosition = new THREE.Vector3(0, 100, 0);

    const skyMesh = makeSkyMesh(skyRadius, sunPosition);

    scene.add(skyMesh);
}

// Function to create and return the sky mesh (geometry + material)
function makeSkyMesh(radius, sunPosition) {
    const geometry = makeSkyGeometry(radius);
    const material = makeSkyMaterial(sunPosition);

    return new THREE.Mesh(geometry, material);
}

// Function to create the sky geometry (sphere)
function makeSkyGeometry(radius) {
    return new THREE.SphereGeometry(radius, 32, 32);
}

// Function to create the shader material for the sky
function makeSkyMaterial(sunPosition) {
    return new THREE.ShaderMaterial({
        uniforms: {
            sunPosition: { value: sunPosition },
        },
        vertexShader: getVertexShader(),
        fragmentShader: getFragmentShader(),
        side: THREE.BackSide,
    });
}

// GLSL code for the vertex shader (transform vertex position to world space)
function getVertexShader() {
    return `
        varying vec3 vWorldPosition;

        void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;

            gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
    `;
}

// GLSL code for the fragment shader (calculates sky color based on sun position)
function getFragmentShader() {
    return `
        uniform vec3 sunPosition;
        varying vec3 vWorldPosition;

        void main() {
            // Calculate the intensity of sunlight based on the angle between the fragment and the sun
            float intensity = dot(normalize(vWorldPosition), normalize(sunPosition));

            // Define the sky colors:
            // Light blue for the base of the sky
            // Orange for the area near the sun
            vec3 skyColor = mix(
                vec3(0.7, 0.8, 1.0),  // Light blue (default sky color)
                vec3(1.0, 0.5, 0.2),  // Orange (sunset color)
                max(intensity, 0.0)   // Blend based on sunlight intensity (clamped to 0+)
            );

            gl_FragColor = vec4(skyColor, 1.0);
        }
    `;
}
