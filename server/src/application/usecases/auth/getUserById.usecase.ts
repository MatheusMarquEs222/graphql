import { IUserRepository } from "../../../domain";

export const getUserByIdUseCase = async (
    id: string, 
    repo: IUserRepository
) => repo.findById(id);
