import type { MathQuestion, GraphFunctionType, GraphTaskType, OperationType } from '../types/math';

export function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function formatTerm(coeff: number, powerStr: string = ''): string {
    if (coeff === 0) return '';
    const sign = coeff > 0 ? '+ ' : '- ';
    const abs = Math.abs(coeff);
    const coeffStr = abs === 1 && powerStr !== '' ? '' : abs;
    return `${sign}${coeffStr}${powerStr} `;
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

export interface IArithmeticProblemGenerator {
    readonly id: string,
    readonly minDifficulty: number,
    readonly maxDifficulty: number,
    readonly taskType?: OperationType;
    generate(difficulty: number): MathQuestion
}