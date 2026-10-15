import { Router } from 'express';
import { LeaderboardController } from './leaderboard.controller.js';

const leaderboardController = new LeaderboardController();
const leaderboardRouter = Router();

leaderboardRouter.get('/', leaderboardController.getLeaderboard);

export { leaderboardRouter };