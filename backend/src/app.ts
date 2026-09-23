import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import { PostgresDatabase } from '../src/config/db.js';
import { authRouter } from './modules/auth/auth.routers.js';

export class App {
    public app : Application;

    public constructor(private readonly port : number, private readonly db: PostgresDatabase) {
        this.app = express();

        this.initializeMiddlewares();
        this.initializeRouters();
    }

    private initializeMiddlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
    }

    private initializeRouters(): void {
        const db = PostgresDatabase.getInstance();
        this.app.get('/api/connection', async (_req: Request, res: Response) => {
            try {
                await db.query('SELECT 1');
                res.status(200).json({
                    status: 'ok',
                    message: 'Calculus API is connected',
                    database: 'connected',
                    timeStamp: new Date().toISOString(),
                });
            }catch(error) {
                res.status(200).json({
                    status: error,
                    message: 'Database connection failed',
                    error: (error as Error).message,
                });
            }
        });
        this.app.use('/api/auth', authRouter);
    }

    public listen(): void{
        this.app.listen(this.port, () => {
            console.log(`=================================`);
            console.log(`Server is running on port ${this.port}`);
            console.log(`Connection check: http://localhost:${this.port}/api/connection`);
            console.log(`=================================`);
        });
    }
}