import type { MathQuestion, GraphFunctionType, GraphTaskType } from '../../types/math';
import { generateRandomNumber, formatTerm } from './utils';
import type { IGraphProblemGenerator } from './utils';


export const sqrtDomainMinGenerator: IGraphProblemGenerator = {
    id: 'sqrtDomainMin',
    minDifficulty: 2.8,
    maxDifficulty: 3.6,
    generate(difficulty: number): MathQuestion {
        let a = generateRandomNumber(-9, 9);
        while (a === 0) a = generateRandomNumber(-9, 9);
        const c = generateRandomNumber(-6, 6);

        return {
            id: crypto.randomUUID(),
            latex: `f(x) = \\sqrt{x ${formatTerm(-a)}} ${formatTerm(c)}, \\quad \\text{find min } x \\in D(f)`,
            correctAnswer: a,
            difficulty
        };
    }
}

export const cubicRootGenerator: IGraphProblemGenerator = {
    id: 'cubicRoot',
    minDifficulty: 3.0,
    maxDifficulty: 4.0,
    generate(difficulty: number): MathQuestion {
        let x_0 = generateRandomNumber(-4, 4)
        while (x_0 === 0) x_0 = generateRandomNumber(-4, 4);
        const cube = x_0 * x_0 * x_0;
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = x^3 ${formatTerm(-cube)}, \\quad \\text{find root } x = ?`,
            correctAnswer: x_0,
            difficulty
        };
    }
}

export const sqrtEvalPointGenerator: IGraphProblemGenerator = {
    id: 'sqrtEvalPoint',
    minDifficulty: 3.0,
    maxDifficulty: 4.0,
    generate(difficulty: number): MathQuestion {
        const ans = generateRandomNumber(2, 6);
        const S = ans * ans;
        const x_0 = generateRandomNumber(1, 8);
        const k = generateRandomNumber(2, 7);
        const b = S - k * x_0;
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = \\sqrt{${k}x ${formatTerm(b)}}, \\quad \\text{find } f(${x_0}) = ?`,
            correctAnswer: ans,
            difficulty
        };
    }
}

export const rootCubicsGenerators: IGraphProblemGenerator[] = [
    sqrtDomainMinGenerator,
    cubicRootGenerator,
    sqrtEvalPointGenerator
];