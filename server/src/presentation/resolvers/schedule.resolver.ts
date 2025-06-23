import { listScheduleUseCase } from "../../application/usecases/schedule/listSchedule.usecase";
import { listScheduleByClientUseCase } from "../../application/usecases/schedule/listScheduleByClient.usecase";
import { listScheduleByDateRangeUseCase } from "../../application/usecases/schedule/listScheduleByDateRange.usecase";
import { listScheduleByStatusUseCase } from "../../application/usecases/schedule/listScheduleByStatus.usecase";
import { updateScheduleStatusUseCase } from "../../application/usecases/schedule/updateScheduleStatus.usecase";
import { MongooseScheduleRepository } from "../../domain/repositories/mongoose/mongooseSchedule.repository";
import { ISchedule } from "../../infra/models/schedule.model"

const scheduleRepo = new MongooseScheduleRepository();

const scheduleResolver = {
    Query: {
        schedules: async () => {
            return listScheduleUseCase(scheduleRepo);
        },
        schedulesByClient: async (_: any, { clientId }: any) => {
            return listScheduleByClientUseCase(scheduleRepo, clientId);
        },
        schedulesByStatus: async (_: any, { status }: any) => {
            return listScheduleByStatusUseCase(scheduleRepo, status);
        },
        schedulesByDateRange: async (_: any, { start, end }: any) => {
            return listScheduleByDateRangeUseCase(
                scheduleRepo, 
                new Date(start), 
                new Date(end)
            );
        },
    },
    Mutation: {
        updateScheduleStatus: async (_: any, { input }: any): Promise<ISchedule> => {
            return updateScheduleStatusUseCase(scheduleRepo, input);
        },
    },
};

export default scheduleResolver;