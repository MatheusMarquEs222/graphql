import { Types } from "mongoose";
import { ScheduleStatus } from "../../../infra/models/schedule.model";

export interface ICreateScheduleDTO {
    client: Types.ObjectId; // ID do cliente
    product: Types.ObjectId; // ID do produto
    sale: Types.ObjectId; // ID da venda associada
    scheduledDate: Date; // Data agendada
    status: ScheduleStatus; // Status do agendamento
    notes?: string; // Notas adicionais (opcional)
}