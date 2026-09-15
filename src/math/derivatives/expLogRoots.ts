import type { MathQuestion } from '../../types/math';
import { generateRandomNumber, formatTerm } from '../../helper/utils';
import type { IDerivativesProblemsGenerator } from '../../helper/utils';

export const basicExpLogRootsDerivativeGenerator: IDerivativesProblemsGenerator = {
    id: 'derivative-basic-exp-log-roots',
    minDifficulty: 3.5,
    maxDifficulty: 5.2,
    taskType: 'expLogRoots',
    generate(difficulty): MathQuestion {
        const roll = generateRandomNumber(0, 2);
        if (roll === 1) {
            const a = generateRandomNumber(2, 7);
            const k = generateRandomNumber(2, 5);
            return {
                id: crypto.randomUUID(),
                latex: `f(x) = ${a}e^{${k}x}, \\quad f'(0) = ?`,
                correctAnswer: a * k,
                difficulty
            }
        } else if (roll === 2) {
            const x_0 = generateRandomNumber(2, 5);
            const k = generateRandomNumber(2, 6);
            const a = k * x_0;
            return {
                id: crypto.randomUUID(),
                latex: `f(x) = ${a}\\ln(x), \\quad f'(${x_0}) = ?`,
                correctAnswer: k,
                difficulty
            }
        }
        const roots = [{ x0: 4, sqrt: 2 }, { x0: 9, sqrt: 3 }];
        const selected = roots[generateRandomNumber(0, roots.length - 1)];
        const k = generateRandomNumber(1, 5);
        const a = k * (2 * selected.sqrt);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${a}\\sqrt{x}, \\quad f'(${selected.x0}) = ?`,
            correctAnswer: k,
            difficulty
        }
    },
}

export const expLogCombinationDerivativeGenerator: IDerivativesProblemsGenerator = {
    id: 'derivative-exp-log-combination',
    minDifficulty: 4.8,
    maxDifficulty: 6.2,
    taskType: 'expLogRoots',
    generate(difficulty): MathQuestion {
        const roll = generateRandomNumber(0, 1);
        if (roll === 1) {
            const a = generateRandomNumber(2, 5);
            const k = generateRandomNumber(2, 4);
            const b = generateRandomNumber(2, 5);
            const c = generateRandomNumber(-6, 6);
            return {
                id: crypto.randomUUID(),
                latex: `f(x) = ${a}e^{${k}x} ${formatTerm(b, 'x^2')} ${formatTerm(c, 'x')}, \\quad f'(0) = ?`,
                correctAnswer: a * k + c,
                difficulty
            }
        }
        const x0 = generateRandomNumber(2, 4);
        const k = generateRandomNumber(3, 7);
        const a = k * x0;
        const b = generateRandomNumber(1, 5);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${a}\\ln(x) ${formatTerm(-b, 'x')}, \\quad f'(${x0}) = ?`,
            correctAnswer: k - b,
            difficulty
        }
    },
}

export const expLogRootsDerivatives: IDerivativesProblemsGenerator[] = [
    basicExpLogRootsDerivativeGenerator,
    expLogCombinationDerivativeGenerator,
];