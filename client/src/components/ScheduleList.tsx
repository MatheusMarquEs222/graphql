import { useQuery } from "@apollo/client"
import { GET_SCHEDULES } from "../queries/scheduleQueries"

const ScheduleList = () => {
    const {loading, error, data} = useQuery(GET_SCHEDULES);
    console.log(data)
    if (loading) {
        return <p>Carregando agendamentos...</p>;
    }

    if (error) {
        return <p>Erro ao carregar agendamentos: {error.message}</p>
    }

    return (
        <div>
            <h2 className="text-3xl font-bold underline text-blue-500">Agendamentos</h2>
            <ul>
                {data.schedules.map((schedule: any) => (
                    <li key={schedule.id}>
                        <strong>{schedule.product.name}</strong> para {schedule.client.name} -{' '}
                        <em>{new Date(schedule.scheduledDate).toLocaleDateString()}</em> -{' '}
                        <span>{schedule.status.toUpperCase()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ScheduleList;