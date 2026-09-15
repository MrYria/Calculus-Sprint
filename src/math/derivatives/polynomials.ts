import type { MathQuestion } from '../../types/math';
import { generateRandomNumber, formatTerm, generateNonZeroRandomNumber } from '../../helper/utils';
import type { IDerivativesProblemsGenerator } from '../../helper/utils';

export const linearMonomialDerivativeGenerator: IDerivativesProblemsGenerator = {
    id: 'derivative-linear-monomial',
    minDifficulty: 1.0,
    maxDifficulty: 2.2,
    taskType: 'polynomials',
    generate(difficulty: number): MathQuestion {
        const roll = generateRandomNumber(1, 3);
        const x_0 = generateRandomNumber(0, 5);
        if (roll === 2) {
            const c = generateRandomNumber(2, 100);
            return {
                id: crypto.randomUUID(),
                latex: `f(x) = ${c}, \\quad f'(${x_0}) = ?`,
                correctAnswer: 0,
                difficulty
            };
        } else if (roll === 3) {
            const a = generateRandomNumber(2, 9);
            const b = generateRandomNumber(-10, 10);
            const bStr = b !== 0 ? formatTerm(b) : '';
            return {
                id: crypto.randomUUID(),
                latex: `f(x) = ${a}x ${bStr}, \\quad f'(${x_0}) = ?`,
                correctAnswer: a,
                difficulty
            };
        }
        const a = generateRandomNumber(2, 6);
        const answer = 2 * a * x_0;
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${a}x^2, \\quad f'(${x_0}) = ?`,
            correctAnswer: answer,
            difficulty
        };
    }

}

export const quadraticCubicDerivativeGenerator: IDerivativesProblemsGenerator = {
    id: 'derivative-quadratic-cubic',
    minDifficulty: 2.0,
    maxDifficulty: 3.5,
    taskType: 'polynomials',
    generate(difficulty: number): MathQuestion {
        const roll = generateRandomNumber(0, 1);
        const x_0 = generateRandomNumber(1,3);
        if(roll === 0) {
            const a = generateRandomNumber(1,4);
            const b = generateNonZeroRandomNumber(-6,6);
            const c =generateNonZeroRandomNumber(-10,10);
            const aStr = a === 1 ? 'x^2' : `${a}x^2`;
            return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${aStr} ${formatTerm(b, 'x')} ${formatTerm(c)}, \\quad f'(${x_0}) = ?`,
            correctAnswer: 2 * a * x_0 + b,
            difficulty
        }; 
        }
        const a = generateRandomNumber(1, 2);
        const b = generateRandomNumber(-5, 5);
        const aStr = a === 1 ? 'x^3' : `${a}x^3`;
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = ${aStr} ${formatTerm(b, 'x')}, \\quad f'(${x_0}) = ?`,
            correctAnswer: 3 * a * (x_0 * x_0) + b,
            difficulty
        };
    }
}

export const higherPolynomialsDerivativeGenerator: IDerivativesProblemsGenerator = {
    id: 'derivative-higher-poly',
    minDifficulty: 3.2,
    maxDifficulty: 5.0,
    taskType: 'polynomials',
    generate(difficulty: number): MathQuestion {
        const roll = generateRandomNumber(0, 1);
        if(roll === 0) {
            const x0 = generateRandomNumber(1, 2);
            const a = 1;
            const b = generateRandomNumber(-3, 3);
            const c = generateRandomNumber(-5, 5);
            const d = generateRandomNumber(-10, 10);
            return {
            id: crypto.randomUUID(),
            latex: `f(x) = x^3 ${formatTerm(b, 'x^2')} ${formatTerm(c, 'x')} ${formatTerm(d)}, \\quad f'(${x0}) = ?`,
            correctAnswer: 3 * a * (x0 * x0) + 2 * b * x0 + c,
            difficulty
        };
        }
        const a = 1;
        const b = generateRandomNumber(-2, 2);
        const c = generateRandomNumber(-3, 3);
        const d = generateRandomNumber(-5, 5);
        const e = generateRandomNumber(-10, 10);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = x^4 ${formatTerm(b, 'x^3')} ${formatTerm(c, 'x^2')} ${formatTerm(d, 'x')} ${formatTerm(e)}, \\quad f'(1) = ?`,
            correctAnswer: 4 * a + 3 * b + 2 * c + d,
            difficulty
        };
    }
}

export const polynomialDerivatives: IDerivativesProblemsGenerator[] = [
    linearMonomialDerivativeGenerator,
    quadraticCubicDerivativeGenerator,
    higherPolynomialsDerivativeGenerator,
];