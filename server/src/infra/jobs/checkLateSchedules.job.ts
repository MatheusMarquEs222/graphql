import cron from 'node-cron';
import { ScheduleModel } from '../models/schedule.model';

export const scheduleLateCheckJob = () => {
    cron.schedule('0 0 * * *', async () => {
        const now = new Date();

        try {
            const expired = await ScheduleModel.find({
                scheduledDate: { $lt: now },
                status: 'scheduled'
            });

            for (const schedule of expired) {
                schedule.status = 'late';
                await schedule.save();

                console.log(`⏰ Agendamento ${schedule._id} atualizado para 'late'`)
            }

            if (expired.length) {
                console.log(`✅ Job de atraso executado: ${expired.length} agendamentos atualizados.`)
            } else {
                console.log('🕛 Job executado: nenhum agendamento em atraso.')
            }
        } catch (error) {
            console.error('❌ Erro ao executar job de atraso:', error);
        }
    })
}