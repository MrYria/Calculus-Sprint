import type { Topic } from './math';

export type GameMode = 'training' | 'sprint' | '1v1';

export type TimeLimit = 60 | 120 | 180 | 'infinite';

export type StateScreen = 'menu' | 'playing' | 'game_over';

export interface IGameConfig {
  topic: Topic | 'all_mix';
  mode: GameMode;
  timeLimit: TimeLimit;
  initialDifficulty: number;
}

export interface IGameState {
  config: IGameConfig;
  score: number;
  currentDifficulty: number;
  highestLevelReached: number; 
  remainingTime: number;
  streak: number;
  stateScreen: StateScreen;
  answersHistory: IAnswerRecord[];
}

export interface IGameResults {
  score: number;
  correctAnswers: number;      
  wrongAnswers: number;
  totalQuestions: number;
  accuracy: number;            
  maxStreak: number;
  maxDifficulty: number;
  topic: Topic | 'all_mix';
  timeSpent: number;        
  answersHistory: IAnswerRecord[];   
}

export interface IAnswerRecord {
  questionId: string;
  latex: string;
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  difficulty: number;
}