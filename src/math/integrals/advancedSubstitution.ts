import type { MathQuestion } from '../../types/math';
import { generateRandomNumber } from '../../helper/utils';
import type { IIntegralGenerator } from '../../types/generators';

export const chainPowerShiftedGenerator: IIntegralGenerator = {
    id: 'integral-adv-chain-power',
    minDifficulty: 6.8,
    maxDifficulty: 8.0,
    taskType: 'substitution',
    generate(difficulty): MathQuestion {
        const m = generateRandomNumber(1, 3);
        const coeffStr = m === 1 ? '' : `${m}`;
        return {
            id: crypto.randomUUID(),
            latex: `\\int_{0}^{2} ${coeffStr}(3x - 1)^3 \\, dx = ?`,
            correctAnswer: 52 * m,
            difficulty,
        };
    },
};


export const rationalSquareSubstitutionGenerator: IIntegralGenerator = {
    id: 'integral-adv-rational-square',
    minDifficulty: 6.8,
    maxDifficulty: 8.0,
    taskType: 'substitution',
    generate(difficulty): MathQuestion {
        const a = generateRandomNumber(2, 3);
        const c = generateRandomNumber(1, 2);

        const numeratorCoeff = 2 * c * (a * a + c);

        return {
            id: crypto.randomUUID(),
            latex: `\\int_{0}^{${a}} \\frac{${numeratorCoeff}x}{(x^2 + ${c})^2} \\, dx = ?`,
            correctAnswer: a * a,
            difficulty,
        };
    },
};

export const cubicDifferenceQuotientGenerator: IIntegralGenerator = {
    id: 'integral-adv-cubic-quotient',
    minDifficulty: 7.0,
    maxDifficulty: 8.0,
    taskType: 'rational',
    generate(difficulty): MathQuestion {
        const a = generateRandomNumber(2, 3);
        const c = generateRandomNumber(1, 2);

        const c3 = c * c * c;
        const answer = 2 * Math.pow(a, 3) - 3 * c * Math.pow(a, 2) + 6 * c * c * a;

        return {
            id: crypto.randomUUID(),
            latex: `\\int_{0}^{${a}} \\frac{6(x^3 + ${c3})}{x + ${c}} \\, dx = ?`,
            correctAnswer: answer,
            difficulty,
        };
    },
};

export const symmetricVanishingPolynomialGenerator: IIntegralGenerator = {
    id: 'integral-adv-symmetric-vanishing',
    minDifficulty: 7.0,
    maxDifficulty: 8.0,
    taskType: 'symmetry',
    generate(difficulty): MathQuestion {
        const a = 2;
        const c7 = generateRandomNumber(2, 5);
        const c5 = generateRandomNumber(2, 6);
        const c3 = generateRandomNumber(2, 6);
        const c1 = generateRandomNumber(3, 8);

        const c2 = generateRandomNumber(1, 3);
        const d = generateRandomNumber(1, 4);


        const answer = 2 * (c2 * 8 - d * 2);

        const poly = `${c7}x^7 - ${c5}x^5 + ${c3}x^3 - ${c1}x + ${3 * c2}x^2 - ${d}`;

        return {
            id: crypto.randomUUID(),
            latex: `\\int_{-${a}}^{${a}} (${poly}) \\, dx = ?`,
            correctAnswer: answer,
            difficulty,
        };
    },
};

export const advancedSubstitutionIntegrals: IIntegralGenerator[] = [
    chainPowerShiftedGenerator,
    rationalSquareSubstitutionGenerator,
    cubicDifferenceQuotientGenerator,
    symmetricVanishingPolynomialGenerator,
];