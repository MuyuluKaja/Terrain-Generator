import * as THREE from 'three';

/* This function will add a procedural sky to the terrain, this is inspired by
https://www.youtube.com/watch?v=Vkbju0GrrXs&ab_channel=CulerDamage
*/
export function addSky(scene) {
    const sky_radius = 1000;
    const sun_position = new THREE.Vector3(0, 100, 0);

    const sky_mesh = makeSky(sky_radius, sun_position);

    scene.add(sky_mesh);
}

// Function to create and return the sky mesh (geometry + material)
function makeSky(radius, sun_position) {
    const geometry = makeSkyGeometry(radius);
    const material = makeSkyMaterial(sun_position);

    return new THREE.Mesh(geometry, material);
}

// Function to create the sky geometry (sphere)
function makeSkyGeometry(radius) {
    return new THREE.SphereGeometry(radius, 300, 300);
}

// Function to create the shader material for the sky
function makeSkyMaterial(sun_position) {
    return new THREE.ShaderMaterial({
        uniforms: {
            sun_position: { value: sun_position },
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
        uniform vec3 sun_position;
        varying vec3 vWorldPosition;

        void main() {
            float intensity = dot(normalize(vWorldPosition), normalize(sun_position));
            vec3 skyColor = mix(
                vec3(0.5, 0.7, 0.9),  // Light blue (default sky color)
                vec3(1.0, 0.5, 0.2),  // Orange (sunset color)
                max(intensity, 0.105)
            );
            gl_FragColor = vec4(skyColor, 1.0);
        }
    `;
}
