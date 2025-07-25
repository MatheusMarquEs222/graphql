import dotenv from 'dotenv';
import path from 'path';

if (process.env.NODE_ENV !== 'production') {
    const envFile = `.env.${process.env.NODE_ENV}`;
    dotenv.config({
        path: path.resolve(__dirname, '..', 'env', envFile)
    });
}

export const env = {
    port: process.env.PORT || 4000,
    mongoUri: process.env.MONGO_URI || '',
    frontednUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
}