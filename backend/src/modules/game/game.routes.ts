import { Router } from 'express';
import { GameController } from './game.controller.js';
import { AuthMiddleware } from '../auth/auth.middleware.js';

const gameController = new GameController();
const authMiddleware = new AuthMiddleware();

const gameRouter = Router();

gameRouter.post('/start', authMiddleware.optionalAuthenticateToken, gameController.startGame);

gameRouter.post('/finish', gameController.finishGame);

export { gameRouter };