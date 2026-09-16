import { describe, it, expect } from 'vitest';
import { ALL_DERIVATIVE_GENERATORS } from '../../src/math/derivatives/index';

describe('Derivatives Module Quality & Stress Test', () => {
  ALL_DERIVATIVE_GENERATORS.forEach((gen) => {
    it(`[${gen.id}] generates valid integer answers & clean LaTeX`, () => {
      for (let i = 0; i < 1000; i++) {
        const diff =
          gen.minDifficulty +
          Math.random() * (gen.maxDifficulty - gen.minDifficulty);
        const q = gen.generate(diff);

        
        expect(Number.isFinite(q.correctAnswer)).toBe(true);
        expect(Number.isNaN(q.correctAnswer)).toBe(false);
        expect(Number.isInteger(q.correctAnswer)).toBe(true);

        expect(q.latex).toContain('= ?');
        expect(q.latex).not.toContain('NaN');
        expect(q.latex).not.toContain('undefined');
        expect(q.latex).not.toContain('+ -');
        expect(q.latex).not.toContain('+-');
        expect(q.latex).not.toContain('--');
        expect(q.latex).not.toMatch(/\b0x\b/);
      }
    });
  });
});