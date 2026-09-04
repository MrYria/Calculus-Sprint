import type { MathQuestion, GraphFunctionType, GraphTaskType } from '../../types/math';
import { generateRandomNumber, formatTerm, generateNonZeroRandomNumber } from './utils';
import type { IGraphProblemGenerator } from './utils';

export const paramVertexGivenGenerator: IGraphProblemGenerator = {
    id: 'param-vertex-given',
    minDifficulty: 7.0,
    maxDifficulty: 8.0,
    generate(difficulty: number): MathQuestion {
        const x_v = generateRandomNumber(-5, 5);
        const b = -2 * x_v;
        const c = generateRandomNumber(-10, 10);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = x^2 + bx ${formatTerm(c)}, \\quad \\text{find } b \\text{ if vertex } x = ${x_v}`,
            correctAnswer: b,
            difficulty
        };
    },
}

export const paramTangentRootGenerator: IGraphProblemGenerator = {
    id: 'param-tangent-root',
    minDifficulty: 7.2,
    maxDifficulty: 8.0,
    generate(difficulty: number): MathQuestion {
        const halfB = generateNonZeroRandomNumber(-4, 4);
        const b = halfB * 2;
        const c = halfB * halfB;
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = x^2 ${formatTerm(b, 'x')} + c, \\quad \\text{find } c \\text{ if } f(x) \\text{ touches } Ox`,
            correctAnswer: c,
            difficulty
        };
    },
}

export const ellipseSemiAxisGenerator: IGraphProblemGenerator = {
    id: 'ellipse-semi-axis',
    minDifficulty: 7.0,
    maxDifficulty: 8.0,
    generate(difficulty: number): MathQuestion {
        const a = generateRandomNumber(2, 10);
        const b = a + generateRandomNumber(1, 4);
        const A2 = a * a;
        const B2 = b * b;
        return {
            id: crypto.randomUUID(),
            latex: `\\frac{x^2}{${A2}} + \\frac{y^2}{${B2}} = 1, \\quad \\text{find larger semi-axis}`,
            correctAnswer: b,
            difficulty
        };
    },
}

export const circleRadiusGenerator: IGraphProblemGenerator = {
    id: 'circle-radius',
    minDifficulty: 7.3,
    maxDifficulty: 8.0,
    generate(difficulty: number): MathQuestion {
        const r = generateNonZeroRandomNumber(2, 16);
        const r2 = r * r;
        const x_0 = generateRandomNumber(-6, 6);
        const y_0 = generateRandomNumber(-6, 6);
        return {
            id: crypto.randomUUID(),
            latex: `(x ${formatTerm(-x_0)})^2 + (y ${formatTerm(-y_0)})^2 = ${r2}, \\quad \\text{find radius } R = ?`,
            correctAnswer: r,
            difficulty
        };
    },
}

export const hyperbolaAsymptoteSlopeGenerator: IGraphProblemGenerator = {
    id: 'hyperbola-asymptote-slope',
    minDifficulty: 7.3,
    maxDifficulty: 8.0,
    generate(difficulty: number): MathQuestion {
        const k = generateRandomNumber(2, 4);
        const a = generateRandomNumber(2, 4);
        const b = k * a;
        const A2 = a * a;
        const B2 = b * b;
        return {
            id: crypto.randomUUID(),
            latex: `\\frac{x^2}{${A2}} - \\frac{y^2}{${B2}} = 1, \\quad \\text{find positive asymptote slope } k = ?`,
            correctAnswer: k,
            difficulty
        };
    },
}

export const trigGeneralRootsGenerator: IGraphProblemGenerator = {
    id: 'trig-general-roots',
    minDifficulty: 7.5,
    maxDifficulty: 8.0,
    generate(difficulty: number): MathQuestion {
        const divisors = [2, 3, 4, 5, 6, 9, 10, 12];
        const k = divisors[generateRandomNumber(0, divisors.length - 1)];
        const ansDegrees = 180 / k;

        return {
            id: crypto.randomUUID(),
            latex: `f(x) = \\sin(${k}x), \\quad \\text{find smallest root (in degrees)} = ?^\\circ`,
            correctAnswer: ansDegrees,
            difficulty,
        };
    },
}

export const conicsGenerator: IGraphProblemGenerator[] = [
    paramVertexGivenGenerator,
    paramTangentRootGenerator,
    ellipseSemiAxisGenerator,
    circleRadiusGenerator,
    hyperbolaAsymptoteSlopeGenerator,
    trigGeneralRootsGenerator
];