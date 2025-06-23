import { IClient } from "../../infra/models/client.model";
import { ICreateClientDTO } from "../dtos/client/createClient.dto";

export interface IClientRepository {
    create(data: ICreateClientDTO): Promise<IClient>;
    findAll(): Promise<IClient[]>;
}