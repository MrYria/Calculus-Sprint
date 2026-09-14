import type { MathQuestion } from '../../types/math';
import { generateRandomNumber } from '../../helper/utils';
import type { IDerivativesProblemsGenerator } from '../../helper/utils';

import { polynomialDerivatives } from './polynomials';


export const ALL_POWER_GENERATORS: IDerivativesProblemsGenerator[] = [
  ...polynomialDerivatives,
  
];

function getClosestGenerator(
  generators: IDerivativesProblemsGenerator[], 
  difficulty: number
): IDerivativesProblemsGenerator {
  return generators.reduce((prev, curr) => {
    const distPrev = Math.max(0, prev.minDifficulty - difficulty, difficulty - prev.maxDifficulty);
    const distCurr = Math.max(0, curr.minDifficulty - difficulty, difficulty - curr.maxDifficulty);
    return distCurr < distPrev ? curr : prev;
  });
}

export function generateDerivativesQuestion(difficulty: number): MathQuestion {
  if (ALL_POWER_GENERATORS.length === 0) {
    throw new Error("No power generators available");
  }

  const available = ALL_POWER_GENERATORS.filter(
    (g) => difficulty >= g.minDifficulty && difficulty <= g.maxDifficulty
  );

  const selected = available.length > 0
    ? available[generateRandomNumber(0, available.length - 1)]
    : getClosestGenerator(ALL_POWER_GENERATORS, difficulty);

  const safeDifficulty = Math.min(
    Math.max(difficulty, selected.minDifficulty),
    selected.maxDifficulty
  );

  return selected.generate(safeDifficulty);
}