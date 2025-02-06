
class SimplexNoise {
    constructor() {
      this.grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
                     [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
                     [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
  
      this.p = new Uint8Array(256);
      this.generatePermutationTable();
    }
  
    generatePermutationTable() {
      const source = new Uint8Array(256);
      for (let i = 0; i < 256; i++) {
        source[i] = i;
      }
  
      // Use Math.random directly for shuffling
      for (let i = 255; i >= 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        const tmp = source[i];
        source[i] = source[r];
        source[r] = tmp;
      }
  
      for (let i = 0; i < 256; i++) {
        this.p[i] = source[i];
      }
    }
  
    dot(ix, iy, x, y) {
      const index = (this.p[this.p[ix & 255] + iy & 255]) % 12;
      return this.grad3[index][0] * x + this.grad3[index][1] * y;
    }
  
    noise(x, y) {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
  
      x -= Math.floor(x);
      y -= Math.floor(y);
  
      const x1 = x - 1;
      const y1 = y - 1;
  
      const fadeX = this.fade(x);
      const fadeY = this.fade(y);
  
      const a = this.dot(X, Y, x, y);
      const b = this.dot(X + 1, Y, x1, y);
      const c = this.dot(X, Y + 1, x, y1);
      const d = this.dot(X + 1, Y + 1, x1, y1);
  
      return this.lerp(fadeY, this.lerp(fadeX, a, b), this.lerp(fadeX, c, d));
    }
  
    fade(t) {
      return t * t * t * (t * (t * 6 - 15) + 10);
    }
  
    lerp(a, b, x) {
      return a + x * (b - a);
    }
  }
  
  export { SimplexNoise };