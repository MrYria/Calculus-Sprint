export type Topic = 'arithmetic' | 'powers' | 'derivatives' | 'integrals' | 'graphs';
export type Operation = '+' | '-' | '*' | '/';
export type PowerType = 'root' | 'power' | 'log';
export type GraphFunctionType = 'linear' | 'quadratic' | 'inverse' | 'sqrt' | 'power' | 'exponential' | 'logarithmic' | 'trigonometric' | 'conic';
export type GraphTaskType = 'find_y' | 'find_root' | 'slope' | 'vertex_x' | 'vertex_y' | 'domain_bound' | 'range_bound' | 'intersection' | 'discontinuity';

export interface MathQuestion {
  id: string;
  latex: string;
  correctAnswer: number;
  difficulty: number;
}