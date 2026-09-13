import type { MathQuestion } from '../../types/math';
import { generateRandomNumber } from '../../helper/utils';
import type { IPowersProblemGenerator } from '../../helper/utils';

export const squareRootsGenerator: IPowersProblemGenerator = {
  id: 'roots-square',
  minDifficulty: 1.0,
  maxDifficulty: 8.0,
  generate(difficulty: number): MathQuestion {
    let answer = generateRandomNumber(2, 10);

    if (difficulty > 6.5) {
      answer = generateRandomNumber(26, 50);
    } else if (difficulty > 4.5) {
      answer = generateRandomNumber(11, 25);
    }

    const x = answer * answer;
    return {
      id: crypto.randomUUID(),
      latex: `\\sqrt{${x}} = ?`,
      correctAnswer: answer,
      difficulty,
    };
  },
};

export const cubeRootsGenerator: IPowersProblemGenerator = {
  id: 'roots-cube',
  minDifficulty: 2.0,
  maxDifficulty: 7.0,
  generate(difficulty: number): MathQuestion {
    let answer = generateRandomNumber(2, 5); 

    if (difficulty > 4.5) {
      answer = generateRandomNumber(6, 10); 
    }

    const x = Math.pow(answer, 3);
    return {
      id: crypto.randomUUID(),
      latex: `\\sqrt[3]{${x}} = ?`,
      correctAnswer: answer,
      difficulty,
    };
  },
};
export const higherRootsGenerator: IPowersProblemGenerator = {
  id: 'roots-higher',
  minDifficulty: 3.5,
  maxDifficulty: 8.0,
  generate(difficulty: number): MathQuestion {
    const isBaseTwo = generateRandomNumber(0, 1) === 0;

    if (isBaseTwo) {
      const answer = 2;
      const deg = generateRandomNumber(4, 8); 
      const x = Math.pow(answer, deg);
      return {
        id: crypto.randomUUID(),
        latex: `\\sqrt[${deg}]{${x}} = ?`,
        correctAnswer: answer,
        difficulty,
      };
    } else {
      const answer = 3;
      const deg = 4; 
      const x = 81;
      return {
        id: crypto.randomUUID(),
        latex: `\\sqrt[${deg}]{${x}} = ?`,
        correctAnswer: answer,
        difficulty,
      };
    }
  },
};

export const rootsGenerators: IPowersProblemGenerator[] = [
  squareRootsGenerator,
  cubeRootsGenerator,
  higherRootsGenerator,
];