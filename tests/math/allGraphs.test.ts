import { describe, it, expect } from 'vitest';
import { ALL_GRAPH_GENERATORS } from '../../src/math/graphs';

describe('Conics (Graphs) Generators Quality & Stress Test', () => {
  ALL_GRAPH_GENERATORS.forEach((generator) => {
    it(`[${generator.id}] should generate valid math and clean LaTeX`, () => {
      for (let i = 0; i < 1000; i++) {
        const diff =
          generator.minDifficulty +
          Math.random() * (generator.maxDifficulty - generator.minDifficulty);

        const question = generator.generate(diff);

        expect(Number.isFinite(question.correctAnswer)).toBe(true);
        expect(Number.isNaN(question.correctAnswer)).toBe(false);

        expect(Number.isInteger(question.correctAnswer)).toBe(true);

        expect(question.latex).not.toMatch(/\b0x\b/);
        expect(question.latex).not.toContain('+ -');
        expect(question.latex).not.toContain('+-');
        expect(question.latex).not.toContain('--');
        expect(question.latex).not.toContain('NaN');
        expect(question.latex).not.toContain('undefined');
      }
    });
  });
});