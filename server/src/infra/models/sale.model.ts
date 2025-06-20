import { Document, model, Schema, Types } from 'mongoose';

export interface Sale extends Document {
    client: Types.ObjectId;
    items: {
        product: Types.ObjectId;
        quantity: number;
        price: number;
    }[];
    saleDate: Date;
}

const saleSchema = new Schema<Sale>({
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    items: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: Number
    }],
    saleDate: { type: Date, default: Date.now }
});

export const SaleModel = model<Sale>('Sale', saleSchema);