class PerlinNoise {
    constructor() {
        this.perm = [];
        this.grad3 = [
            [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
            [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
            [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
        ];

        // Initialize the permutation table
        for (let i = 0; i < 256; i++) {
            this.perm[i] = Math.floor(Math.random() * 256);
        }
        for (let i = 0; i < 256; i++) {
            this.perm[256 + i] = this.perm[i];
        }
    }

    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    lerp(a, b, t) {
        return (1 - t) * a + t * b;
    }

    grad(hash, x, y, z) {
        const g = this.grad3[hash % 12];
        return g[0] * x + g[1] * y + g[2] * z;
    }

    noise(x, y, z) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;

        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);

        const u = this.fade(x);
        const v = this.fade(y);
        const w = this.fade(z);

        const A = this.perm[X] + Y, AA = this.perm[A] + Z, AB = this.perm[A + 1] + Z;
        const B = this.perm[X + 1] + Y, BA = this.perm[B] + Z, BB = this.perm[B + 1] + Z;

        return this.lerp(
            this.lerp(this.lerp(this.grad(this.perm[AA], x, y, z), this.grad(this.perm[BA], x - 1, y, z), u),
                      this.lerp(this.grad(this.perm[AB], x, y - 1, z), this.grad(this.perm[BB], x - 1, y - 1, z), u), v),
            this.lerp(this.lerp(this.grad(this.perm[AA + 1], x, y, z - 1), this.grad(this.perm[BA + 1], x - 1, y, z - 1), u),
                      this.lerp(this.grad(this.perm[AB + 1], x, y - 1, z - 1), this.grad(this.perm[BB + 1], x - 1, y - 1, z - 1), u), v),
            w
        );
    }

    // **Fractal Noise for Smooth Terrain**
    fractalNoise(x, y, z, octaves = 6, persistence = 0.5, lacunarity = 2.0) {
        let total = 0;
        let amplitude = 1;
        let frequency = 1;
        let maxValue = 0;

        for (let i = 0; i < octaves; i++) {
            total += this.noise(x * frequency, y * frequency, z * frequency) * amplitude;
            maxValue += amplitude;

            amplitude *= persistence; 
            frequency *= lacunarity;
        }

        return total / maxValue; 
    }

    // **Ridge Noise for Sharp Peaks (Mountainous Terrain)**
    ridgeNoise(x, y, z, octaves = 6, persistence = 0.5, lacunarity = 2.0) {
        let total = 0;
        let amplitude = 1;
        let frequency = 1;
        let maxValue = 0;

        for (let i = 0; i < octaves; i++) {
            let noiseValue = this.noise(x * frequency, y * frequency, z * frequency);
            noiseValue = 1 - Math.abs(noiseValue); // Invert for peaks
            noiseValue *= noiseValue; // Exaggerate peaks

            total += noiseValue * amplitude;
            maxValue += amplitude;

            amplitude *= persistence; 
            frequency *= lacunarity;
        }

        return total / maxValue; 
    }
}

export { PerlinNoise };
