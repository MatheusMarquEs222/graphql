import { IScheduleHistoryRepository } from "../../../domain/repositories/schedule-history.repository";
import { IScheduleHistory } from "../../../infra/models/scheduleHistory.model";

export const listScheduleHistoryUseCase = async (
    repo: IScheduleHistoryRepository
): Promise<IScheduleHistory[]> => {
    return repo.findAll();
}