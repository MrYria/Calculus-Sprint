import { Pool } from 'pg';
import type { QueryResultRow } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

interface IDatabase {
    query<T extends QueryResultRow = QueryResultRow>(text: string, params?: unknown[]): Promise<T[]>;
    testConnection(): Promise<void>
    close(): Promise<void>
}

export class PostgresDatabase implements IDatabase {
    private static instance: PostgresDatabase | null = null;

    private pool: Pool;

    private constructor() {
        const connectionString = process.env.DATABASE_URL;

        if (!connectionString) {
            throw new Error('DATABASE_URL is not defined in .env file!');
        }

        const isProduction = process.env.NODE_ENV === 'production';

        this.pool = new Pool({
            connectionString,
            ssl: this.getSslConfig(isProduction),
        });
    }

    private getSslConfig(isProduction: boolean) {
        if (isProduction) {
            return {
                rejectUnauthorized: true,
                ca: process.env.DB_CA_CERT && process.env.DB_CA_CERT.trim() !== '' ? process.env.DB_CA_CERT : undefined,
            }
        }
        return {
            rejectUnauthorized: false,
        };
    }

    public static getInstance(): PostgresDatabase {
        if (!PostgresDatabase.instance) {
            PostgresDatabase.instance = new PostgresDatabase();
        }

        return PostgresDatabase.instance;
    }

    public async query<T extends QueryResultRow = QueryResultRow>(text: string, params?: unknown[]): Promise<T[]> {
        const start = Date.now();
        const result = await this.pool.query<T>(text, params);
        const duration = Date.now() - start;

        console.log(`Executed query: { text: "${text.substring(0, 40)}...", duration: ${duration}ms, rows: ${result.rowCount} }`);

        return result.rows;
    }

    public async testConnection(): Promise<void> {
        try {
            const rows = await this.query<{ now: Date }>('SELECT NOW()');
            const firstRow = rows[0];

            if (!firstRow) {
                throw new Error('Connection test returned no rows')
            }
            console.log(
                'Connected to PostgreSQL (Supabase) successfully at:',
                firstRow.now
            );

        } catch (error) {
            console.error('Failed to connect to PostgreSQL:', error);
            throw error;
        }
    }

    public async close(): Promise<void> {
        await this.pool.end();
        PostgresDatabase.instance = null;
        console.log('🔌 Database connection pool closed.');

    }

}