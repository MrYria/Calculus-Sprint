import { describe, it, expect } from 'vitest';
import { ALL_POWER_GENERATORS } from '../../src/math/power/index';

describe('Powers, Roots & Logarithms Quality Test', () => {
  ALL_POWER_GENERATORS.forEach((gen) => {
    it(`[${gen.id}] generates valid integer answers & clean LaTeX`, () => {
      for (let i = 0; i < 200; i++) {
        const diff =
          gen.minDifficulty +
          Math.random() * (gen.maxDifficulty - gen.minDifficulty);
        const q = gen.generate(diff);

        expect(Number.isFinite(q.correctAnswer)).toBe(true);
        expect(Number.isInteger(q.correctAnswer)).toBe(true);

        expect(q.latex).toContain('= ?');
        expect(q.latex).not.toContain('NaN');
        expect(q.latex).not.toContain('undefined');
      }
    });
  });
});