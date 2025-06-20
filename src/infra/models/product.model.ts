import {Document, model, Schema} from "mongoose";

export interface Product extends Document {
    name: string;
    description: string;
    price: number;
    maintenanceIntervalDays: number;
    createdAt?: Date;
}

const productSchema = new Schema<Product>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    maintenanceIntervalDays: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const ProductModel = model<Product>('Product', productSchema);