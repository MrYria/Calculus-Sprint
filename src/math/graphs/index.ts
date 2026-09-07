import {generateRandomNumber} from './utils';
import type {IGraphProblemGenerator} from './utils';
import type { MathQuestion, GraphFunctionType, GraphTaskType } from '../../types/math';

import { linearGenerators } from './linear';
import { quadraticGenerators } from './quadratic';
import { rootCubicsGenerators } from './rootCubics';
import { asymptotesGenerator } from './asymptotes';
import { trigLogsGenerator } from './trigLogs';
import { extremaGenerator } from './extrema';
import { conicsGenerator } from './conics';

export const ALL_GRAPH_GENERATORS: IGraphProblemGenerator[] = [
    ...linearGenerators,
    ...quadraticGenerators,
    ...rootCubicsGenerators,
    ...asymptotesGenerator,
    ...trigLogsGenerator,
    ...extremaGenerator,
    ...conicsGenerator
];

export function generateGraphsQuestion(difficulty: number): MathQuestion {
  let availableGenerators = ALL_GRAPH_GENERATORS.filter(
    (par) => difficulty >= par.minDifficulty && difficulty <= par.maxDifficulty
  );

  if (availableGenerators.length === 0) {
    availableGenerators = ALL_GRAPH_GENERATORS;
  }

  const selectedGenerator =
    availableGenerators[generateRandomNumber(0, availableGenerators.length - 1)];

  return selectedGenerator.generate(difficulty);
}