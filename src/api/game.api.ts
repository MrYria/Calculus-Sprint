import { apiClient } from "./client";
import type { IGameSession, IAnswerRecord, IFinishGameResponse } from "./types/api.types";

export async function startGameApi(gameType: string) : Promise<IGameSession>{
    return apiClient<IGameSession>('/api/game/start', {
        method: 'POST',
        body: JSON.stringify({gameType})
    })
}

export async function finishGameApi(gameUuid:string, answersHistory: IAnswerRecord[]) : Promise<IFinishGameResponse > {
    return apiClient<IFinishGameResponse>('/api/game/finish', {
        method: 'POST',
        body: JSON.stringify({ gameUuid, answersHistory })
    })
}