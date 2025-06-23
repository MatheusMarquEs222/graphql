import { ApolloServer } from 'apollo-server-express';
import { connectToDatabase } from '../infra/database/mongo';
import dotenv from 'dotenv';

import typeDefs from '../presentation/schemas';
import resolvers from '../presentation/resolvers';
import { scheduleLateCheckJob } from '../infra/jobs/checkLateSchedules.job';

dotenv.config({ path: 'src/main/env/.env' });

const startServer = async () => {
    const app = require('express')();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;

    await connectToDatabase();

    scheduleLateCheckJob();
    
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer();
