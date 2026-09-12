import {generateRandomNumber} from './utils';
import type {IGraphProblemGenerator} from './utils';
import type { MathQuestion, GraphFunctionType, GraphTaskType } from '../../types/math';

export const ALL_INTEGRALS_GENERATORS: IGraphProblemGenerator[] = [
    ...,
];

export function generateIntegralsQuestion(difficulty: number): MathQuestion {
  let availableGenerators = ALL_INTEGRALS_GENERATORS.filter(
    (par) => difficulty >= par.minDifficulty && difficulty <= par.maxDifficulty
  );

  if (availableGenerators.length === 0) {
    availableGenerators = ALL_INTEGRALS_GENERATORS;
  }

  const selectedGenerator =
    availableGenerators[generateRandomNumber(0, availableGenerators.length - 1)];

  return selectedGenerator.generate(difficulty);
}