import type { MathQuestion } from '../../types/math';
import { generateRandomNumber, formatTerm, formatPolynomialTerms, generateNonZeroRandomNumber } from '../../helper/utils';
import type { IIntegralGenerator } from '../../types/generators';


export const constantLinearIntegralGenerator: IIntegralGenerator = {
    id: 'integral-constant-linear',
    minDifficulty: 1.0,
    maxDifficulty: 2.2,
    taskType: 'polynomial',
    generate(difficulty: number): MathQuestion {
        const roll = generateRandomNumber(0, 1) ? true : false;
        if (roll) {
            const a = generateRandomNumber(0, 4);
            const b = a + generateRandomNumber(2, 5);
            const c = generateRandomNumber(2, 9);
            return {
                id: crypto.randomUUID(),
                latex: `\\int_{${a}}^{${b}} ${c} \\, dx = ?`,
                correctAnswer: c * (b - a),
                difficulty,
            };
        }
        const k = generateRandomNumber(1, 5);
        const a = generateRandomNumber(0, 4);
        const b = a + generateRandomNumber(1, 4);
        return {
            id: crypto.randomUUID(),
            latex: `\\int_{${a}}^{${b}} ${2 * k === 1 ? '' : 2 * k}x \\, dx = ?`,
            correctAnswer: k * (b * b - a * a),
            difficulty,
        };
    }
}

export const quadraticIntegralGenerator: IIntegralGenerator = {
    id: 'integral-quadratic',
    minDifficulty: 2.0,
    maxDifficulty: 3.2,
    taskType: 'polynomial',
    generate(difficulty): MathQuestion {
        const roll = generateRandomNumber(0, 1) ? true : false;
        if (roll) {
            const c2 = generateRandomNumber(-3, 4);
            const c1 = generateRandomNumber(-5, 6);
            const a = generateRandomNumber(0, 1);
            const b = a + generateRandomNumber(1, 3);

            const Fa = c2 * a * a + c1 * a;
            const Fb = c2 * b * b + c1 * b;

            const poly = formatPolynomialTerms([
                { coeff: 2 * c2, power: 'x' },
                { coeff: c1, power: '' },
            ]);
            return {
                id: crypto.randomUUID(),
                latex: `\\int_{${a}}^{${b}} (${poly}) \\, dx = ?`,
                correctAnswer: Fb - Fa,
                difficulty,
            };
        }
        const c3 = generateRandomNumber(1, 3);
        const c1 = generateRandomNumber(-4, 4);
        const a = generateRandomNumber(0, 1);
        const b = a + generateRandomNumber(1, 2);

        const Fa = c3 * a * a * a + c1 * a;
        const Fb = c3 * b * b * b + c1 * b;

        const poly = formatPolynomialTerms([
            { coeff: 3 * c3, power: 'x^2' },
            { coeff: c1, power: '' },
        ]);
        return {
            id: crypto.randomUUID(),
            latex: `\\int_{${a}}^{${b}} (${poly}) \\, dx = ?`,
            correctAnswer: Fb - Fa,
            difficulty,
        };
    },
}

export const cubicFullPolynomialIntegralGenerator: IIntegralGenerator = {
    id: 'integral-cubic-full',
    minDifficulty: 3.0,
    maxDifficulty: 4.5,
    taskType: 'polynomial',
    generate(difficulty): MathQuestion {
        const roll = generateRandomNumber(0, 1) ? true : false;
        if (roll) {
            const c1 = generateNonZeroRandomNumber(-4, 4);
            const c2 = generateNonZeroRandomNumber(-2, 3);
            const c3 = generateRandomNumber(1, 3);
            const a = generateRandomNumber(0, 1);
            const b = a + generateRandomNumber(1, 3);
            const Fa = c3 * a * a * a + c2 * a * a + c1 * a;
            const Fb = c3 * b * b * b + c2 * a * a + c1 * b;
            const poly = `${3 * c3}x^2 ${formatTerm(2 * c2, 'x')} ${formatTerm(c1)}`;
            return {
                id: crypto.randomUUID(),
                latex: `\\int_{${a}}^{${b}} (${poly}) \\, dx = ?`,
                correctAnswer: Fb - Fa,
                difficulty,
            };
        }

        const a = generateRandomNumber(2,6);
        const k = generateRandomNumber(1,4);
        const c = generateRandomNumber(2,6);
        return {
            id: crypto.randomUUID(),
            latex: `\\int_{-${a}}^{${a}} (${k === 1 ? '' : k}x^3 + ${c}) \\, dx = ?`,
            correctAnswer: c * (2 * a),
            difficulty,
        };
    },
}

export const quarticPolynomialIntegralGenerator : IIntegralGenerator = {
    id: 'integral-quartic',
    minDifficulty:4.0,
    maxDifficulty:5.5,
    taskType:'polynomial',
    generate(difficulty) : MathQuestion {
        const k = generateRandomNumber(1,4);
        const a = generateRandomNumber(0,2);
        const b = a + generateRandomNumber(1,2);
        return {
            id: crypto.randomUUID(),
            latex: `\\int_{${a}}^{${b}} ${4 * k}x^3 \\, dx = ?`,
            correctAnswer: k * (Math.pow(b, 4) - Math.pow(a, 4)),
            difficulty,
        };
    },
}


export const polynomialIntegrals: IIntegralGenerator[] = [
    constantLinearIntegralGenerator,
    quadraticIntegralGenerator,
    cubicFullPolynomialIntegralGenerator,
    quarticPolynomialIntegralGenerator,
];