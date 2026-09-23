import { PostgresDatabase } from '../../config/db.js';
import type { IUser, IUserPublic } from './types/auth.types.js';

export class AuthRepository {
  private db = PostgresDatabase.getInstance();

  public async findByUsername(username: string): Promise<IUser | null> {
    const sql = 'SELECT * FROM users WHERE username = $1';
    const rows = await this.db.query<IUser>(sql, [username]);
    return rows[0] || null;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const sql = 'SELECT * FROM users WHERE email = $1';
    const rows = await this.db.query<IUser>(sql, [email]);
    return rows[0] || null;
  }

  public async findByIdentifier(identifier: string): Promise<IUser | null> {
    const sql = 'SELECT * FROM users WHERE username = $1 OR email = $1';
    const rows = await this.db.query<IUser>(sql, [identifier]);
    return rows[0] || null;
  }

  public async createUser(
    username: string,
    email: string,
    hashpass: string,
    authProvider: string = 'local'
  ): Promise<IUserPublic> {
    const sql = `
      INSERT INTO users (username, email, hashpass, auth_provider) 
      VALUES ($1, $2, $3, $4) 
      RETURNING user_id, user_uuid, username, email, auth_provider, creation_date
    `;
    const rows = await this.db.query<IUserPublic>(sql, [
      username,
      email,
      hashpass,
      authProvider,
    ]);
    const user = rows[0];
    if(!user){
        throw new Error('User was not created');
    }
    return user;
  }
}