import { IScheduleHistory, ScheduleHistoryModel } from "../../../infra/models/scheduleHistory.model";
import { IScheduleHistoryRepository } from "../schedule-history.repository";

export class MongooseScheduleHistoryRepository implements IScheduleHistoryRepository {
    async findAll(): Promise<IScheduleHistory[]> {
        return await ScheduleHistoryModel.find({}).populate({
            path: 'schedule',
            populate: ['client', 'product', 'sale']
        })
    }
}