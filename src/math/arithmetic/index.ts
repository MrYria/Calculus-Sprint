import {generateRandomNumber} from '../../helper/utils';
import type {IArithmeticProblemGenerator} from '../../helper/utils';
import type { MathQuestion} from '../../types/math';

import { additionGenerator } from './addition';
import { divisionGenerators } from './division';
import { multiplicationGenerators } from './multiplication';
import { substractionGenerator } from './subtraction';

export const ALL_ARITHMETIC_GENERATORS: IArithmeticProblemGenerator[] = [
    additionGenerator,
    substractionGenerator,
    ...multiplicationGenerators,
    ...divisionGenerators,
];

function getClosestGenerator(
  generators: IArithmeticProblemGenerator[], 
  difficulty: number
): IArithmeticProblemGenerator {
  return generators.reduce((prev, curr) => {
    const distPrev = Math.max(0, prev.minDifficulty - difficulty, difficulty - prev.maxDifficulty);
    const distCurr = Math.max(0, curr.minDifficulty - difficulty, difficulty - curr.maxDifficulty);
    return distCurr < distPrev ? curr : prev;
  });
}

export function generateArithmeticQuestion(difficulty: number): MathQuestion {
  if (ALL_ARITHMETIC_GENERATORS.length === 0) {
    throw new Error("No power generators available");
  }

  const available = ALL_ARITHMETIC_GENERATORS.filter(
    (g) => difficulty >= g.minDifficulty && difficulty <= g.maxDifficulty
  );

  const selected = available.length > 0
    ? available[generateRandomNumber(0, available.length - 1)]
    : getClosestGenerator(ALL_ARITHMETIC_GENERATORS, difficulty);

  const safeDifficulty = Math.min(
    Math.max(difficulty, selected.minDifficulty),
    selected.maxDifficulty
  );

  return selected.generate(safeDifficulty);
}