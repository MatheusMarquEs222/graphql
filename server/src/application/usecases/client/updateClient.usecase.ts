import { IUpdateClientDTO } from "../../../domain/dtos/client/updateClient.dto";
import { IClientRepository } from "../../../domain/repositories/client.repository";

export const updateClientUseCase = async (
    id: string,
    data: IUpdateClientDTO,
    repo: IClientRepository
) => {
    return repo.update(id, data);
}