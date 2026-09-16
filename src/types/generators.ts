import type { MathQuestion, OperationType, PowerType, GraphTaskType, DerivatesType, IntegralTaskType, GraphFunctionType} from './math'

export interface IProblemGenerator<TTask = string> {
  readonly id: string;
  readonly minDifficulty: number;
  readonly maxDifficulty: number;
  readonly taskType?: TTask;
  generate(difficulty: number): MathQuestion;
}

export type IArithmeticGenerator = IProblemGenerator<OperationType>;

export type IPowerGenerator = IProblemGenerator<PowerType>;

export type IDerivativeGenerator = IProblemGenerator<DerivatesType>;

export interface IGraphGenerator extends IProblemGenerator<GraphTaskType> {
  readonly functionType?: GraphFunctionType; 
}

export type IIntegralGenerator = IProblemGenerator<IntegralTaskType>;