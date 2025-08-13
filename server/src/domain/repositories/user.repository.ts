import { IUser } from "../../infra/models/user.model";

export interface IUserRepository {
    create(data: Partial<IUser> & { 
        name: string; 
        email: string; 
        passwordHash: string; 
        role: 'ADMIN'|'MANAGER'|'USER'; 
        tokenVersion?: number 
    }): Promise<IUser>;
    findById(id: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    update(id: string, data: Partial<IUser>): Promise<IUser>;
    list(
        params: { 
            page: number; 
            pageSize: number; 
            term?: string; 
            role?: 'ADMIN'|'MANAGER'|'USER' 
        }
    ): Promise<{ items: IUser[]; total: number }>;
    incrementTokenVersion(id: string): Promise<void>;
}