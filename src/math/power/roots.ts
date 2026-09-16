import type { MathQuestion } from '../../types/math';
import { generateRandomNumber, getRandomMultipleOfFive } from '../../helper/utils';
import type { IPowerGenerator } from '../../types/generators';


export const squareRootsGenerator: IPowerGenerator = {
  id: 'roots-square',
  minDifficulty: 1.0,
  maxDifficulty: 8.0,
  generate(difficulty: number): MathQuestion {
    let answer = 2;
    if (difficulty < 2.0) {
      answer = generateRandomNumber(2, 9); 
    } else if (difficulty < 3.0) {
      answer = generateRandomNumber(10, 15);
    } else if (difficulty < 4.0) {
      answer = generateRandomNumber(15, 22); 
    } else if (difficulty < 5.0) {
      answer = generateRandomNumber(21, 26); 
    } else if (difficulty < 6.0) {
      answer = getRandomMultipleOfFive(25, 95); 
    } else {
      answer = generateRandomNumber(27, 50);
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

export const cubeRootsGenerator: IPowerGenerator = {
  id: 'roots-cube',
  minDifficulty: 2.0,
  maxDifficulty: 7.5,
  generate(difficulty: number): MathQuestion {
    let answer = 2;

    if (difficulty < 3.5) {
      answer = generateRandomNumber(2, 5);
    } else if (difficulty < 5.0) {
      answer = generateRandomNumber(6, 9); 
    } else {
      answer = generateRandomNumber(10, 14);
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

export const higherRootsGenerator: IPowerGenerator = {
  id: 'roots-higher',
  minDifficulty: 3.5,
  maxDifficulty: 8.0,
  generate(difficulty: number): MathQuestion {
    let deg = 4;
    let answer = 2;

    if (difficulty < 5.0) {
      deg = generateRandomNumber(4, 6); 
      answer = 2;
    } else if (difficulty < 6.5) {
      deg = generateRandomNumber(7, 9); 
      answer = 2;
    } else {
      deg = generateRandomNumber(10, 12); 
      answer = 2;
    }

    const x = Math.pow(answer, deg);
    return {
      id: crypto.randomUUID(),
      latex: `\\sqrt[${deg}]{${x}} = ?`,
      correctAnswer: answer,
      difficulty,
    };
  },
};

export const rootsGenerators: IPowerGenerator[] = [
  squareRootsGenerator,
  cubeRootsGenerator,
  higherRootsGenerator,
];