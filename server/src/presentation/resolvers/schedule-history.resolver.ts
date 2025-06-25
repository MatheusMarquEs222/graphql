import { listScheduleHistoryUseCase } from "../../application/usecases/scheduleHistory/listScheduleHistory.usecase";
import { MongooseScheduleHistoryRepository } from "../../domain/repositories/mongoose/mongooseScheduleHistory.repository";

const scheduleHistoryRepo = new MongooseScheduleHistoryRepository();
const scheduleHistoryResolver = {
    Query: {
        scheduleHistories: async () => {
            return listScheduleHistoryUseCase(scheduleHistoryRepo);
        },
        // scheduleHistoriesByClient: async (_: any, { cliendId }: any) => {
        //     return listScheduleHistoryByClientUseCase(scheduleHistoryRepo, cliendId);
        // },
        // scheduleHistoryByProduct: async (_: any, {productId}: any) => {
        //     return listScheduleHistoryByProductUseCase(scheduleHistoryRepo, productId);
        // },
        // scheduleHistoryByDateRange: async (_: any, {start, end}: any) => {
        //     return listScheduleHistoryByDateRandeUseCase(
        //         scheduleHistoryRepo,
        //         new Date(start),
        //         new Date(end)
        //     )
        // },
    },
};

export default scheduleHistoryResolver;