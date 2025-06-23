import { ISchedule } from "../../infra/models/schedule.model";
import { ICreateScheduleDTO } from "../dtos/schedule/createSchedule.dto";

export interface IScheduleRepository {
    create(schedule: ICreateScheduleDTO): Promise<ISchedule>;
    update(schedule: ISchedule): Promise<ISchedule>;
    findById(scheduleId: string): Promise<ISchedule | null>;
    findAll(): Promise<ISchedule[]>;
    
    findByClientId(clientId: string): Promise<ISchedule[]>;
    findByStatus(status: string): Promise<ISchedule[]>;
    findByDateRange(start: Date, end: Date): Promise<ISchedule[]>;
}