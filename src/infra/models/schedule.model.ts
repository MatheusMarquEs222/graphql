import { Document, model, Schema, Types } from 'mongoose';

export type ScheduleStatus = 'pending' | 'scheduled' | 'completed' | 'overdue';

export interface Schedule extends Document {
    client: Types.ObjectId;
    product: Types.ObjectId;
    sale: Types.ObjectId;
    scheduledDate: Date;
    status: ScheduleStatus;
    notes?: string;
    createdAt: Date;
}

const scheduleSchema = new Schema<Schedule>({
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    sale: { type: Schema.Types.ObjectId, ref: 'Sale', required: true },
    scheduledDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ['pending', 'scheduled', 'completed', 'overdue'],
        default: 'pending',
        required: true
    },
    notes: String,
    createdAt: { type: Date, default: Date.now }
});

export const ScheduleModel = model<Schedule>('Schedule', scheduleSchema);