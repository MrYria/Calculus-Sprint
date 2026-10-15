import { LeaderboardRepository } from './leaderboard.repository.js';
import type { ILeaderboardEntry } from './types/leaderboard.types.js';

export class LeaderboardService {
  constructor(private leaderboardRepo: LeaderboardRepository = new LeaderboardRepository()) {}

  public async getLeaderboard(gameType: string = 'sprint', limit: number = 10): Promise<ILeaderboardEntry[]> {
    const safeLimit = Math.min(Math.max(1, limit), 50);
    return this.leaderboardRepo.getTopPlayers(gameType, safeLimit);
  }
}