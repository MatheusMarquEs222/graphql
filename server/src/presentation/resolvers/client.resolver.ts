import { createClientUseCase } from "../../application/usecases/client/createClient.usecase";
import { listClientUseCase } from "../../application/usecases/client/listClient.usecase";
import { updateClientUseCase } from "../../application/usecases/client/updateClient.usecase";
import { MongooseClientRepository } from "../../domain/repositories/mongoose/mongooseClient.repository";

const clientRepo = new MongooseClientRepository();

const clientResolver = {
    Query: {
        clients: async () => {
            return listClientUseCase(clientRepo);
        },
    },
    Mutation: {
        createClient: async (_: any, { input }: any) => {
            return createClientUseCase(input, clientRepo);
        },

        updateClient: async (_: any, { id, input }: any) => {
            return updateClientUseCase(id, input, clientRepo);
        }
    },
};

export default clientResolver;