import type { MathQuestion, GraphFunctionType, GraphTaskType } from '../../types/math';
import { generateRandomNumber, formatTerm, generateNonZeroRandomNumber } from './utils';
import type { IGraphProblemGenerator } from './utils';

export const cubicInflectionPointGenerator: IGraphProblemGenerator = {
    id: 'cubic-inflection-point',
    minDifficulty: 6.0,
    maxDifficulty: 7.0,
    generate(difficulty: number): MathQuestion {
        const x_inf = generateNonZeroRandomNumber(-5, 5);
        const possibleA = [generateNonZeroRandomNumber(-2, -1), generateNonZeroRandomNumber(1, 2)];
        const a = possibleA[generateRandomNumber(0, 1)];
        const b = -3 * a * x_inf;
        const c = generateRandomNumber(-8, 8);
        const d = generateRandomNumber(-15, 15);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${a === 1 ? '' : a === -1 ? '-' : a}x^3 ${formatTerm(b, 'x^2')} ${formatTerm(c, 'x')} ${formatTerm(d)}, \\quad \\text{find inflection point } x = ?`,
            correctAnswer: x_inf,
            difficulty,
        };
    },
}
        
export const cubicLocalExtremumGenerator: IGraphProblemGenerator = {
    id: 'cubic-local-extremum',
    minDifficulty: 6.2,
    maxDifficulty: 7.2,
    generate(difficulty: number): MathQuestion {
        const x_1 = generateRandomNumber(-4, 1);
        const x_2 = generateRandomNumber(x_1 + 2, x_1 + 5);
        const B = -3 * (x_1 + x_2);
        const C = 6 * x_1 * x_2;
        const D = generateRandomNumber(-10, 10);
        const isMin = generateRandomNumber(0, 1) === 0;

        return {
            id: crypto.randomUUID(),
            latex: `f(x) = 2x^3 ${formatTerm(B, 'x^2')} ${formatTerm(C, 'x')} ${formatTerm(D)}, \\quad \\text{find local ${isMin ? 'min' : 'max'} point } x = ?`,
            correctAnswer: isMin ? x_2 : x_1,
            difficulty,
        };
    }
}

export const quarticMinPointGenerator: IGraphProblemGenerator = {
    id: 'quartic-min-point',
    minDifficulty: 5.8,
    maxDifficulty: 6.6,
    generate(difficulty: number): MathQuestion {
        const a = generateNonZeroRandomNumber(-6, 6);
        const c = generateRandomNumber(-12, 12);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = (x ${formatTerm(-a)})^4 ${formatTerm(c)}, \\quad \\text{find } x \\text{ of minimum point} = ?`,
            correctAnswer: a,
            difficulty,
        };
    }
}

export const rationalHoleRootGenerator: IGraphProblemGenerator = {
    id: 'rational-hole-root',
    minDifficulty: 6.0,
    maxDifficulty: 6.8,
    generate(difficulty: number): MathQuestion {
        const a = generateNonZeroRandomNumber(-5, 5);
        let b = generateNonZeroRandomNumber(-6, 6);
        while (b === a) b = generateNonZeroRandomNumber(-6, 6);
        const B = -(a+b);
        const C = a*b;
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = \\frac{x^2 ${formatTerm(B, 'x')} ${formatTerm(C)}}{x ${formatTerm(-a)}}, \\quad \\text{find valid root } x = ?`,
            correctAnswer: b,
            difficulty,
        };
    }   
}

export const monotoneBoundaryGenerator: IGraphProblemGenerator = {
    id: 'monotone-boundary',
    minDifficulty: 5.8,
    maxDifficulty: 6.8,
    generate(difficulty: number): MathQuestion {
        const x_0 = generateNonZeroRandomNumber(-6, 6);
        const c = generateRandomNumber(-10, 10);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = -x^2 ${formatTerm(2 * x_0, 'x')} ${formatTerm(c)}, \\quad f(x) \\text{ increases on } (-\\infty; a], \\quad \\text{find } a = ?`,
            correctAnswer: x_0,
            difficulty,
        };
    },
}

export const cubicVietaRootsSumGenerator: IGraphProblemGenerator = {
    id: 'cubic-vieta-roots-sum',
    minDifficulty: 6.2,
    maxDifficulty: 7.0,
    generate(difficulty: number): MathQuestion {
        const x_1 = generateRandomNumber(-3, 4);
        const x_2 = generateRandomNumber(-3, 4);
        const x_3 = generateRandomNumber(-3, 4);
        const S = x_1 + x_2 + x_3;
        const B = -S;
        const C = x_1 * x_2 + x_1 * x_3 + x_2 * x_3;
        const D = -x_1 * x_2 * x_3;
        return{
            id: crypto.randomUUID(),
            latex: `f(x) = x^3 ${formatTerm(B, 'x^2')} ${formatTerm(C, 'x')} ${formatTerm(D)}, \\quad \\text{find sum of roots } (x_1+x_2+x_3) = ?`,
            correctAnswer: S,
            difficulty,
        };
    },
}


export const extremaGenerator: IGraphProblemGenerator[] = [
    cubicInflectionPointGenerator,
    cubicLocalExtremumGenerator,
    quarticMinPointGenerator,
    rationalHoleRootGenerator,
    monotoneBoundaryGenerator,
    cubicVietaRootsSumGenerator
];