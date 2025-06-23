import { ICreateClientDTO } from "../../../domain/dtos/client/createClient.dto";
import { IClientRepository } from "../../../domain/repositories/client.repository";

export const createClientUseCase = async (
    input: ICreateClientDTO, 
    repo: IClientRepository
) => {
    return repo.create(input);
}