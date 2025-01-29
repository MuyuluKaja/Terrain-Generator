class PerlinNoise {
    constructor() {
        this.perm = [];
        this.grad3 = [
            [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
            [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
            [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
        ];

        // Initialize the permutation array with random values
        for (let i = 0; i < 256; i++) {
            this.perm[i] = Math.floor(Math.random() * 256);
        }

        // Duplicate the permutation array to avoid overflow
        for (let i = 0; i < 256; i++) {
            this.perm[256 + i] = this.perm[i];
        }
    }

    // Fade function (smooths the transitions)
    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    // Linear interpolation between two values
    lerp(a, b, t) {
        return (1 - t) * a + t * b;
    }

    // Gradient function calculates the dot product of gradient and position
    grad(hash, x, y, z) {
        const g = this.grad3[hash % 12]; // Use hash % 12 to avoid out-of-bounds errors
        return g[0] * x + g[1] * y + g[2] * z;
    }

    // Perlin noise function
    noise(x, y, z) {
        // Determine grid cell coordinates
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;

        // Local coordinates within the cell
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);

        // Compute fade curves for each dimension
        const u = this.fade(x);
        const v = this.fade(y);
        const w = this.fade(z);

        // Hash coordinates of the 8 cube corners
        const A = this.perm[X] + Y, AA = this.perm[A] + Z, AB = this.perm[A + 1] + Z;
        const B = this.perm[X + 1] + Y, BA = this.perm[B] + Z, BB = this.perm[B + 1] + Z;

        // Add contributions from each corner of the cube
        return this.lerp(
            this.lerp(this.lerp(this.grad(this.perm[AA], x, y, z), this.grad(this.perm[BA], x - 1, y, z), u),
                      this.lerp(this.grad(this.perm[AB], x, y - 1, z), this.grad(this.perm[BB], x - 1, y - 1, z), u), v),
            this.lerp(this.lerp(this.grad(this.perm[AA + 1], x, y, z - 1), this.grad(this.perm[BA + 1], x - 1, y, z - 1), u),
                      this.lerp(this.grad(this.perm[AB + 1], x, y - 1, z - 1), this.grad(this.perm[BB + 1], x - 1, y - 1, z - 1), u), v),
            w
        );
    }
}

// Export the PerlinNoise class
export { PerlinNoise };
