import { useQuery, useMutation } from "@apollo/client"
import { Card, CardContent } from "@/components/ui/card"
import { GET_SCHEDULES } from "@/queries/scheduleQueries"
import { UPDATE_SCHEDULE_STATUS } from "@/mutations/ScheduleUpdate.mutation"
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue,
    SelectGroup,
    SelectLabel
} from "@/components/ui/select"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ScheduleList() {
  const { data, loading, error, refetch } = useQuery(GET_SCHEDULES);
  const [updateStatus] = useMutation(UPDATE_SCHEDULE_STATUS);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleStatusChange = async (scheduleId: string, status: string) => {
    await updateStatus({
      variables: {
        input: {
          scheduleId,
          status,
        },
      },
    });
    refetch();
  };

  const filteredSchedules = data?.schedules.filter((s: any) => {
    const matchesStatus = filterStatus ? s.status === filterStatus : true;
    const matchesSearch = searchTerm
      ? s.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.product.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesStatus && matchesSearch;
  });

  if (loading) return <p>Carregando agendamentos...</p>;
  if (error) return <p>Erro ao carregar: {error.message}</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-4 mb-4 items-end">
        <div>
          <label className="block text-sm mb-1">Filtrar por Status:</label>
          <Select onValueChange={(value) => setFilterStatus(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="scheduled">Agendado</SelectItem>
                    <SelectItem value="done">Realizado</SelectItem>
                    <SelectItem value="late">Atrasado</SelectItem>
                </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm mb-1">Buscar:</label>
          <Input
            placeholder="Cliente ou Produto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[250px]"
          />
        </div>
        <Button onClick={() => refetch()}>Atualizar</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchedules?.map((schedule: any) => (
          <Card key={schedule.id} className="shadow-md">
            <CardContent className="p-4 space-y-2">
              <p><strong>Cliente:</strong> {schedule.client.name}</p>
              <p><strong>Produto:</strong> {schedule.product.name}</p>
              <p><strong>Data:</strong> {new Date(schedule.scheduledDate).toLocaleDateString()}</p>
              <div>
                <label className="block text-sm mb-1">Status:</label>
                <Select
                  defaultValue={schedule.status}
                  onValueChange={(value) => handleStatusChange(schedule.id, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status"/>
                  </SelectTrigger>
                  <SelectContent className="z-50">
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="scheduled">Agendado</SelectItem>
                    <SelectItem value="done">Realizado</SelectItem>
                    <SelectItem value="late">Atrasado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
