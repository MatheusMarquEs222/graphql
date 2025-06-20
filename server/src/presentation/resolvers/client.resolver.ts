import { ClientModel } from "../../infra/models/client.model"

const clientResolver = {
    Query: {
        clients: async () => {
            return await ClientModel.find();
        },
    },
    Mutation: {
        createClient: async (_: any, { input }: any) => {
            const client = await ClientModel.create(input);
            return client;
        },
    },
};

export default clientResolver;