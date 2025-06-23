import { IClientRepository } from "../../../domain/repositories/client.repository";

export const listClientUseCase = async (repo: IClientRepository) => {
    return await repo.findAll();
}
