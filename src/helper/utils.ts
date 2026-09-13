import type { MathQuestion, GraphFunctionType, GraphTaskType, OperationType, PowerType } from '../types/math';

export function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateNonZeroRandomNumber(
    min: number,
    max: number
): number {
    let value = generateRandomNumber(min, max);

    while (value === 0) {
        value = generateRandomNumber(min, max);
    }

    return value;
}

export function getRandomMultipleOfFive(min: number, max: number): number {
    const steps = (max - min) / 5;
    const randomStep = Math.floor(Math.random() * (steps + 1));
    return min + randomStep * 5;
}

export function formatTerm(coeff: number, powerStr: string = ''): string {
    if (coeff === 0) return '';
    const sign = coeff > 0 ? '+ ' : '- ';
    const abs = Math.abs(coeff);
    const coeffStr = abs === 1 && powerStr !== '' ? '' : abs;
    return `${sign}${coeffStr}${powerStr} `;
}

export function formatPolynomialTerms(terms: { coeff: number; power: string }[]): string {
  const nonZero = terms.filter((t) => t.coeff !== 0);
  if (nonZero.length === 0) return '0';

  return nonZero
    .map((t, idx) => {
      const abs = Math.abs(t.coeff);
      const coeffStr = abs === 1 && t.power !== '' ? '' : abs;
      const termStr = `${coeffStr}${t.power}`;

      if (idx === 0) {
        return t.coeff < 0 ? `-${termStr}` : termStr;
      }
      return t.coeff > 0 ? `+ ${termStr}` : `- ${termStr}`;
    })
    .join(' ');
}

export function generateRandomOperand(difficulty: number): number {
  difficulty = Math.floor(difficulty);
  const min = Math.pow(10, difficulty - 1);
  const max = Math.pow(10, difficulty) - 1;

  return generateRandomNumber(min, max);
}

export interface IGraphProblemGenerator {
    readonly id: string,
    readonly minDifficulty: number,
    readonly maxDifficulty: number,
    readonly functionType?: GraphFunctionType;
    readonly taskType?: GraphTaskType;
    generate(difficulty: number): MathQuestion
}

export interface IPowersProblemGenerator{
    readonly id: string,
    readonly minDifficulty: number,
    readonly maxDifficulty: number,
    readonly taskType?: PowerType;
    generate(difficulty: number): MathQuestion
}

export interface IArithmeticProblemGenerator {
    readonly id: string,
    readonly minDifficulty: number,
    readonly maxDifficulty: number,
    readonly taskType?: OperationType;
    generate(difficulty: number): MathQuestion
}