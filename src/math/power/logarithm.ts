import type { MathQuestion } from '../../types/math';
import { generateRandomNumber } from '../../helper/utils';
import type { IPowersProblemGenerator } from '../../helper/utils';

export const baseTwoLogGenerator: IPowersProblemGenerator = {
  id: 'log-base-two',
  minDifficulty: 1.5,
  maxDifficulty: 8.0,
  generate(difficulty: number): MathQuestion {
    let answer = generateRandomNumber(2, 6); 

    if (difficulty > 6.5) {
      answer = generateRandomNumber(11, 16);
    } else if (difficulty > 4.5) {
      answer = generateRandomNumber(7, 10); 
    }

    const x = Math.pow(2, answer);
    return {
      id: crypto.randomUUID(),
      latex: `\\log_{2}(${x}) = ?`,
      correctAnswer: answer,
      difficulty,
    };
  },
};

export const baseTenLogGenerator: IPowersProblemGenerator = {
  id: 'log-base-ten',
  minDifficulty: 1.0,
  maxDifficulty: 7.0,
  generate(difficulty: number): MathQuestion {
    let answer = generateRandomNumber(2, 4); 

    if (difficulty > 4.5) {
      answer = generateRandomNumber(5, 8); 
    }

    const x = Math.pow(10, answer);
    return {
      id: crypto.randomUUID(),
      latex: `\\log_{10}(${x}) = ?`,
      correctAnswer: answer,
      difficulty,
    };
  },
};

export const tableBasesLogGenerator: IPowersProblemGenerator = {
  id: 'log-table-bases',
  minDifficulty: 2.0,
  maxDifficulty: 7.5,
  generate(difficulty: number): MathQuestion {
    const bases = [3, 5, 7];
    const base = bases[generateRandomNumber(0, bases.length - 1)];

    let answer = 2;
    if (base === 3) {
      answer = generateRandomNumber(2, difficulty > 5.0 ? 5 : 4); 
    } else if (base === 5) {
      answer = generateRandomNumber(2, difficulty > 5.0 ? 4 : 3); 
    } else {
      answer = generateRandomNumber(2, 3);
    }

    const x = Math.pow(base, answer);
    return {
      id: crypto.randomUUID(),
      latex: `\\log_{${base}}(${x}) = ?`,
      correctAnswer: answer,
      difficulty,
    };
  },
};

export const logarithmGenerators: IPowersProblemGenerator[] = [
  baseTwoLogGenerator,
  baseTenLogGenerator,
  tableBasesLogGenerator,
];