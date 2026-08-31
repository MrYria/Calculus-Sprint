import type { MathQuestion, GraphFunctionType, GraphTaskType } from '../../types/math';

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

export interface IGraphProblemGenerator {
    readonly id: string,
    readonly minDifficulty: number,
    readonly maxDifficulty: number,
    readonly functionType?: GraphFunctionType;
    readonly taskType?: GraphTaskType;
    generate(difficulty: number): MathQuestion
}