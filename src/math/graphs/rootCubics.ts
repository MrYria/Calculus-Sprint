import type { MathQuestion, GraphFunctionType, GraphTaskType } from '../../types/math';
import { generateRandomNumber, formatTerm } from '../../helper/utils';
import type { IGraphProblemGenerator } from '../../helper/utils';


export const sqrtDomainMinGenerator: IGraphProblemGenerator = {
    id: 'sqrt-Domain-Min',
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
    id: 'cubic-Root',
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
    id: 'sqrt-Eval-Point',
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

export const twoModulusMinGenerator: IGraphProblemGenerator = {
    id: 'two-modulus-min',
    minDifficulty: 4.3,
    maxDifficulty: 5.3,
    generate(difficulty: number): MathQuestion {
        const a = generateRandomNumber(-8, 2);
        const dist = generateRandomNumber(3, 9);
        const b = a + dist;
        return {
            id: crypto.randomUUID(),
            latex: ` f(x) = |x ${formatTerm(-a)}| + |x ${formatTerm(-b)}|, \\quad \\text{find min } y = ?`,
            correctAnswer: dist,
            difficulty
        };
    },
}

export const scaledSqrtRootGenerator: IGraphProblemGenerator = {
    id: 'scaled-sqrt-root',
    minDifficulty: 4.5,
    maxDifficulty: 5.5,
    generate(difficulty: number): MathQuestion {
        const k = generateRandomNumber(2, 7);
        const a = generateRandomNumber(2, 6);
        const b = a * k;
        const c = generateRandomNumber(-8, 8);
        return {
            id: crypto.randomUUID(),
            latex: ` f(x) = ${a}\\sqrt{x ${formatTerm(-c)}} ${formatTerm(-b)}, \\quad \\text{find root } x = ?`,
            correctAnswer: c + k * k,
            difficulty
        };
    },
}

export const linearExponentRootGenerator: IGraphProblemGenerator = {
    id: 'linear-exponent-root',
    minDifficulty: 4.4,
    maxDifficulty: 5.4,
    generate(difficulty: number): MathQuestion {
        const a = generateRandomNumber(2, 3);
        const x_0 = generateRandomNumber(1, 5);
        const k = generateRandomNumber(2, 5);
        const p = generateRandomNumber(2, 5);
        const m = k * x_0 - p;
        const val = Math.pow(a, p);
        return {
            id: crypto.randomUUID(),
            latex: ` f(x) = ${a}^{${k}x ${formatTerm(-m)}} ${formatTerm(-val)}, \\quad \\text{find root } x = ?`,
            correctAnswer: x_0,
            difficulty
        };
    }
}

export const pythagoreanCircleIntersectionGenerator: IGraphProblemGenerator = {
    id: 'pythagorean-circle-intersection',
    minDifficulty: 4.2,
    maxDifficulty: 5.2,
    generate(difficulty: number): MathQuestion {
        const m = generateRandomNumber(2, 4);
        const n = generateRandomNumber(1, m - 1);

        const a = m * m - n * n;
        const b = 2 * m * n;
        const R = m * m + n * n;
        const R2 = R * R;

        const roll = generateRandomNumber(0, 1) === 0;
        const H = roll ? a : b;
        const x = roll ? b : a;

        return {
            id: crypto.randomUUID(),
            latex: `f(x) = \\sqrt{${R2} - x^2}, \\quad g(x) = ${H}, \\quad \\text{find positive intersection } x = ?`,
            correctAnswer: x,
            difficulty,
        };
    },
};

export const rootCubicsGenerators: IGraphProblemGenerator[] = [
    sqrtDomainMinGenerator,
    cubicRootGenerator,
    sqrtEvalPointGenerator,
    twoModulusMinGenerator,
    scaledSqrtRootGenerator,
    linearExponentRootGenerator,
    pythagoreanCircleIntersectionGenerator,
];