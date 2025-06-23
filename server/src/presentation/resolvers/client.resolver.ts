import { createClientUseCase } from "../../application/usecases/client/createClient.usecase";
import { listClientUseCase } from "../../application/usecases/client/listClient.usecase";
import { MongooseClientRepository } from "../../domain/repositories/mongoose/mongooseClient.repository";

const clientRepo = new MongooseClientRepository();

const clientResolver = {
    Query: {
        clients: async () => {
            return await listClientUseCase(clientRepo);
        },
    },
    Mutation: {
        createClient: async (_: any, { input }: any) => {
            return await createClientUseCase(input, clientRepo);
        },
    },
};

export default clientResolver;