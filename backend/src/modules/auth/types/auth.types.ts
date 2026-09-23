export interface IUser {
    user_id: number;
    user_uuid: string;
    username: string;
    email: string;
    hashpass: string | null;
    auth_provider: string;
    creation_date: Date;
}

export type IUserPublic = Omit<IUser, 'hashpass'>;

export interface AuthResult {
    user: IUserPublic;
    token: string;
}

export interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

export interface LoginBody {
  identifier: string;
  password: string;
}