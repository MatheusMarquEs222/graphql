import { IUserRepository } from "../../../domain";

export const getMeUseCase = async (
    id: string, 
    repo: IUserRepository
) => repo.findById(id);
