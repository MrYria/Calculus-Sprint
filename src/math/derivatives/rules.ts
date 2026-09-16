import type { MathQuestion } from '../../types/math';
import { generateRandomNumber, formatTerm } from '../../helper/utils';
import type { IDerivativesProblemsGenerator } from '../../helper/utils';

export const productRuleDerivativeGenerator : IDerivativesProblemsGenerator = {
    id : 'derivative-product-rule',
    minDifficulty: 5.6,
    maxDifficulty: 7.0,
    taskType: 'rules',
    generate(difficulty) : MathQuestion{
        const a = generateRandomNumber(1,6);
        const b = generateRandomNumber(2,7);
        const c = generateRandomNumber(1,6);
        const d = generateRandomNumber(2,7)
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = (${a}x + ${b})(${c}x + ${d}), \\quad f'(1) = ?`,
            correctAnswer: a* (c+d) + c*(a+b),
            difficulty
        }  
    },
}

export const quotientRuleDerivativeGenerator: IDerivativesProblemsGenerator = {
    id : 'derivative-quotient-rule',
    minDifficulty: 5.8,
    maxDifficulty: 7.0,
    taskType: 'rules',
    generate(difficulty) : MathQuestion {
        const a = generateRandomNumber(2,8);
        const b = generateRandomNumber(1,6);
        const c = generateRandomNumber(1,3);
        return {
            id: crypto.randomUUID(),
            latex: `f(x) = \\frac{${a}x + ${b}}{${c === 1 ? '' : c}x + 1}, \\quad f'(0) = ?`,
            correctAnswer: a - b * c,
            difficulty
        }
    },
}

export const chainRuleCubeDerivativeGenerator: IDerivativesProblemsGenerator = {
    id : 'derivative-chain-rule-cube',
    minDifficulty: 5.8,
    maxDifficulty: 7.2,
    taskType: 'rules',
    generate(difficulty): MathQuestion {
        const a = generateRandomNumber(2,6);
        const x_0 = generateRandomNumber(1,6);
        const b = 1 - a * x_0;
        return {
           id: crypto.randomUUID(),
            latex: `f(x) = (${a}x ${formatTerm(b)})^3, \\quad f'(${x_0}) = ?`,
            correctAnswer: 3*a,
            difficulty 
        }
    },
}


export const rulesDerivatives: IDerivativesProblemsGenerator[] = [
  productRuleDerivativeGenerator,
  quotientRuleDerivativeGenerator,
  chainRuleCubeDerivativeGenerator,
];