import { describe, it, expect } from 'vitest';
import { linearGenerators } from '../../src/math/graphs/linear';

describe('Linear Graph Generators (Level 1)', () => {
  linearGenerators.forEach((gen) => {
    it(`[${gen.id}] should generate integer answers and clean LaTeX`, () => {
      for (let i = 0; i < 200; i++) {
        const diff = gen.minDifficulty + Math.random() * (gen.maxDifficulty - gen.minDifficulty);
        const question = gen.generate(diff);

        expect(Number.isInteger(question.correctAnswer)).toBe(true);

        expect(question.latex).not.toContain('+ -');
        expect(question.latex).not.toContain('+-');
        expect(question.latex).not.toContain('--');
        expect(question.latex).not.toContain('NaN');
        expect(question.latex).not.toContain('undefined');
      }
    });
  });
});