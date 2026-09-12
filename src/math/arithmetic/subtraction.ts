import type { MathQuestion } from '../../types/math';
import { generateRandomOperand, type IArithmeticProblemGenerator } from '../../helper/utils';

export const substractionGenerator: IArithmeticProblemGenerator = {
    id: 'any-substraction',
    minDifficulty: 1.0,
    maxDifficulty: 7.5,
    taskType: 'Subtraction',
    generate(difficulty): MathQuestion {
        const num1 = generateRandomOperand(difficulty);
        const num2 = generateRandomOperand(difficulty);
        const answer = num1 - num2;
        return {
            id: crypto.randomUUID(),
            latex: `${num1} - ${num2} = ?`,
            correctAnswer: answer,
            difficulty
        }
    },
}