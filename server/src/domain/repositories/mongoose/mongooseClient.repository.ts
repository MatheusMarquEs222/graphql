import { ClientModel, IClient } from "../../../infra/models/client.model";
import { ICreateClientDTO } from "../../dtos/client/createClient.dto";
import { IClientRepository } from "../client.repository";

export class MongooseClientRepository implements IClientRepository {
    async create(data: ICreateClientDTO): Promise<IClient> {
        return ClientModel.create(data);
    };

    async findAll(): Promise<IClient[]> {
        return ClientModel.find();
    }
}