import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectGroup,
  SelectLabel 
} from "@/components/ui/select";
import { GET_SCHEDULES } from "@/queries/scheduleQueries";
import { UPDATE_SCHEDULE_STATUS } from "@/mutations/ScheduleUpdate.mutation";
import { RefreshCcw } from "lucide-react";

export function ScheduleList() {
  const { data, loading, error, refetch } = useQuery(GET_SCHEDULES, {
    fetchPolicy: "network-only",
  });
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

  if (loading) {
    return <p className="text-sm text-muted">Carregando agendamentos...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">Erro ao carregar: {error.message}</p>;
  }

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-4 mb-4 items-end">
        <div>
          <label className="block text-sm mb-1 text-muted-foreground">Status</label>
          <Select onValueChange={(value) => setFilterStatus(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filtrar</SelectLabel>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="scheduled">Agendado</SelectItem>
                <SelectItem value="done">Realizado</SelectItem>
                <SelectItem value="late">Atrasado</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm mb-1 text-muted-foreground">Buscar</label>
          <Input
            placeholder="Cliente ou Produto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[250px]"
          />
        </div>

        <Button variant="softButton" onClick={() => refetch()}>
          <RefreshCcw className="w-4 h-4 mr-2" />
          Atualizar
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchedules?.map((schedule: any) => (
          <Card key={schedule.id} className="shadow-sm border bg-white">
            <CardContent className="p-4 space-y-2">
              <div className="space-y-1">
                <p className="text-base font-semibold text-blue-500">{schedule.client.name}</p>
                <p className="text-sm text-muted-foreground">Produto: {schedule.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  Data: {new Date(schedule.scheduledDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block text-sm mb-1 text-muted-foreground">Status</label>
                <Select
                  defaultValue={schedule.status}
                  onValueChange={(value) => handleStatusChange(schedule.id, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
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
