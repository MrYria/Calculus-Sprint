export type Topic = 'arithmetic' | 'powers' | 'derivatives' | 'integrals' | 'graphs';
export type Operation = '+' | '-' | '*' | '/'
export type PowerType = 'root' | 'power' | 'log'

export interface MathQuestion {
  id: string; 
  latex: string;
  correctAnswer: number;
  difficulty: number;
}