import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRepository } from './auth.repository.js';
import type { AuthResult, IUserPublic } from './types/auth.types.js';

export class AuthService {
    constructor(private readonly authRepo: AuthRepository) { }

    public async register(
        username: string,
        email: string,
        password: string
    ): Promise<AuthResult> {
        this.passLengthCheck(password);
        await this.uniqueCheck(username, email);

        const hashpass = await this.hashPass(password);
        const user = await this.writeInDB(username, email, hashpass);
        const token = this.generateToken(user.user_id, user.username);

        return { user, token };
    }

    public async login(
        identifier: string,
        password: string
    ): Promise<AuthResult> {
        const user = await this.authRepo.findByIdentifier(identifier);

        if (!user || !user.hashpass) {
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.hashpass);
        if (!isPasswordValid) throw new Error('Invalid credentials');

        const { hashpass: _, ...userPublic } = user;
        const token = this.generateToken(user.user_id, user.username);

        return { user: userPublic, token };
    }

    private async writeInDB(
        username: string,
        email: string,
        hashpass: string
    ): Promise<IUserPublic> {
        return this.authRepo.createUser(username, email, hashpass);
    }

    private generateToken(userId: number, username: string): string {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }

        return jwt.sign({ userId, username }, secret, {
            expiresIn: '1h',
        });
    }

    private passLengthCheck(password: string): void {
        if (password.length < 8) {
            throw new Error('Password must contain at least 8 characters');
        }
    }

    private async hashPass(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    private async uniqueCheck(
        username: string,
        email: string
    ): Promise<void> {
        const [existingUsername, existingEmail] = await Promise.all([
            this.authRepo.findByUsername(username),
            this.authRepo.findByEmail(email),
        ]);

        if (existingUsername) {
            throw new Error('Username already taken');
        }

        if (existingEmail) {
            throw new Error('Email already taken');
        }
    }
}