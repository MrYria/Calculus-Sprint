import type { AuthenticatedRequest } from "../auth/types/auth.types.js";
import { GameService } from "./game.service.js";
import type { FinishGameBody, StartGameBody } from "./types/game.types.js";
import type { Request, Response } from "express";

export class GameController {
    private gameService: GameService;
    constructor() {
        this.gameService = new GameService();
    }

    public startGame = async (req: AuthenticatedRequest & Request<unknown, unknown, StartGameBody>, res: Response): Promise<void> => {
        const userId = req.user?.userId || null;
        const requestedGameType = req.body.gameType;
        try {
            const session = await this.gameService.startGame(userId, requestedGameType);
            res.status(201).json(session);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Failed to start game' });
        }
    }

    public finishGame = async (req: Request<unknown, unknown, FinishGameBody>, res: Response): Promise<void> => {
        const { gameUuid, answersHistory } = req.body ?? {};

        if (!gameUuid || !answersHistory) {
            res.status(400).json({ message: 'Game UUID and answer history are required' });
            return;
        }
        try {
            const result = await this.gameService.finishGame(gameUuid, answersHistory);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({
                message: error instanceof Error ? error.message : 'Failed to finish game',
            });
        }
    }
}