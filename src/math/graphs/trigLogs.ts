import type { MathQuestion, GraphFunctionType, GraphTaskType } from '../../types/math';
import { generateRandomNumber, formatTerm } from './utils';
import type { IGraphProblemGenerator } from './utils';

export const logDomainBoundGenerator: IGraphProblemGenerator = {
    id: 'log-domain-bound',
    minDifficulty: 4.8,
    maxDifficulty: 5.8,
    generate(difficulty: number): MathQuestion {
        const x_0 = generateRandomNumber(1, 8);
        const k = generateRandomNumber(2, 7);
        const m = k * x_0;
        const c = generateRandomNumber(-8, 8);

        return {
            id: crypto.randomUUID(),
            latex: `f(x) = \\ln(${k}x ${formatTerm(-m)}) ${formatTerm(c)}, \\quad \\text{find domain left bound } x = ?`,
            correctAnswer: x_0,
            difficulty,
        };
    },
}

export const logEquationRootGenerator: IGraphProblemGenerator = {
    id: 'log-equation-root',
    minDifficulty: 5.0,
    maxDifficulty: 6.0,
    generate(difficulty: number): MathQuestion {
        const x_0 = generateRandomNumber(2, 7);
        const a = generateRandomNumber(2, 5);
        const p = generateRandomNumber(2, 3);
        const k = generateRandomNumber(2, 4);
        const m = k * x_0 - Math.pow(a, p);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = \\log_{${a}}(${k}x ${formatTerm(-m)}) ${formatTerm(-p)}, \\quad \\text{find root } x = ?`,
            correctAnswer: x_0,
            difficulty,
        };
    },
}

export const trigAmplitudeMaxGenerator: IGraphProblemGenerator = {
    id: 'trig-amplitude-max',
    minDifficulty: 4.8,
    maxDifficulty: 5.8,
    generate(difficulty: number): MathQuestion {
        const A = generateRandomNumber(2, 8);
        const k = generateRandomNumber(2, 5);
        const C = generateRandomNumber(-10, 10);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${A}\\sin(${k}x) ${formatTerm(C)}, \\quad \\text{find max } y = ?`,
            correctAnswer: A + C,
            difficulty,
        };
    },
}

export const trigAmplitudeMinGenerator: IGraphProblemGenerator = {
    id: 'trig-amplitude-min',
    minDifficulty: 4.8,
    maxDifficulty: 5.6,
    generate(difficulty: number): MathQuestion {
        const A = generateRandomNumber(2, 7);
        const C = generateRandomNumber(-10, 10);
        const k = generateRandomNumber(2, 4);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${A}\\cos(${k}x) ${formatTerm(C)}, \\quad \\text{find min } y = ?`,
            correctAnswer: C - A,
            difficulty,
        };
    },
}

export const lineParabolaIntersectionGenerator: IGraphProblemGenerator = {
    id: 'line-parabola-intersection',
    minDifficulty: 5.2,
    maxDifficulty: 6.2,
    generate(difficulty: number): MathQuestion {
        const x1 = generateRandomNumber(-4, 2);
        const x2 = generateRandomNumber(x1 + 1, x1 + 6);
        const k = x1 + x2;
        const b = -x1 * x2;
        const kStr = k === 1 ? 'x' : k === -1 ? '-x' : k === 0 ? '' : `${k}x`;
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = x^2, \\quad g(x) = ${kStr} ${formatTerm(b)}, \\quad \\text{find larger intersection } x = ?`,
            correctAnswer: x2,
            difficulty,
        };
    },
}

export const quadraticLogRootGenerator: IGraphProblemGenerator = {
    id: 'quadratic-log-root',
    minDifficulty: 5.2,
    maxDifficulty: 6.0,
    generate(difficulty: number): MathQuestion {
        const x_0 = generateRandomNumber(2, 6);
        const p = generateRandomNumber(3, 4);
        const c = x_0 * x_0 - Math.pow(2, p);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = \\log_{2}(x^2 ${formatTerm(-c)}) ${formatTerm(-p)}, \\quad \\text{find positive root } x = ?`,
            correctAnswer: x_0,
            difficulty,
        };
    },
}



export const trigLogsGenerator: IGraphProblemGenerator[] = [
    logDomainBoundGenerator,
    logEquationRootGenerator,
    trigAmplitudeMaxGenerator,
    trigAmplitudeMinGenerator,
    lineParabolaIntersectionGenerator,
    quadraticLogRootGenerator
];