import type { Request, Response } from 'express';
import { LeaderboardService } from './leaderboard.service.js';

export class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService = new LeaderboardService()) {}

  public getLeaderboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const gameType = (req.query.gameType as string) || 'sprint';
      const limit = Number(req.query.limit) || 10;

      const leaderboard = await this.leaderboardService.getLeaderboard(gameType, limit);
      res.status(200).json(leaderboard);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : 'Failed to fetch leaderboard',
      });
    }
  };
}