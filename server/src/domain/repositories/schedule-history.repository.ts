import { IScheduleHistory } from "../../infra/models/scheduleHistory.model";

export interface IScheduleHistoryRepository {
    findAll(): Promise<IScheduleHistory[]>   
}