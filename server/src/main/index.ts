import { ApolloServer } from 'apollo-server-express';
import { connectToDatabase } from '../infra/database/mongo';
import cors from 'cors';
import { env } from './config/env';
import typeDefs from '../presentation/schemas';
import resolvers from '../presentation/resolvers';
import { scheduleLateCheckJob } from '../infra/jobs/checkLateSchedules.job';

const startServer = async () => {
    const app = require('express')();
    const corsOptions = {
        origin: env.frontednUrl,
        credentials: true
    };

    app.use(cors(corsOptions));

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    const PORT = env.port;

    await connectToDatabase(env.mongoUri);

    scheduleLateCheckJob();
    
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}${server.graphqlPath}`);
    });
};

startServer();
