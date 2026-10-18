export interface AuthUser {
  user_id: number;
  user_uuid: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
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

export interface IAnswerRecord {
  questionId: string;
  latex: string;
  userAnswer: number;
  correctAnswer: number;
  timeSpentMs: number;
  isCorrect: boolean;
  difficulty: number;
}

export interface IFinishGameResponse {
  verifiedScore: number;
  session: IGameSession;
}

export interface ILeaderboardEntry {
  username: string;
  user_uuid: string;
  high_score: number;
  total_games_played: string | number;
  achieved_at: string;
}