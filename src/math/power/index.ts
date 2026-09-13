import type { MathQuestion } from '../../types/math';
import { generateRandomNumber } from '../../helper/utils';
import type { IPowersProblemGenerator } from '../../helper/utils';

import { powersGenerators } from './powers';
import { rootsGenerators } from './roots';
import { logarithmGenerators } from './logarithm';

export const ALL_POWER_GENERATORS: IPowersProblemGenerator[] = [
  ...powersGenerators,
  ...rootsGenerators,
  ...logarithmGenerators,
];

export function generatePowersQuestion(difficulty: number): MathQuestion {
  let available = ALL_POWER_GENERATORS.filter(
    (g) => difficulty >= g.minDifficulty && difficulty <= g.maxDifficulty
  );

  if (available.length === 0) {
    available = ALL_POWER_GENERATORS;
  }

  const selected = available[generateRandomNumber(0, available.length - 1)];
  return selected.generate(difficulty);
}