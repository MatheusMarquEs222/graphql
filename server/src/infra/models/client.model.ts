import { Document, model, Schema } from "mongoose";

export interface IClient extends Document {
  name: string;
  cpf: string;
  rg: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    number: string;
    city: string;
    state: string;
    zip: string
  };
  createdAt?: Date;
}

const clientSchema = new Schema<IClient>({
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    rg: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: {
        street: { type: String, require: true },
        number: { type: String, require: true },
        city: { type: String, require: true },
        state: { type: String, require: true },
        zip: { type: String, require: true }
    },
    createdAt: { type: Date, default: Date.now }
});

export const ClientModel = model<IClient>('Client', clientSchema);