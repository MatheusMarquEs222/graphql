import {Document, model, Schema} from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    maintenanceIntervalDays?: number;
    createdAt?: Date;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    maintenanceIntervalDays: Number,
    createdAt: { type: Date, default: Date.now }
});

export const ProductModel = model<IProduct>('Product', productSchema);