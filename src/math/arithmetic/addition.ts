import type { MathQuestion } from '../../types/math';
import { generateRandomOperand, type IArithmeticProblemGenerator } from '../../helper/utils';

export const additionGenerator: IArithmeticProblemGenerator = {
    id: 'any-addition',
    minDifficulty: 1.0,
    maxDifficulty: 7.5,
    taskType: 'Addition',
    generate(difficulty): MathQuestion {
        const num1 = generateRandomOperand(difficulty);
        const num2 = generateRandomOperand(difficulty);
        const answer = num1 + num2;
        return {
            id: crypto.randomUUID(),
            latex: `${num1} + ${num2} = ?`,
            correctAnswer: answer,
            difficulty
        }
    },
}