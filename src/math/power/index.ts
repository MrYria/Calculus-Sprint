import type { MathQuestion } from '../../types/math';
import { generateRandomNumber } from '../../helper/utils';
import type { IPowerGenerator } from '../../types/generators';

import { powersGenerators } from './powers';
import { rootsGenerators } from './roots';
import { logarithmGenerators } from './logarithm';

export const ALL_POWER_GENERATORS: IPowerGenerator[] = [
  ...powersGenerators,
  ...rootsGenerators,
  ...logarithmGenerators,
];

function getClosestGenerator(
  generators: IPowerGenerator[], 
  difficulty: number
): IPowerGenerator {
  return generators.reduce((prev, curr) => {
    const distPrev = Math.max(0, prev.minDifficulty - difficulty, difficulty - prev.maxDifficulty);
    const distCurr = Math.max(0, curr.minDifficulty - difficulty, difficulty - curr.maxDifficulty);
    return distCurr < distPrev ? curr : prev;
  });
}

export function generatePowersQuestion(difficulty: number): MathQuestion {
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