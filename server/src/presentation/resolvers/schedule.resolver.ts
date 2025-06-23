import { ScheduleModel } from "../../infra/models/schedule.model"

const scheduleResolver = {
    Query: {
        schedules: async () => {
            return await ScheduleModel.find({})
                .populate('client')
                .populate('product')
                .populate('sale');
        },
        schedulesByClient: async (_: any, { clientId }: any) => {
            return await ScheduleModel.find({client: clientId})
                .populate('client')
                .populate('product')
                .populate('sale'); 
        },
        schedulesByStatus: async (_: any, { status }: any) => {
            return await ScheduleModel.find({status})
                .populate('client')
                .populate('product')
                .populate('sale');
        },
        schedulesByDateRange: async (_: any, { start, end }: any) => {
            return await ScheduleModel.find({
                scheduledDate: {
                    $gte: new Date(start),
                    $lte: new Date(end)
                },
            }).populate('client').populate('product').populate('sale');
        },
    },
};

export default scheduleResolver;