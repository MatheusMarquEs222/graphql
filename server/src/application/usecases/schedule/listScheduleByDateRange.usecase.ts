import { IScheduleRepository } from "../../../domain/repositories/schedule.repository";

export const listScheduleByDateRangeUseCase = async (
    repo: IScheduleRepository,
    start: Date,
    end: Date
) => {
    return repo.findByDateRange(start, end);
}