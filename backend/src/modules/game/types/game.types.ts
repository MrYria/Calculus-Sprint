export type GameMode = 'training' | 'sprint' | '1v1';

export interface IAnswerRecord {
  questionId: string;
  latex: string;
  userAnswer: number;
  correctAnswer: number;
  timeSpentMs: number;
  isCorrect: boolean;
  difficulty: number;
}

export type GameStatus = 'in_progress' | 'completed' | 'aborted';

export interface IGameSession {
  game_id: number;
  game_uuid: string;
  user_id: number | null; 
  game_type: string;
  game_start_time: Date;
  game_end_time: Date | null;
  result: number | null;
  status: GameStatus;
}

export interface StartGameBody {
  gameType: string;
}

export interface FinishGameBody {
  gameUuid: string;
  answersHistory: IAnswerRecord[];
}