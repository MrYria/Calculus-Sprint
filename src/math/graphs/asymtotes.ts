import type { MathQuestion, GraphFunctionType, GraphTaskType } from '../../types/math';
import { generateRandomNumber, formatTerm } from './utils';
import type { IGraphProblemGenerator } from './utils';

export const hyperbolaDiscontinuityGenerator: IGraphProblemGenerator = {
    id: 'hyperbolaDiscontinuity',
    minDifficulty: 3.2,
    maxDifficulty: 4.2,
    generate(difficulty: number): MathQuestion {
        let a = generateRandomNumber(-8,8);
        while (a === 0) a = generateRandomNumber(-8,8);
        const k = generateRandomNumber(2,9);
        const c = generateRandomNumber(-6,6);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = \\frac{${k}}{x ${formatTerm(-a)}} ${formatTerm(c)}, \\quad \\text{find discontinuity point } x = ?`,
            correctAnswer: a,
            difficulty
        };
    },
}

export const hyperbolaHorizAsymptoteGenerator: IGraphProblemGenerator = {
    id: 'hyperbolaHorizAsymptote',
    minDifficulty: 3.2,
    maxDifficulty: 4.2,
    generate(difficulty: number): MathQuestion {
        let b = generateRandomNumber(-8,8);
        while (b === 0) b = generateRandomNumber(-8,8);
        const a = generateRandomNumber(-5,5);
        const k = generateRandomNumber(2,8);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = \\frac{${k}}{x ${formatTerm(-a)}} ${formatTerm(b)}, \\quad \\text{find horizontal asymptote } y = ?`,
            correctAnswer: b,
            difficulty
        };
    },
}

export const absVertexXGenerator: IGraphProblemGenerator = {
    id: 'absVertex-X',
    minDifficulty: 3.2,
    maxDifficulty: 4.2,
    generate(difficulty: number): MathQuestion {
        let a = generateRandomNumber(-9,9);
        while ( a=== 0) a = generateRandomNumber(-9,9);
        const c = generateRandomNumber(-8,8);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = |x ${formatTerm(-a)}| ${formatTerm(c)}, \\quad \\text{find vertex } x = ?`,
            correctAnswer: a,
            difficulty
        };
    },
}

export const absVertexYGenerator: IGraphProblemGenerator = {
    id: 'absVertexY',
    minDifficulty: 3.2,
    maxDifficulty: 4.2,
    generate(difficulty: number): MathQuestion {
        let s = generateRandomNumber(-1,1);
        while (s === 0) s = generateRandomNumber(-1,1);
        let a = generateRandomNumber(-10,10);
        while (a === 0) a = generateRandomNumber(-10,10)
        const c = generateRandomNumber(-8,8);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${s === -1 ? '-' : ''}|x ${formatTerm(-a)}| ${formatTerm(c)}, \\quad \\text{find ${s === 1 ? 'min' : 'max'} } y = ?`,
            correctAnswer: c,
            difficulty
        };
    },
}

export const exponentialZeroGenerator: IGraphProblemGenerator = {
    id: 'exponentialZero',
    minDifficulty: 4.0,
    maxDifficulty: 5.0,
    generate(difficulty: number): MathQuestion {
        const a = generateRandomNumber(2,3);
        const k = generateRandomNumber(1,3);
        const c = generateRandomNumber(-4,4);
        const val = Math.pow(a,k);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${a}^{x ${formatTerm(-c)}} ${formatTerm(-val)}, \\quad \\text{find root } x = ?`,
            correctAnswer: c + k,
            difficulty
        };
    },
}

export const semicircleMaxYGenerator: IGraphProblemGenerator = {
    id: 'semicircle-Max-Y',
    minDifficulty: 4.0,
    maxDifficulty: 5.0,
    generate(difficulty: number): MathQuestion {
        const r = generateRandomNumber(3,9);
        const r2 = r * r;
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = \\sqrt{${r2} - x^2}, \\quad \\text{find max } y = ?`,
            correctAnswer: r,
            difficulty
        };
    },
}

export const asymptotesSumGenerator: IGraphProblemGenerator = {
    id: 'asymptotesSum',
    minDifficulty: 4.0,
    maxDifficulty: 5.0,
    generate(difficulty: number): MathQuestion {
        const c = generateRandomNumber(2,3);
        const x_0 = generateRandomNumber(1,5);
        let y_0 = generateRandomNumber(-4,6);
        while (y_0 === 0) y_0 = generateRandomNumber(-4,6);
        const d = c * x_0;
        const a = c * y_0;
        const m = generateRandomNumber(-9,9);
        return {
            id: crypto.randomUUID(),
            latex: ` f(x) = \\frac{${a}x ${formatTerm(m)}}{${c}x ${formatTerm(-d)}}, \\quad \\text{find } x_{asymp} + y_{asymp} = ?`,
            correctAnswer: x_0+y_0,
            difficulty
        };
    },
}


export const asymptotesGenerator: IGraphProblemGenerator[] = [
    hyperbolaDiscontinuityGenerator,
    hyperbolaHorizAsymptoteGenerator,
    absVertexXGenerator,
    absVertexYGenerator,
    exponentialZeroGenerator,
    semicircleMaxYGenerator,
    asymptotesSumGenerator
];