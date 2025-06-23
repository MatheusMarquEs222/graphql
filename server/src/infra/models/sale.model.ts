import { Document, model, Schema, Types } from 'mongoose';

export interface ISale extends Document {
    client: Types.ObjectId;
    items: {
        product: Types.ObjectId;
        quantity: number;
        price: number;
    }[];
    totalValue: number;
    saleDate: Date;
}

const saleSchema = new Schema<ISale>({
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: Number
    }],
    totalValue: { type: Number, required: true },
    saleDate: { type: Date, default: Date.now }
});

export const SaleModel = model<ISale>('Sale', saleSchema);