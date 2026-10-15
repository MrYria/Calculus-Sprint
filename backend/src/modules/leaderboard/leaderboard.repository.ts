import { PostgresDatabase } from "../../config/db.js";
import type { ILeaderboardEntry } from "./types/leaderboard.types.js"

export class LeaderboardRepository {
    private db = PostgresDatabase.getInstance();

    public async getTopPlayers(gameType: string = 'sprint', limit: number = 10): Promise<ILeaderboardEntry[]> {
        const query = `
            SELECT 
            u.username,
            u.user_uuid,
            MAX(g.result) AS high_score,
            COUNT(g.game_id) AS total_games_played,
            MAX(g.game_end_time) AS achieved_at
            FROM game_sessions g
            JOIN users u ON g.user_id = u.user_id
            WHERE g.status = 'completed' AND g.game_type = $1
            GROUP BY u.user_id, u.username, u.user_uuid
            ORDER BY high_score DESC
            LIMIT $2;`;
        const rows = await this.db.query<ILeaderboardEntry>(query, [gameType, limit]);
        return rows;
    }

}