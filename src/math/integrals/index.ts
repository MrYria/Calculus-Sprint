import {generateRandomNumber} from '../../helper/utils';
import type {IIntegralGenerator} from '../../types/generators';
import type { MathQuestion, IntegralTaskType } from '../../types/math';

export const ALL_INTEGRALS_GENERATORS: IIntegralGenerator[] = [
    
];

function getClosestGenerator(
  generators: IIntegralGenerator[], 
  difficulty: number
): IIntegralGenerator {
  return generators.reduce((prev, curr) => {
    const distPrev = Math.max(0, prev.minDifficulty - difficulty, difficulty - prev.maxDifficulty);
    const distCurr = Math.max(0, curr.minDifficulty - difficulty, difficulty - curr.maxDifficulty);
    return distCurr < distPrev ? curr : prev;
  });
}

export function generateIntegralsQuestion(difficulty: number): MathQuestion {
  if (ALL_INTEGRALS_GENERATORS.length === 0) {
    throw new Error("No integral generators available");
  }

  const available = ALL_INTEGRALS_GENERATORS.filter(
    (g) => difficulty >= g.minDifficulty && difficulty <= g.maxDifficulty
  );

  const selected = available.length > 0
    ? available[generateRandomNumber(0, available.length - 1)]
    : getClosestGenerator(ALL_INTEGRALS_GENERATORS, difficulty);

  const safeDifficulty = Math.min(
    Math.max(difficulty, selected.minDifficulty),
    selected.maxDifficulty
  );

  return selected.generate(safeDifficulty);
}

