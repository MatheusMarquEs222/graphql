import { IScheduleRepository } from "../../../domain/repositories/schedule.repository";

export const listScheduleByStatusUseCase = async (
    repo: IScheduleRepository, 
    status: string
) => {
    return repo.findByStatus(status);
}