import {generateRandomNumber} from '../../helper/utils';
import type { IGraphGenerator } from '../../types/generators';
import type { MathQuestion, GraphFunctionType, GraphTaskType } from '../../types/math';

import { linearGenerators } from './linear';
import { quadraticGenerators } from './quadratic';
import { rootCubicsGenerators } from './rootCubics';
import { asymptotesGenerator } from './asymptotes';
import { trigLogsGenerator } from './trigLogs';
import { extremaGenerator } from './extrema';
import { conicsGenerator } from './conics';

export const ALL_GRAPH_GENERATORS: IGraphGenerator[] = [
    ...linearGenerators,
    ...quadraticGenerators,
    ...rootCubicsGenerators,
    ...asymptotesGenerator,
    ...trigLogsGenerator,
    ...extremaGenerator,
    ...conicsGenerator
];

function getClosestGenerator(
  generators: IGraphGenerator[], 
  difficulty: number
): IGraphGenerator {
  return generators.reduce((prev, curr) => {
    const distPrev = Math.max(0, prev.minDifficulty - difficulty, difficulty - prev.maxDifficulty);
    const distCurr = Math.max(0, curr.minDifficulty - difficulty, difficulty - curr.maxDifficulty);
    return distCurr < distPrev ? curr : prev;
  });
}

export function generateGraphsQuestion(difficulty: number): MathQuestion {
  if (ALL_GRAPH_GENERATORS.length === 0) {
    throw new Error("No graph generators available");
  }

  const available = ALL_GRAPH_GENERATORS.filter(
    (g) => difficulty >= g.minDifficulty && difficulty <= g.maxDifficulty
  );

  const selected = available.length > 0
    ? available[generateRandomNumber(0, available.length - 1)]
    : getClosestGenerator(ALL_GRAPH_GENERATORS, difficulty);

  const safeDifficulty = Math.min(
    Math.max(difficulty, selected.minDifficulty),
    selected.maxDifficulty
  );

  return selected.generate(safeDifficulty);
}