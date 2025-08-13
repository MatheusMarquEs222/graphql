import { IUserRepository, USER_ROLE } from "../../../domain";

export const listUsersUseCase = async (
    params: { 
        page: number; 
        pageSize: number; 
        term?: string; 
        role?: USER_ROLE 
    },
    repo: IUserRepository,
) => repo.list(params);