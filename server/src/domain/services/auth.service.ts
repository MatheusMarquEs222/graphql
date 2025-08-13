import { IUser } from "../../infra/models/user.model";

export type USER_ROLE = 'ADMIN' | 'MANAGER' | 'USER';

export interface IPasswordHasher {
    hash(plain: string): Promise<string>; 
    verify(hash: string, plain: string): Promise<boolean> 
}

export interface verifyAccessReturn extends IUser{
    sub: string
}

export interface IJwtService {
    signAccess(user: IUser): string;
    signRefresh(user: Partial<IUser>): string;
    verifyAccess(token: string): verifyAccessReturn;
    verifyRefresh(token: string): Partial<verifyAccessReturn>;
}