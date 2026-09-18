import type { MathQuestion } from '../../types/math';
import { formatTerm, generateRandomNumber } from '../../helper/utils';
import type { IIntegralGenerator } from '../../types/generators';

export const linearChainCubeGenerator: IIntegralGenerator = {
    id: 'integral-linear-chain-cube',
    minDifficulty: 4.5,
    maxDifficulty: 6.0,
    taskType: 'substitution',
    generate(difficulty): MathQuestion {
        const k = generateRandomNumber(1, 4);
        const c = generateRandomNumber(1, 3);
        const b = generateRandomNumber(1, 3);

        const Fb = k * Math.pow(b + c, 3);
        const F0 = k * Math.pow(c, 3);

        return {
            id: crypto.randomUUID(),
            latex: `\\int_{0}^{${b}} ${3 * k}(x ${formatTerm(c)})^2 \\, dx = ?`,
            correctAnswer: Fb - F0,
            difficulty,
        };
    },
};

export const linearChainQuarticGenerator: IIntegralGenerator = {
    id: 'integral-linear-chain-quartic',
    minDifficulty: 4.8,
    maxDifficulty: 6.2,
    taskType: 'substitution',
    generate(difficulty): MathQuestion {
        const k = generateRandomNumber(1, 4);
        const b = generateRandomNumber(2, 4);

        return {
            id: crypto.randomUUID(),
            latex: `\\int_{1}^{${b}} ${4 * k}(x - 1)^3 \\, dx = ?`,
            correctAnswer: k * Math.pow(b - 1, 4),
            difficulty,
        };
    },
};

export const trigOrthogonalGenerator: IIntegralGenerator = {
    id: 'integral-trig-orthogonal',
    minDifficulty: 4.5,
    maxDifficulty: 5.8,
    taskType: 'trig',
    generate(difficulty): MathQuestion {
        const a = generateRandomNumber(2, 8);
        const b = generateRandomNumber(2, 8);

        return {
            id: crypto.randomUUID(),
            latex: `\\int_{0}^{\\frac{\\pi}{2}} (${a}\\sin(x) ${formatTerm(b, '\\cos(x)')}) \\, dx = ?`,
            correctAnswer: a + b,
            difficulty,
        };
    },
};

export const uSubQuadraticCubeGenerator: IIntegralGenerator = {
    id: 'integral-u-sub-quadratic-cube',
    minDifficulty: 5.5,
    maxDifficulty: 7.0,
    taskType: 'substitution',
    generate(difficulty): MathQuestion {
        const k = generateRandomNumber(1, 3);
        const c = generateRandomNumber(1, 3);

        const Fb = k * Math.pow(1 + c, 3);
        const Fa = k * Math.pow(c, 3);

        return {
            id: crypto.randomUUID(),
            latex: `\\int_{0}^{1} ${6 * k}x(x^2 ${formatTerm(c)})^2 \\, dx = ?`,
            correctAnswer: Fb - Fa,
            difficulty,
        };
    },
};

export const uSubQuadraticSquareGenerator: IIntegralGenerator = {
    id: 'integral-u-sub-quadratic-square',
    minDifficulty: 5.2,
    maxDifficulty: 6.8,
    taskType: 'substitution',
    generate(difficulty): MathQuestion {
        const k = generateRandomNumber(1, 4);

        return {
            id: crypto.randomUUID(),
            latex: `\\int_{0}^{2} ${4 * k}x(x^2 + 1) \\, dx = ?`,
            correctAnswer: 24 * k,
            difficulty,
        };
    },
};

export const uSubTrigSquareGenerator: IIntegralGenerator = {
    id: 'integral-u-sub-trig-square',
    minDifficulty: 5.4,
    maxDifficulty: 7.0,
    taskType: 'substitution',
    generate(difficulty): MathQuestion {
        const k = generateRandomNumber(2, 8);

        return {
            id: crypto.randomUUID(),
            latex: `\\int_{0}^{\\frac{\\pi}{2}} ${3 * k}\\sin^2(x)\\cos(x) \\, dx = ?`,
            correctAnswer: k,
            difficulty,
        };
    },
};

export const substitutionIntegrals: IIntegralGenerator[] = [
    linearChainCubeGenerator,
    linearChainQuarticGenerator,
    trigOrthogonalGenerator,
    uSubQuadraticCubeGenerator,
    uSubQuadraticSquareGenerator,
    uSubTrigSquareGenerator,
];