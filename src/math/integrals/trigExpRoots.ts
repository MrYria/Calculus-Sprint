import type { MathQuestion } from '../../types/math';
import { generateRandomNumber } from '../../helper/utils';
import type { IIntegralGenerator } from '../../types/generators';

export const trigDefiniteIntegralGenerator: IIntegralGenerator = {
    id: 'integral-trig-definite',
    minDifficulty: 2.8,
    maxDifficulty: 4.5,
    taskType: 'trig',
    generate(difficulty): MathQuestion {
        const roll = generateRandomNumber(0, 2);
        if (roll === 0) {
            const k = generateRandomNumber(2, 7);
            return {
                id: crypto.randomUUID(),
                latex: `\\int_{0}^{\\pi} ${k}\\sin(x) \\, dx = ?`,
                correctAnswer: 2 * k,
                difficulty,
            };
        } else if (roll === 1) {
            const a = generateRandomNumber(2, 7);
            const b = generateRandomNumber(1, 5);
            return {
                id: crypto.randomUUID(),
                latex: `\\int_{0}^{\\frac{\\pi}{2}} (${a}\\cos(x) - ${b}\\sin(x)) \\, dx = ?`,
                correctAnswer: a - b,
                difficulty,
            };
        } else {
            const k = generateRandomNumber(2, 8);
            return {
                id: crypto.randomUUID(),
                latex: `\\int_{0}^{\\frac{\\pi}{4}} \\frac{${k}}{\\cos^2(x)} \\, dx = ?`,
                correctAnswer: k,
                difficulty,
            };
        }
    },
}

export const expLogDefiniteIntegralGenerator: IIntegralGenerator = {
    id: 'integral-exp-log',
    minDifficulty: 3.5,
    maxDifficulty: 5.2,
    taskType: 'rational',
    generate(difficulty): MathQuestion {
        const roll = generateRandomNumber(0, 1) ? true : false;
        if (roll) {
            const m = generateRandomNumber(1, 4);
            const k = generateRandomNumber(2, 7);
            const upper = m === 1 ? 'e' : `e^{${m}}`;
            return {
                id: crypto.randomUUID(),
                latex: `\\int_{1}^{${upper}} \\frac{${k}}{x} \\, dx = ?`,
                correctAnswer: k * m,
                difficulty,
            };
        }
        const m = generateRandomNumber(3, 7);
        const k = generateRandomNumber(2, 5);
        return {
            id: crypto.randomUUID(),
            latex: `\\int_{0}^{\\ln(${m})} ${k === 1 ? '' : k}e^x \\, dx = ?`,
            correctAnswer: k * (m - 1),
            difficulty,
        };
    },
}

export const rootsDefiniteIntegralGenerator: IIntegralGenerator = {
    id: 'integral-roots-definite',
    minDifficulty: 3.5,
    maxDifficulty: 5.2,
    taskType: 'substitution',
    generate(difficulty): MathQuestion {
        const pairs = [
            { a: 1, b: 4, diff: 1 },
            { a: 1, b: 9, diff: 2 },
            { a: 4, b: 9, diff: 1 },
            { a: 4, b: 16, diff: 2 },
        ];
        const p = pairs[generateRandomNumber(0, pairs.length - 1)];
        const k = generateRandomNumber(2, 6);
        return {
            id: crypto.randomUUID(),
            latex: `\\int_{${p.a}}^{${p.b}} \\frac{${k}}{2\\sqrt{x}} \\, dx = ?`,
            correctAnswer: k * p.diff,
            difficulty,
        };
    },
}

export const trigExpRootsIntegrals: IIntegralGenerator[] = [
    trigDefiniteIntegralGenerator,
    expLogDefiniteIntegralGenerator,
    rootsDefiniteIntegralGenerator,
];