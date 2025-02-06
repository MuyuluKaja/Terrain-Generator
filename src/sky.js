import * as THREE from 'three';


// Function to add a procedural sky shader to the scene
export function addProceduralSky(scene) {
    // Create a large sphere that will act as the sky
    const skyGeometry = new THREE.SphereGeometry(500, 32, 32);

    // Define the shader material for the sky
    const skyMaterial = new THREE.ShaderMaterial({
        // Define uniforms for the shader
        uniforms: {
            // Position of the sun in the sky
            sunPosition: { value: new THREE.Vector3(0, 100, 0) },
        },
        // Vertex shader: Passes world position to the fragment shader
        vertexShader: `
            varying vec3 vWorldPosition; // Variable to store world position of the vertex

            void main() {
                // Transform the vertex position to world space
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz; // Pass world position to the fragment shader

                // Transform the vertex position to screen space
                gl_Position = projectionMatrix * viewMatrix * worldPosition;
            }
        `,
        // Fragment shader: Calculates the sky color based on the sun's position
        fragmentShader: `
            uniform vec3 sunPosition; // The position of the sun in the sky
            varying vec3 vWorldPosition; // The world position of the current fragment

            void main() {
                // Calculate the intensity of sunlight based on the angle between the fragment and the sun
                float intensity = dot(normalize(vWorldPosition), normalize(sunPosition));

                // Define the sky colors:
                // - Light blue for the base of the sky
                // - Orange for the area near the sun
                vec3 skyColor = mix(
                    vec3(0.8, 0.9, 1.0),  // Light blue (default sky color)
                    vec3(1.0, 0.5, 0.0),  // Orange (sunset color)
                    max(intensity, 0.0)   // Blend based on sunlight intensity (clamped to 0+)
                );

                // Output the calculated sky color
                gl_FragColor = vec4(skyColor, 1.0);
            }
        `,
        // Render the inside of the sphere by setting the material's side to BackSide
        side: THREE.BackSide,
    });

    // Create a mesh with the sky geometry and material
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);

    // Add the sky mesh to the scene
    scene.add(sky);
}


