import type { MathQuestion} from '../../types/math';
import { generateRandomNumber, formatTerm} from '../../helper/utils';
import type { IDerivativesProblemsGenerator } from '../../helper/utils';

export const tableTrigDerivativeGenerator: IDerivativesProblemsGenerator = {
    id: 'derivative-table-trig',
    minDifficulty: 2.8,
    maxDifficulty: 4.5,
    taskType: 'trigonometry',
    generate(difficulty): MathQuestion {
        const roll = generateRandomNumber(0, 2);
        if (roll === 1) {
            const a = generateRandomNumber(2, 6);
            const k = generateRandomNumber(2, 4);
            return {
                id: crypto.randomUUID(),
                latex: `f(x) = ${a}\\sin(${k}x), \\quad f'(0) = ?`,
                correctAnswer: a * k,
                difficulty
            };
        } else if (roll === 2) {
            const a = generateRandomNumber(2, 9);
            return {
                id: crypto.randomUUID(),
                latex: `f(x) = ${a}\\cos(x), \\quad f'\\left(\\frac{\\pi}{2}\\right) = ?`,
                correctAnswer: -a,
                difficulty
            };
        }
        const a = generateRandomNumber(1, 5);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${a === 1 ? '' : a}\\tan(x), \\quad f'\\left(\\frac{\\pi}{4}\\right) = ?`,
            correctAnswer: 2 * a,
            difficulty
        };
    },
}

export const trigCombinationDerivativeGenerator: IDerivativesProblemsGenerator = {
    id: 'derivative-trig-combination',
    minDifficulty: 4.8,
    maxDifficulty: 6.2,
    taskType: 'trigonometry',
    generate(difficulty): MathQuestion {
        const a = generateRandomNumber(2, 6);
        const k = generateRandomNumber(2, 4);
        const b = generateRandomNumber(2, 8);
        const m = generateRandomNumber(2, 5);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${a}\\sin(${k}x) ${formatTerm(b, `\\cos(${m}x)`)}, \\quad f'(0) = ?`,
            correctAnswer: k * a,
            difficulty
        };
    }
}



export const trigonometryDerivatives: IDerivativesProblemsGenerator[] = [
    tableTrigDerivativeGenerator,
    trigCombinationDerivativeGenerator,
];