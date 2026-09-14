export type Topic = 'arithmetic' | 'powers' | 'derivatives' | 'integrals' | 'graphs';
export type PowerType = 'root' | 'power' | 'log';
export type GraphFunctionType = 'linear' | 'quadratic' | 'inverse' | 'sqrt' | 'power' | 'exponential' | 'logarithmic' | 'trigonometric' | 'conic';
export type IntegralsTaskType = '';
export type OperationType = 'Addition'|'Subtraction' |'Division' |'Multiplication';
export type GraphTaskType = 'find_y' | 'find_root' | 'slope' | 'vertex_x' | 'vertex_y' | 'domain_bound' | 'range_bound' | 'intersection' | 'discontinuity';
export type DerivatesType = 'polynomials' | 'trigonometry' | 'expLogRoots' | 'rules' | 'composite'

export interface MathQuestion {
  id: string;
  latex: string;
  correctAnswer: number;
  difficulty: number;
}