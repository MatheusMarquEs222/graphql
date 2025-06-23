import { IUpdateScheduleDTO } from "../../../domain/dtos/schedule/updateSchedule.dto";
import { IScheduleRepository } from "../../../domain/repositories/schedule.repository";
import { IProduct } from "../../../infra/models/product.model";
import { ISchedule } from "../../../infra/models/schedule.model";

export const updateScheduleStatusUseCase = async (
    repo: IScheduleRepository,
    data: IUpdateScheduleDTO
): Promise<ISchedule> => {
    const schedule = await repo.findById(data.scheduleId);

    if (!schedule) { 
        throw new Error(`Agendamento com ID ${data.scheduleId} não encontrado`);
    }

    const product = schedule.product as unknown as IProduct;
    schedule.status = data.status;
    
    const updatedSchedule = await repo.update(schedule);

    console.log(updatedSchedule)

    if (!updatedSchedule) {
        throw new Error(`Erro ao atualizar o agendamento com ID ${data.scheduleId}`);
    }

    if (data.status === 'done' && product.maintenanceIntervalDays) {
        const nextDate = new Date();
        
        nextDate.setDate(nextDate.getDate() + product.maintenanceIntervalDays);

        await repo.create({
            client: schedule.client._id,
            product: schedule.product._id,
            sale: schedule.sale._id,
            scheduledDate: nextDate,
            status: 'pending',
            notes: `Novo agendamento gerado após status 'done' de ${schedule._id}`
        });
    }

    return updatedSchedule;
};