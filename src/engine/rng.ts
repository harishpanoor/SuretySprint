// Seeded Pseudo-Random Number Generator (Mulberry32)
export class SeededRNG {
  private s: number;

  constructor(seed: number = Date.now()) {
    this.s = seed | 0;
  }

  // Returns float in [0, 1)
  next(): number {
    let t = (this.s += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  // Integer in [min, max] inclusive
  int(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  // Non-zero integer in [min, max]
  intNonZero(min: number, max: number): number {
    let val = 0;
    while (val === 0) {
      val = this.int(min, max);
    }
    return val;
  }

  // Pick random element from array
  choice<T>(items: readonly T[]): T {
    if (items.length === 0) throw new Error('Cannot pick from empty array');
    return items[Math.floor(this.next() * items.length)];
  }

  // Pick n distinct elements
  sample<T>(items: readonly T[], count: number): T[] {
    const copy = [...items];
    const result: T[] = [];
    const n = Math.min(count, items.length);
    for (let i = 0; i < n; i++) {
      const idx = Math.floor(this.next() * copy.length);
      result.push(copy[idx]);
      copy.splice(idx, 1);
    }
    return result;
  }

  // Shuffle array copy
  shuffle<T>(items: readonly T[]): T[] {
    const arr = [...items];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Float rounded to decimals
  float(min: number, max: number, decimals: number = 2): number {
    const val = this.next() * (max - min) + min;
    const factor = Math.pow(10, decimals);
    return Math.round(val * factor) / factor;
  }
}

export function createRNG(seed?: number): SeededRNG {
  return new SeededRNG(seed ?? Math.floor(Math.random() * 1000000));
}
