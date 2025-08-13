import { IUserRepository } from "../../../domain";

export const revokeSessionsUseCase = async (
    userId: string, 
    repo: IUserRepository
) => {
  await repo.incrementTokenVersion(userId);
};
