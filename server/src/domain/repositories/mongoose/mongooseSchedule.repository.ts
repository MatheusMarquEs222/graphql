import { ISchedule, ScheduleModel } from "../../../infra/models/schedule.model";
import { ICreateScheduleDTO } from "../../dtos/schedule/createSchedule.dto";
import { IScheduleRepository } from "../schedule.repository";

export class MongooseScheduleRepository implements IScheduleRepository {
    create(schedule: ICreateScheduleDTO): Promise<ISchedule> {
        return ScheduleModel.create(schedule);
    }
    findById(scheduleId: string): Promise<ISchedule | null> {
        return ScheduleModel.findById(scheduleId)
            .populate('client')
            .populate('product')
            .populate('sale')
            .exec();
    }
    async update(schedule: ISchedule): Promise<ISchedule> {
        const updated = await ScheduleModel.findByIdAndUpdate(
            schedule._id, 
            schedule, 
            { new: true }
        ).populate('client').populate('product').populate('sale').exec();
        
        if (!updated) {
            throw new Error(`Agendamento com ID ${schedule._id} não encontrado para atualização`);
        }

        return updated;
    }
    async findAll(): Promise<ISchedule[]> {
        return await ScheduleModel.find({})
            .populate('client')
            .populate('product')
            .populate('sale')
            .exec();
    }
    findByClientId(clientId: string): Promise<ISchedule[]> {
        return ScheduleModel.find({ client: clientId })
            .populate('client')
            .populate('product')
            .populate('sale')
            .exec();
    }
    findByStatus(status: string): Promise<ISchedule[]> {
        return ScheduleModel.find({ status })
            .populate('client')
            .populate('product')
            .populate('sale')
            .exec();
    }
    findByDateRange(start: Date, end: Date): Promise<ISchedule[]> {
        return ScheduleModel.find({
            scheduledDate: {
                $gte: start,
                $lte: end
            }
        }).populate('client').populate('product').populate('sale').exec();
    }
}