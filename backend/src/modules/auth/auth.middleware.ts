import type { NextFunction } from "express";
import type { AuthenticatedRequest, AuthUserPayload } from "./types/auth.types.js";
import jwt from 'jsonwebtoken';
import type { Response } from 'express';

export class AuthMiddleware {

    private isAuthUserPayload(value: unknown): value is AuthUserPayload {
        if (typeof value !== 'object' || value === null) {
            return false;
        }

        const payload = value as Record<string, unknown>;

        return (
            typeof payload.userId === 'number' &&
            typeof payload.username === 'string'
        );
    }

    public optionalAuthenticateToken = (
        req: AuthenticatedRequest,
        _res: Response,
        next: NextFunction
    ): void => {
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
        const secret = process.env.JWT_SECRET;

        if (!token || !secret) {
            delete req.user;
            return next();
        }

        try {
            const decoded = jwt.verify(token, secret);
            if (this.isAuthUserPayload(decoded)) {
                req.user = decoded;
            }
        } catch {
            delete req.user;
        }

        next();
    };

    public authenticateToken = (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): void => {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            res.status(401).json({ message: 'No token provided' });
            return;
        }

        const token = authHeader.slice('Bearer '.length).trim();
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            res.status(500).json({ message: 'JWT secret is not configured' });
            return;
        }

        try {
            const decoded: unknown = jwt.verify(token, secret);

            if (!this.isAuthUserPayload(decoded)) {
                res.status(401).json({ message: 'Invalid token payload' });
                return;
            }

            req.user = decoded;
            next();
        } catch (error) {
            console.error('JWT Verification failed:', error);
            res.status(401).json({
                message: 'Invalid or expired token',
                detail: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}   