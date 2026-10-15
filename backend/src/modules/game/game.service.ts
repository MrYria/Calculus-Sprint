import { GameRepository } from "./game.repository.js";
import type { IAnswerRecord, IGameSession } from "./types/game.types.js";

export class GameService {
    private gameRepository: GameRepository;

    constructor() {
        this.gameRepository = new GameRepository();
    }

    private calculateScore(basePoints: number, streak: number): number {
        const multiplier = Math.min(4, 1 + Math.floor(streak / 5) * 0.5);
        return Math.round(basePoints * multiplier);
    }


    public async startGame(userId: number | null, gameType: string): Promise<IGameSession> {
        const session = await this.gameRepository.createSession(userId, gameType);
        return session;
    }

    public async finishGame(sessionId: string, answerHistory: IAnswerRecord[]): Promise<{ verifiedScore: number; session: IGameSession }> {
        const session = await this.gameRepository.findSessionByUuid(sessionId);
        if (!session || session.status !== 'in_progress') {
            throw new Error('Invalid game session');
        }
        let serverScore = 0;
        let currentStreak = 0;
        for (const answer of answerHistory) {
            const actuallyCorrect = answer.userAnswer === answer.correctAnswer;
            if (actuallyCorrect && answer.timeSpentMs < 150) {
                await this.gameRepository.completeSession(session.game_id, 0, 'aborted');
                throw new Error('Cheat detected: Impossible reaction time');
            }

            if (actuallyCorrect) {
                currentStreak += 1;
                serverScore += this.calculateScore(10, currentStreak);
            } else {
                currentStreak = 0;
            }
        }
        await this.gameRepository.saveAnswers(session.game_id, answerHistory);
        const updatedSession = await this.gameRepository.completeSession(session.game_id, serverScore, 'completed');
        return { verifiedScore: serverScore, session: updatedSession };
    }
}