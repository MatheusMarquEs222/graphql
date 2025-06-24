import { Document, model, Schema, Types } from 'mongoose';

export type ScheduleStatus = 'pending' | 'scheduled' | 'done' | 'late';

export interface ISchedule extends Document {
    client: Types.ObjectId;
    product: Types.ObjectId;
    sale: Types.ObjectId;
    scheduledDate: Date;
    status: ScheduleStatus;
    notes?: string;
    createdAt: Date;
}

const scheduleSchema = new Schema<ISchedule>({
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    sale: { type: Schema.Types.ObjectId, ref: 'Sale', required: true },
    scheduledDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ['pending', 'scheduled', 'done', 'late'],
        default: 'pending',
        required: true
    },
    notes: String,
    createdAt: { type: Date, default: Date.now }
});

export const ScheduleModel = model<ISchedule>('Schedule', scheduleSchema);