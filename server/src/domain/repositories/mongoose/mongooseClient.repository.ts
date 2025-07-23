import { ClientModel, IClient } from "../../../infra/models/client.model";
import { ICreateClientDTO } from "../../dtos/client/createClient.dto";
import { IUpdateClientDTO } from "../../dtos/client/updateClient.dto";
import { IClientRepository } from "../client.repository";

export class MongooseClientRepository implements IClientRepository {
    async create(data: ICreateClientDTO): Promise<IClient> {
        return ClientModel.create(data);
    };

    async findAll(): Promise<IClient[]> {
        return ClientModel.find();
    }

    async update(id: string, data: IUpdateClientDTO): Promise<IClient> {
        const updatePayload: any = {};

        if (data.name) updatePayload.name = data.name;
        if (data.email) updatePayload.email = data.email;
        if (data.phone) updatePayload.phone = data.phone;

        if (data.address) {
            if (data.address.street) updatePayload["address.street"] = data.address.street;
            if (data.address.number) updatePayload["address.number"] = data.address.number;
            if (data.address.city) updatePayload["address.city"] = data.address.city;
            if (data.address.state) updatePayload["address.state"] = data.address.state;
            if (data.address.zip) updatePayload["address.zip"] = data.address.zip;
        }

        const client = await ClientModel.findByIdAndUpdate(
            id,
            { $set: updatePayload },
            { new: true, runValidators: true }
        );

        if (!client) {
            throw new Error("Cliente não encontrado");
        }

        return client;
    }

}