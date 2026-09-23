import dotenv from 'dotenv';
import { App } from '../src/app.js';
import { PostgresDatabase } from './config/db.js';
import { AuthRepository } from '../src/modules/auth/auth.repository.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;
const db = PostgresDatabase.getInstance();

const server = new App(PORT, db);
await db.testConnection();


server.listen();