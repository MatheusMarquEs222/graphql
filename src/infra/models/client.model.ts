import { Document, model, Schema } from "mongoose";

export interface Client extends Document {
  name: string;
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

const clientSchema = new Schema<Client>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: {
        street: String,
        number: String,
        city: String,
        state: String,
        zip: String
    },
    createdAt: { type: Date, default: Date.now }
});

export const ClientModel = model<Client>('Client', clientSchema);