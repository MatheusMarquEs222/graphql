import { IClient } from "../../infra/models/client.model";
import { ICreateClientDTO } from "../dtos/client/createClient.dto";
import { IUpdateClientDTO } from "../dtos/client/updateClient.dto";

export interface IClientRepository {
    create(data: ICreateClientDTO): Promise<IClient>;
    findAll(): Promise<IClient[]>;
    update(id: string, data: IUpdateClientDTO): Promise<IClient>;
}