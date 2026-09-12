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

export function generateArithmeticQuestion(difficulty: number): MathQuestion {
  let availableGenerators = ALL_ARITHMETIC_GENERATORS.filter(
    (par) => difficulty >= par.minDifficulty && difficulty <= par.maxDifficulty
  );

  if (availableGenerators.length === 0) {
    availableGenerators = ALL_ARITHMETIC_GENERATORS;
  }

  const selectedGenerator =
    availableGenerators[generateRandomNumber(0, availableGenerators.length - 1)];

  return selectedGenerator.generate(difficulty);
}