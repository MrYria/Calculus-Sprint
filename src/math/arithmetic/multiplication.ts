import type { MathQuestion } from '../../types/math';
import type { IArithmeticProblemGenerator } from '../../helper/utils';
import { generateRandomNumber } from '../../helper/utils';

export const tableMultiplicationGenerator: IArithmeticProblemGenerator = {
    id: 'table-multiplication',
    minDifficulty: 1.0,
    maxDifficulty: 2.5,
    taskType: 'Multiplication',
    generate(difficulty): MathQuestion {
        const num1 = generateRandomNumber(2, 9);
        const num2 = generateRandomNumber(2, 10);
        const answer = num1 * num2;
        return {
            id: crypto.randomUUID(),
            latex: `${num1} \\times ${num2} = ?`,
            correctAnswer: answer,
            difficulty
        }
    },
}

export const multiBySingleMultiplicationGenerator: IArithmeticProblemGenerator = {
    id: 'multi-by-single-multiplication',
    minDifficulty: 2.0,
    maxDifficulty: 5.3,
    taskType: 'Multiplication',
    generate(difficulty): MathQuestion {
        const num1 = generateRandomNumber(2, 9);
        let num2 = generateRandomNumber(11, 99);
        if (difficulty >= 3.5) num2 = generateRandomNumber(100, 999);
        const answer = num1 * num2;
        return {
            id: crypto.randomUUID(),
            latex: `${num1} \\times ${num2} = ?`,
            correctAnswer: answer,
            difficulty
        }
    },
}

export const twoByTwoMultiplicationGenerator: IArithmeticProblemGenerator = {
    id: 'two-by-two-multiplication',
    minDifficulty: 4.0,
    maxDifficulty: 8.0,
    taskType: 'Multiplication',
    generate(difficulty): MathQuestion {
        let num1 = generateRandomNumber(11, 21);
        let num2 = generateRandomNumber(11, 99);
        if (difficulty >= 6.5) {
            num1 = generateRandomNumber(18, 34);
            num2 = generateRandomNumber(100, 999);
        }
        const answer = num1 * num2;
        return {
            id: crypto.randomUUID(),
            latex: `${num1} \\times ${num2} = ?`,
            correctAnswer: answer,
            difficulty
        }
    },
}

export const hardcoreMultiplicationGenerator: IArithmeticProblemGenerator = {
    id: 'hardcore-multiplication',
    minDifficulty: 6.5,
    maxDifficulty: 8.0,
    taskType: 'Multiplication',
    generate(difficulty): MathQuestion {
        let num1 = generateRandomNumber(11, 50);
        let num2 = generateRandomNumber(100, 1500);
        const answer = num1 * num2;
        return {
            id: crypto.randomUUID(),
            latex: `${num1} \\times ${num2} = ?`,
            correctAnswer: answer,
            difficulty
        }
    },
}

export const multiplicationGenerators: IArithmeticProblemGenerator[] = [
  tableMultiplicationGenerator,
  multiBySingleMultiplicationGenerator,
  twoByTwoMultiplicationGenerator,
  hardcoreMultiplicationGenerator,
];