import type { MathQuestion } from '../../types/math';
import { generateRandomNumber, formatTerm, generateNonZeroRandomNumber } from '../../helper/utils';
import type { IDerivativeGenerator } from '../../types/generators';

export const quotientExpCompositeGenerator: IDerivativeGenerator = {
    id: 'derivative-quotient-exp',
    minDifficulty: 6.2,
    maxDifficulty: 8.0,
    taskType: 'composite',
    generate(difficulty): MathQuestion {
        const a = generateRandomNumber(1, 8);
        const k = generateRandomNumber(a + 1, a + 6);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = \\frac{e^{${k}x}}{${a === 1 ? '' : a}x + 1}, \\quad f'(0) = ?`,
            correctAnswer: k - a,
            difficulty
        };
    },
}

export const rootQuadraticCompositeGenerator: IDerivativeGenerator = {
    id: 'derivative-root-quadratic',
    minDifficulty: 6.4,
    maxDifficulty: 8.0,
    taskType: 'composite',
    generate(difficulty): MathQuestion {
        const k = generateRandomNumber(1, 6);
        const a = generateRandomNumber(2, 6);
        const b = 6 * k - 2 * a;
        const c = 9 - a - b;
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = \\sqrt{${a}x^2 ${formatTerm(b, 'x')} ${formatTerm(c)}}, \\quad f'(1) = ?`,
            correctAnswer: k,
            difficulty
        };
    },
}

export const productExpCompositeGenerator: IDerivativeGenerator = {
    id: 'derivative-product-exp',
    minDifficulty: 6.5,
    maxDifficulty: 8.0,
    taskType: 'composite',
    generate(difficulty): MathQuestion {
        const c = generateRandomNumber(2, 6);
        const d = generateRandomNumber(2, 8);
        const k = generateRandomNumber(2, 5);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = (${c}x + ${d})e^{${k}x}, \\quad f'(0) = ?`,
            correctAnswer: c + d * k,
            difficulty
        };
    },
}

export const quotientTrigCompositeGenerator: IDerivativeGenerator = {
    id: 'derivative-quotient-trig',
    minDifficulty: 6.8,
    maxDifficulty: 8.0,
    taskType: 'composite',
    generate(difficulty): MathQuestion {
        const b = generateRandomNumber(2, 6);
        const c = generateRandomNumber(1, 6);
        const k = generateRandomNumber(b * c + 1, b * c + 6);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = \\frac{\\sin(${k}x) + ${b}}{${c === 1 ? '' : c}x + 1}, \\quad f'(0) = ?`,
            correctAnswer: k - b * c,
            difficulty
        };
    },
}

export const chainQuadraticCubeCompositeGenerator: IDerivativeGenerator = {
    id: 'derivative-chain-quadratic-cube',
    minDifficulty: 6.7,
    maxDifficulty: 8.0,
    taskType: 'composite',
    generate(difficulty): MathQuestion {
        const a = generateRandomNumber(2,6);
        const b = generateRandomNumber(-8,-1);
        const c = 1 - a - b
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = (${a}x^2 ${formatTerm(b, 'x')} ${formatTerm(c)})^3, \\quad f'(1) = ?`,
            correctAnswer: 3 * (2 * a + b),
            difficulty
        };
    },
}

export const complexExpLinearCompositeGenerator: IDerivativeGenerator = {
    id: 'derivative-complex-exp-linear',
    minDifficulty: 6.2,
    maxDifficulty: 8.0,
    taskType: 'composite',
    generate(difficulty): MathQuestion {
        const a = generateRandomNumber(2,6);
        const b = generateRandomNumber(3,8);
        const c = generateNonZeroRandomNumber(-9,9);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = e^{${a}x^2 ${formatTerm(b, 'x')}} ${formatTerm(c, 'x')}, \\quad f'(0) = ?`,
            correctAnswer: b+c,
            difficulty
        };
    },
}


export const compositeDerivatives: IDerivativeGenerator[] = [
    quotientExpCompositeGenerator,
    rootQuadraticCompositeGenerator,
    productExpCompositeGenerator,
    quotientTrigCompositeGenerator,
    chainQuadraticCubeCompositeGenerator,
    complexExpLinearCompositeGenerator,
];