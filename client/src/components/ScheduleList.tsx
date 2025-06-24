import { useQuery } from "@apollo/client"
import { GET_SCHEDULES } from "../queries/scheduleQueries"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    scheduled: "bg-blue-100 text-blue-800",
    done: "bg-green-100 text-green-800",
    late: "bg-red-100 text-red-800"
}

export function ScheduleList() {
    const {loading, error, data} = useQuery(GET_SCHEDULES);

    if (loading) {
        return <p>Carregando agendamentos...</p>;
    }

    if (error) {
        return <p>Erro ao carregar agendamentos: {error.message}</p>
    }

    return (
        <ScrollArea className="h-[80vh] rounded-lg border p-4">
            <div className="space-y-4">
                {data.schedules.map((schedule: any) => (
                    <Card key={schedule.id} className="shadow-sm">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <div>
                                <CardTitle className="text-base">
                                    {schedule.product.name} - {schedule.client.name}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    Manutenção em {new Date(schedule.scheduledDate).toLocaleDateString()}
                                </p>
                            </div>
                            <Badge
                                className={statusColors[schedule.status as keyof typeof statusColors] + " capitalize"}
                            >
                                {schedule.status}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">ID: {schedule.id}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </ScrollArea>
    )
};