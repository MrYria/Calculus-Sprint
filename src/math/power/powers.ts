
import type { MathQuestion } from '../../types/math';
import { generateRandomNumber, getRandomMultipleOfFive } from '../../helper/utils';
import type { IPowersProblemGenerator } from '../../helper/utils';

export const squaresPowerGenerator: IPowersProblemGenerator = {
  id: 'powers-squares',
  minDifficulty: 1.0,
  maxDifficulty: 8.0,
  generate(difficulty: number): MathQuestion {
    let base = 2;

    if (difficulty < 2.0) {
      base = generateRandomNumber(2, 9);
    } else if (difficulty < 3.0) {
      base = generateRandomNumber(10, 15);
    } else if (difficulty < 4.0) {
      base = generateRandomNumber(15, 22);
    } else if (difficulty < 5.0) {
      base = generateRandomNumber(21, 26);
    } else if (difficulty < 6.0) {
      base = getRandomMultipleOfFive(25, 95); 
    } else {
      base = generateRandomNumber(27, 50);
    }

    const answer = base * base;
    return {
      id: crypto.randomUUID(),
      latex: `${base}^2 = ?`,
      correctAnswer: answer,
      difficulty,
    };
  },
};

export const powersOfTwoAndThreeGenerator: IPowersProblemGenerator = {
  id: 'powers-two-three',
  minDifficulty: 2.0,
  maxDifficulty: 8.0,
  generate(difficulty: number): MathQuestion {
    let base = 2;
    let exp = 3;

    if (difficulty < 3.0) {
      base = 2;
      exp = generateRandomNumber(3, 6); 
    } else if (difficulty < 4.0) {
      base = 2;
      exp = generateRandomNumber(7, 9); 
    } else if (difficulty < 5.0) {
      if (generateRandomNumber(0, 1) === 0) {
        base = 2;
        exp = generateRandomNumber(9, 11); 
      } else {
        base = 3;
        exp = generateRandomNumber(3, 4); 
      }
    } else if (difficulty < 6.0) {
      if (generateRandomNumber(0, 1) === 0) {
        base = 2;
        exp = generateRandomNumber(11, 13); 
      } else {
        base = 3;
        exp = generateRandomNumber(5, 6); 
      }
    } else {
      base = 2;
      exp = generateRandomNumber(14, 16); 
    }

    return {
      id: crypto.randomUUID(),
      latex: `${base}^{${exp}} = ?`,
      correctAnswer: Math.pow(base, exp),
      difficulty,
    };
  },
};

export const cubesAndHigherPowerGenerator: IPowersProblemGenerator = {
  id: 'powers-cubes-higher',
  minDifficulty: 2.5,
  maxDifficulty: 7.5,
  generate(difficulty: number): MathQuestion {
    let base = 2;
    let exp = 3;

    if (difficulty < 3.5) {
      base = generateRandomNumber(2, 5); 
      exp = 3;
    } else if (difficulty < 4.5) {
      base = generateRandomNumber(6, 9); 
      exp = 3;
    } else if (difficulty < 5.5) {
      base = generateRandomNumber(2, 5); 
      exp = 4;
    } else {
      base = generateRandomNumber(10, 13); 
      exp = 3;
    }

    return {
      id: crypto.randomUUID(),
      latex: `${base}^{${exp}} = ?`,
      correctAnswer: Math.pow(base, exp),
      difficulty,
    };
  },
};

export const powersGenerators: IPowersProblemGenerator[] = [
  squaresPowerGenerator,
  powersOfTwoAndThreeGenerator,
  cubesAndHigherPowerGenerator,
];