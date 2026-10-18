import { apiClient } from './client';
import type { ILeaderboardEntry } from './types/api.types';

export async function getLeaderboardApi(
  gameType: string = 'sprint',
  limit: number = 10
): Promise<ILeaderboardEntry[]> {
  return apiClient<ILeaderboardEntry[]>(
    `/api/leaderboard?gameType=${gameType}&limit=${limit}`
  );
}