import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import type { LoginBody, RegisterBody } from './types/auth.types.js';

export class AuthController {
    constructor(private readonly authService: AuthService) { }

    public register = async (req: Request<unknown, unknown, RegisterBody>, res: Response): Promise<void> => {
        const { username, email, password } = req.body;

        try {
            if (!username || !password || !email) {
                res.status(400).json({ message: 'Username, email and password are required' })
                return;
            }
            const result = await this.authService.register(
                username,
                email,
                password
            );
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'Registration failed' })
        }
    };

    public login = async (
        req: Request<unknown, unknown, LoginBody>,
        res: Response
    ): Promise<void> => {
        try {
            const { identifier, password } = req.body;

            if (!identifier || !password) {
                res.status(400).json({ message: 'Identifier and password are required' });
                return;
            }

            const result = await this.authService.login(identifier, password);
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json({
                message: error instanceof Error ? error.message : 'Login failed',
            });
        }
    };
}