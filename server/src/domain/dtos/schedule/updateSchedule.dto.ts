import { ScheduleStatus } from "../../../infra/models/schedule.model";

export interface IUpdateScheduleDTO {
    scheduleId: string;
    status: ScheduleStatus;
    notes?: string;
}