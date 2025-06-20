import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: 'src/main/env/.env' });
const mongoUri = process.env.MONGO_URI;

export async function connectToDatabase(): Promise<void> {
    if (!mongoUri) {
        console.error('❌ MONGO_URI não definida no arquivo .env')
        process.exit(1);
    }

    try {
        mongoose.set('strictQuery', true);

        await mongoose.connect(mongoUri);
        console.log('✅ Conexão com MongoDB estabelecida com sucesso');
    } catch (error) {
        console.error('❌ Erro ao conectar com MongoDB:', error);
        process.exit(1);
    }
}