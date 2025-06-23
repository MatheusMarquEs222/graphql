import mongoose, { Document, Schema } from 'mongoose';

export interface IScheduleHistory extends Document {
    schedule: mongoose.Types.ObjectId;
    status: 'done';
    updatedAt: Date;
}

const ScheduleHistorySchema = new Schema({
    scheduleId: {type: Schema.Types.ObjectId, ref: 'Schedule', required: true},
    status: { type: String, enum: ['done'], required: true },
    updatedAt: { type: Date, default: Date.now }
});

export const ScheduleHistoryModel = mongoose.model<IScheduleHistory>('ScheduleHistory', ScheduleHistorySchema);
