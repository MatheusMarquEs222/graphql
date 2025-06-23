import { IScheduleRepository } from "../../../domain/repositories/schedule.repository";
import { ISchedule } from "../../../infra/models/schedule.model";

export const listScheduleUseCase = async (repo: IScheduleRepository): Promise<ISchedule[]> => {
    return repo.findAll();
}