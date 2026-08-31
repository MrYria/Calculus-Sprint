import type { MathQuestion, GraphFunctionType, GraphTaskType } from '../../types/math';
import {generateRandomNumber, formatTerm} from './utils';
import type {IGraphProblemGenerator} from './utils';

export const parabolaVertexXGenerator: IGraphProblemGenerator = {
    id: 'parabolaVertexX',
    minDifficulty: 1.8,
    maxDifficulty: 2.8,
    generate(difficulty: number): MathQuestion {
        const x_v = generateRandomNumber(-5, 5);
        let a = generateRandomNumber(-2, 3);
        while (a === 0) a = generateRandomNumber(-2, 3);
        const b = -2 * a * x_v
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${a}x^2 ${formatTerm(b, 'x')}, \\quad \\text{find vertex X in parabola} x_v = ?`,
            correctAnswer: x_v,
            difficulty
        };
    },
};

export const quadraticRootsGenerator: IGraphProblemGenerator = {
    id: 'quadraticRoots',
    minDifficulty: 2.0,
    maxDifficulty: 3.2,
    generate(difficulty: number): MathQuestion {
        const x_1 = generateRandomNumber(-5, 3);
        const x_2 = x_1 + generateRandomNumber(1, 6);
        const b = (x_1 + x_2) * -1;
        const c = x_1 * x_2;
        let isSmaller = generateRandomNumber(0, 1);
        const targetRoot = isSmaller ? x_1 : x_2;
        const word = isSmaller ? 'smaller' : 'larger';
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = x^2 ${formatTerm(b, 'x')} ${formatTerm(c)}, \\quad \\text{find ${word} root } x = ?`,
            correctAnswer: targetRoot,
            difficulty,
        };
    },
}

export const quadraticYInterceptGenerator: IGraphProblemGenerator = {
    id: 'quadratic-Y-intercept',
    minDifficulty: 1.8,
    maxDifficulty: 2.6,
    generate(difficulty: number): MathQuestion {
        let a = generateRandomNumber(-6, 6);
        while (a === 0) a = generateRandomNumber(-6, 6);
        const b = generateRandomNumber(-10, 10);
        const c = generateRandomNumber(-10, 10);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${a === 1 ? '' : a === -1 ? '-' : a}x^2 ${formatTerm(b, 'x')} ${formatTerm(c)}, \\quad \\text{find } f(0) = ?`,
            correctAnswer: c,
            difficulty,
        };
    },
}

export const parabolaRangeBoundGenerator: IGraphProblemGenerator = {
    id: 'parabolaRangeBound',
    minDifficulty: 2.0,
    maxDifficulty: 3.0,
    generate(difficulty: number): MathQuestion {
        let a = generateRandomNumber(-8, 8);
        while (a === 0) a = generateRandomNumber(-8, 8);
        const c = generateRandomNumber(-24, 24);
        let isMin = a > 0;
        const word = isMin ? 'min' : 'max';
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${a}x^2 ${formatTerm(c)}, \\quad \\text{find ${word} } y = ?`,
            correctAnswer: c,
            difficulty,
        };
    },
}


export const parabolaVertexYGenerator: IGraphProblemGenerator = {
    id: 'parabola-Vertex-Y',
    minDifficulty: 2.8,
    maxDifficulty: 3.8,
    generate(difficulty: number): MathQuestion {
        const x_v = generateRandomNumber(-4, 4);
        const y_v = generateRandomNumber(-8, 8);
        const a = generateRandomNumber(1, 2);
        const b = -2 * a * x_v;
        const c = a * x_v * x_v + y_v;
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${a === 1 ? '' : a === -1 ? '-' : a}x^2 ${formatTerm(b, 'x')} ${formatTerm(c)}, \\quad \\text{find vertex } y_v = ?`,
            correctAnswer: y_v,
            difficulty
        };
    },
};

export const parabolaRootsDistanceGenerator: IGraphProblemGenerator = {
    id: 'parabolaRootsDistance',
    minDifficulty: 3.0,
    maxDifficulty: 4.0,
    generate(difficulty: number): MathQuestion {
        const x_1 = generateRandomNumber(-6, 1);
        const dist = generateRandomNumber(2, 8);
        const x_2 = x_1 + dist;
        const b = -(x_1 + x_2)
        const c = x_1 * x_2;
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = x^2 ${formatTerm(b, 'x')} ${formatTerm(c)}, \\quad \\text{find distance between roots}`,
            correctAnswer: dist,
            difficulty
        };
    },
}

export const parabolaSignBoundaryGenerator: IGraphProblemGenerator = {
    id: 'parabolaSignBoundary',
    minDifficulty: 3.2,
    maxDifficulty: 4.2,
    generate(difficulty: number): MathQuestion {
        const x_1 = generateRandomNumber(-5,2);
        const x_2 = x_1 + generateRandomNumber(2, 6);
        const b = -(x_1 + x_2);
        const c = x_1 * x_2;
        const isLeft = generateRandomNumber(0, 1) === 0;
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = x^2 ${formatTerm(b, 'x')} ${formatTerm(c)}, \\quad \\text{find ${isLeft ? 'left' : 'right'} bound where } f(x) < 0`,
            correctAnswer: isLeft ? x_1 : x_2,
            difficulty
        };
    }
}

export const quadraticGenerators: IGraphProblemGenerator[] = [
  quadraticYInterceptGenerator,
  parabolaVertexXGenerator,
  quadraticRootsGenerator,
  parabolaRangeBoundGenerator,
  parabolaVertexYGenerator,
  parabolaRootsDistanceGenerator,
  parabolaSignBoundaryGenerator
];