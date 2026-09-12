import type { Topic, MathQuestion } from '../types/math';
import { generateArithmeticQuestion } from '../math/arithmetic/';
import { generatePowersQuestion } from '../math/power';
import { generateDerivativesQuestion } from '../math/derivatives';
import { generateIntegralsQuestion } from '../math/integrals';
import { generateGraphsQuestion } from '../math/graphs/';
import { generateRandomNumber } from '../helper/utils';

export function getMathQuestion(topic: Topic | 'all_mix', difficulty: number): MathQuestion {
  switch (topic) {
    case 'arithmetic':
      return generateArithmeticQuestion(difficulty);
    case 'powers':
      return generatePowersQuestion(difficulty);
    case 'derivatives':
      return generateDerivativesQuestion(difficulty);
    case 'integrals':
      return generateIntegralsQuestion(difficulty);
    case 'graphs':
      return generateGraphsQuestion(difficulty);
    case 'all_mix': {
      const topics = ['arithmetic', 'powers', 'derivatives', 'integrals', 'graphs'] as const satisfies readonly Topic[];
      return getMathQuestion(topics[generateRandomNumber(0, topics.length - 1)], difficulty);
    }
    default:
      return generateArithmeticQuestion(difficulty);
  }
}