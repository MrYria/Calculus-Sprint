import { generateNonZeroRandomNumber } from '../../helper/utils';
import type { MathQuestion, GraphFunctionType, GraphTaskType } from '../../types/math';
import {generateRandomNumber, formatTerm} from '../../helper/utils';
import type {IGraphProblemGenerator} from '../../helper/utils';

export const linearYInterceptGenerator: IGraphProblemGenerator = {
    id: 'linear-y-intercept',
    minDifficulty: 1.0,
    maxDifficulty: 2.0,
    generate(difficulty: number): MathQuestion {

        let k = generateNonZeroRandomNumber(-8, 8);
        const b = generateRandomNumber(-12, 12);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${k}x ${formatTerm(b)}, \\quad \\text{find f(0) = ?}`,
            correctAnswer: b,
            difficulty
        };
    },
};

export const linearSlopeGenerator: IGraphProblemGenerator = {
    id: 'linear-slope',
    minDifficulty: 1.0,
    maxDifficulty: 2.2,
    generate(difficulty: number): MathQuestion {
        const k = generateNonZeroRandomNumber(-14, 14);
        const b = generateRandomNumber(-12, 12);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${k}x ${formatTerm(b)}, \\quad \\text{find } k = ?`,
            correctAnswer: k,
            difficulty
        };
    },
}

export const linearRootGenerator: IGraphProblemGenerator = {
    id: 'linear-root',
    minDifficulty: 1.2,
    maxDifficulty: 2.5,
    generate(difficulty: number): MathQuestion {
        let k = generateNonZeroRandomNumber(-5, 5);
        const x_0 = generateRandomNumber(-6, 6);
        const b = -k * x_0
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${k}x ${formatTerm(b)}, \\quad \\text{find f(x) = 0 } x = ?`,
            correctAnswer: x_0,
            difficulty
        };
    },
}

export const linearEvalXGenerator: IGraphProblemGenerator = {
    id: 'linear-eval-x',
    minDifficulty: 1.0,
    maxDifficulty: 2.0,
    generate(difficulty: number): MathQuestion {
        let k = generateNonZeroRandomNumber(-4, 4);
        const b = generateRandomNumber(-6, 6);
        const x_0 = generateRandomNumber(1, 6);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${k}x ${formatTerm(b)}, \\quad \\text{find } f(${x_0}) = ?`,
            correctAnswer: k * x_0 + b,
            difficulty
        };
    },
}

export const linearFindXByYGenerator: IGraphProblemGenerator = {
    id: 'linear-find-x-by-y',
    minDifficulty: 1.2,
    maxDifficulty: 2.2,
    generate(difficulty: number): MathQuestion {
        const x_0 = generateRandomNumber(-5, 5);
        let k = generateNonZeroRandomNumber(-6, 6);
        const b = generateRandomNumber(-10, 10);
        const y_0 = k * x_0 + b;
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${k}x ${formatTerm(b)}, \\quad \\text{find } x \\text{ if } f(x) = ${y_0}`,
            correctAnswer: x_0,
            difficulty
        };
    },
}

export const linesIntersectionGenerator: IGraphProblemGenerator = {
    id: 'lines-intersection',
    minDifficulty: 2.2,
    maxDifficulty: 3.4,
    generate(difficulty: number): MathQuestion {
        const x_0 = generateRandomNumber(-5, 5);
        const k_1 = generateNonZeroRandomNumber(-8, 8);
        let k_2 = generateNonZeroRandomNumber(-8, 8);
        while (k_1 === k_2) k_2 = generateNonZeroRandomNumber(-8, 8);
        const b_1 = generateRandomNumber(-10, 10);
        const b_2 = (k_1 - k_2) * x_0 + b_1;
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${k_1}x ${formatTerm(b_1)} , g(x) = ${k_2}x ${formatTerm(b_2)} , \\quad \\text{find the intersection of two graphs } x = ?`,
            correctAnswer: x_0,
            difficulty
        };
    },
}

export const linearGenerators: IGraphProblemGenerator[] = [
  linearYInterceptGenerator,
  linearSlopeGenerator,
  linearRootGenerator,
  linearEvalXGenerator,
  linearFindXByYGenerator,
  linesIntersectionGenerator
];