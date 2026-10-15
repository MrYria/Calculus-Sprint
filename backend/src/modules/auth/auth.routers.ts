import { Router,type Response } from 'express';
import { AuthRepository } from './auth.repository.js';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { AuthMiddleware } from './auth.middleware.js';
import type { AuthenticatedRequest } from "./types/auth.types.js";

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);
const authMiddleware = new AuthMiddleware();

const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

authRouter.get('/me', authMiddleware.authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  if(!req.user){
    res.status(401).json({message: 'User is not authenticated'})
    return;
  }
  res.json({
      message: 'Access granted!',
      user: req.user,
    });
});

export { authRouter };