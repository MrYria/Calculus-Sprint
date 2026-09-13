import type { MathQuestion } from '../../types/math';
import { generateRandomNumber } from '../../helper/utils';
import type { IPowersProblemGenerator } from '../../helper/utils';

export const squaresPowerGenerator: IPowersProblemGenerator = {
  id: 'powers-squares',
  minDifficulty: 1.0,
  maxDifficulty: 8.0,
  generate(difficulty: number): MathQuestion {
    const exp = 2;
    let base = generateRandomNumber(2, 10);

    if (difficulty > 6.5) {
      base = generateRandomNumber(26, 50);
    } else if (difficulty > 4.5) {
      base = generateRandomNumber(11, 25);
    }

    const answer = base * base;
    return {
      id: crypto.randomUUID(),
      latex: `${base}^{${exp}} = ?`,
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
    const isBaseTwo = generateRandomNumber(0, 1) === 0;

    if (isBaseTwo) {
      const base = 2;
      let exp = generateRandomNumber(3, 7); 

      if (difficulty > 6.5) {
        exp = generateRandomNumber(11, 16);
      } else if (difficulty > 4.0) {
        exp = generateRandomNumber(7, 10); 
      }

      return {
        id: crypto.randomUUID(),
        latex: `${base}^{${exp}} = ?`,
        correctAnswer: Math.pow(base, exp),
        difficulty,
      };
    } else {
      const base = 3;
      let exp = generateRandomNumber(2, 4); 

      if (difficulty > 5.0) {
        exp = generateRandomNumber(4, 6);  
      }

      return {
        id: crypto.randomUUID(),
        latex: `${base}^{${exp}} = ?`,
        correctAnswer: Math.pow(base, exp),
        difficulty,
      };
    }
  },
};

export const cubesAndHigherPowerGenerator: IPowersProblemGenerator = {
  id: 'powers-cubes-higher',
  minDifficulty: 2.5,
  maxDifficulty: 7.0,
  generate(difficulty: number): MathQuestion {
    const roll = generateRandomNumber(0, 1);
    if (roll === 0) {
      const base = generateRandomNumber(2, 9);
      const exp = 3;
      return {
        id: crypto.randomUUID(),
        latex: `${base}^{${exp}} = ?`,
        correctAnswer: Math.pow(base, exp),
        difficulty,
      };
    } else {
      const base = generateRandomNumber(2, 5);
      const exp = 4;
      return {
        id: crypto.randomUUID(),
        latex: `${base}^{${exp}} = ?`,
        correctAnswer: Math.pow(base, exp),
        difficulty,
      };
    }
  },
};

export const powersGenerators: IPowersProblemGenerator[] = [
  squaresPowerGenerator,
  powersOfTwoAndThreeGenerator,
  cubesAndHigherPowerGenerator,
];