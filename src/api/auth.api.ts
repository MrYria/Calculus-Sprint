import { apiClient } from "./client";
import type { AuthResponse } from "./types/api.types";

export async function registerUser(
    username: string,
    email: string,
    password: string
): Promise<AuthResponse> {
    return apiClient<AuthResponse>('api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password })


    });
}

export async function loginUser(
    identifier: string,
    password: string
) : Promise<AuthResponse> {
    return apiClient<AuthResponse>('api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password })
    });
}

export async function getMe() : Promise<{message: string, user: {userId: number; username:string}}>{
    return apiClient('api/auth/me');
}
