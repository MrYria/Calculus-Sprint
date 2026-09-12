import type { MathQuestion } from '../../types/math';
import type { IArithmeticProblemGenerator } from '../../helper/utils';
import { generateRandomNumber } from '../graphs/utils';

export const tableDivisionGenerator: IArithmeticProblemGenerator = {
    id: 'table-division',
    minDifficulty: 1.0,
    maxDifficulty: 2.5,
    taskType: 'Division',
    generate(difficulty): MathQuestion {
        const num1 = generateRandomNumber(2, 9);
        const num2 = generateRandomNumber(2, 10);
        const dividend = num1 * num2;
        return {
            id: crypto.randomUUID(),
            latex: `${dividend} \\div ${num2} = ?`,
            correctAnswer: num1,
            difficulty
        }
    },
}

export const multiBySingleDivisionGenerator: IArithmeticProblemGenerator = {
    id: 'multi-by-single-division',
    minDifficulty: 2.0,
    maxDifficulty: 5.3,
    taskType: 'Division',
    generate(difficulty): MathQuestion {
        const num1 = generateRandomNumber(2, 9);
        let num2 = generateRandomNumber(11, 99);
        if (difficulty >= 3.5) num2 = generateRandomNumber(100, 999);
        const dividend = num1 * num2;
        return {
            id: crypto.randomUUID(),
            latex: `${dividend} \\div ${num2} = ?`,
            correctAnswer: num1,
            difficulty
        }
    },
}

export const twoByTwoDivisionGenerator: IArithmeticProblemGenerator = {
    id: 'two-by-two-division',
    minDifficulty: 4.0,
    maxDifficulty: 8.0,
    taskType: 'Division',
    generate(difficulty): MathQuestion {
        let num1 = generateRandomNumber(11, 21);
        let num2 = generateRandomNumber(11, 99);
        if (difficulty >= 6.5) {
            num1 = generateRandomNumber(18, 34);
            num2 = generateRandomNumber(100, 999);
        }
        const dividend = num1 * num2;
        return {
            id: crypto.randomUUID(),
            latex: `${dividend} \\div ${num2} = ?`,
            correctAnswer: num1,
            difficulty
        }
    },
}

export const hardcoreDivisionGenerator: IArithmeticProblemGenerator = {
    id: 'hardcore-division',
    minDifficulty: 6.5,
    maxDifficulty: 8.0,
    taskType: 'Division',
    generate(difficulty): MathQuestion {
        let num1 = generateRandomNumber(11, 50);
        let num2 = generateRandomNumber(100, 1500);
        const dividend = num1 * num2;
        return {
            id: crypto.randomUUID(),
            latex: `${dividend} \\div ${num2} = ?`,
            correctAnswer: num1,
            difficulty
        }
    },
}

export const divisionGenerators: IArithmeticProblemGenerator[] = [
  tableDivisionGenerator,
  multiBySingleDivisionGenerator,
  twoByTwoDivisionGenerator,
  hardcoreDivisionGenerator,
];