import { describe, it, expect } from 'vitest';
import { ALL_ARITHMETIC_GENERATORS } from '../../src/math/arithmetic/';

describe('Arithmetic Generators Quality Test', () => {
  ALL_ARITHMETIC_GENERATORS.forEach((gen) => {
    it(`[${gen.id}] generates valid integer answers`, () => {
      for (let i = 0; i < 200; i++) {
        const diff =
          gen.minDifficulty +
          Math.random() * (gen.maxDifficulty - gen.minDifficulty);
        const q = gen.generate(diff);

        expect(Number.isInteger(q.correctAnswer)).toBe(true);
        expect(q.latex).not.toContain('NaN');
        expect(q.latex).not.toContain('undefined');
      }
    });
  });
});