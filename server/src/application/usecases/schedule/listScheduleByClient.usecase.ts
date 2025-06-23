import { IScheduleRepository } from "../../../domain/repositories/schedule.repository";
import { ISchedule } from "../../../infra/models/schedule.model";

export const listScheduleByClientUseCase = async (
    repo: IScheduleRepository, 
    clientId: string
): Promise<ISchedule[]> => {
    return repo.findByClientId(clientId);
}