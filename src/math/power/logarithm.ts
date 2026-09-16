import type { MathQuestion } from '../../types/math';
import { generateRandomNumber } from '../../helper/utils';
import type { IPowerGenerator } from '../../types/generators';


export const baseTwoLogGenerator: IPowerGenerator = {
  id: 'log-base-two',
  minDifficulty: 1.5,
  maxDifficulty: 8.0,
  generate(difficulty: number): MathQuestion {
    let answer = 2;

    if (difficulty < 3.0) {
      answer = generateRandomNumber(2, 5);
    } else if (difficulty < 4.0) {
      answer = generateRandomNumber(6, 8); 
    } else if (difficulty < 5.0) {
      answer = generateRandomNumber(8, 10); 
    } else if (difficulty < 6.5) {
      answer = generateRandomNumber(11, 13); 
    } else {
      answer = generateRandomNumber(14, 16); 
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

export const baseTenLogGenerator: IPowerGenerator = {
  id: 'log-base-ten',
  minDifficulty: 1.0,
  maxDifficulty: 7.0,
  generate(difficulty: number): MathQuestion {
    let answer = 2;

    if (difficulty < 3.5) {
      answer = generateRandomNumber(2, 3); 
    } else if (difficulty < 5.0) {
      answer = generateRandomNumber(4, 5);
    } else {
      answer = generateRandomNumber(6, 8); 
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

export const tableBasesLogGenerator: IPowerGenerator = {
  id: 'log-table-bases',
  minDifficulty: 2.0,
  maxDifficulty: 7.5,
  generate(difficulty: number): MathQuestion {
    let base = 3;
    let answer = 2;

    if (difficulty < 3.5) {
      base = 3;
      answer = generateRandomNumber(2, 3); 
    } else if (difficulty < 5.0) {
      base = generateRandomNumber(0, 1) === 0 ? 3 : 5;
      answer = base === 3 ? 4 : generateRandomNumber(2, 3); 
    } else {
      const bases = [3, 5, 7];
      base = bases[generateRandomNumber(0, bases.length - 1)];
      if (base === 3) answer = generateRandomNumber(5, 6); 
      else if (base === 5) answer = 4; 
      else answer = 3; 
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

export const logarithmGenerators: IPowerGenerator[] = [
  baseTwoLogGenerator,
  baseTenLogGenerator,
  tableBasesLogGenerator,
];