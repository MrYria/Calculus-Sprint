import { PostgresDatabase } from "../../config/db.js";
import type { GameStatus, IAnswerRecord, IGameSession } from "./types/game.types.js";

export class GameRepository {
    private db = PostgresDatabase.getInstance();

    public async createSession(userId: number | null, gametype: string): Promise<IGameSession> {
        const query = `
        INSERT INTO game_sessions (user_id, game_type, status, game_start_time)
        VALUES ($1, $2, 'in_progress', NOW())
        RETURNING *;
        `;
        const rows = await this.db.query<IGameSession>(query, [userId, gametype]);
        const session = rows[0];

        if (!session) {
            throw new Error('Game session was not created');
        }

        return session;
    }

    public async findSessionByUuid(gameUuid: string): Promise<IGameSession | null> {
        const query = `SELECT * FROM game_sessions WHERE game_uuid = $1;`;
        const rows = await this.db.query<IGameSession>(query, [gameUuid]);
        return rows[0] || null;
    }

    public async completeSession(gameId: number, finalScore: number, status: GameStatus): Promise<IGameSession> {
        const query = `UPDATE game_sessions 
        SET result = $1, status = $2, game_end_time = NOW() 
        WHERE game_id = $3 
        RETURNING *;`;
        const rows = await this.db.query<IGameSession>(query, [finalScore, status, gameId]);
        const session = rows[0];
        if (!session) {
            throw new Error('Game session was not updated');
        }

        if (session.status !== 'completed' && session.status !== 'aborted') {
            throw new Error('Game session is not completed or aborted');
        }

        return session;
    }

    public async saveAnswers(gameId: number, answers: IAnswerRecord[]): Promise<void> {
        const query = `
        INSERT INTO session_answers (game_id, question_order, question, answer, answer_correct, time_spent_ms)
        VALUES ($1, $2, $3, $4, $5, $6);
    `;
        for (let i = 0; i < answers.length; i++) {
            const record = answers[i];
            if (!record) continue;

            await this.db.query(query, [
                gameId,
                i + 1,
                record.latex,
                record.userAnswer,
                record.isCorrect,
                record.timeSpentMs
            ]);
        }
    }
}