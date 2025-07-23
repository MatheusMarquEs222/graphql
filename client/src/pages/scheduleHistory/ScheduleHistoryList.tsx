import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GET_SCHEDULE_HISTORIES } from "@/queries/scheduleHistoryQuery";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export function ScheduleHistoryList() {
  const { data, loading, error } = useQuery(GET_SCHEDULE_HISTORIES);
  const [clientFilter, setClientFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  if (loading) {
    return <p className="p-6 text-sm text-muted">Carregando agendamentos...</p>;
  }

  if (error) {
    return <p className="p-6 text-sm text-red-500">Erro ao carregar dados.</p>;
  }

  const filtered = data.scheduleHistories.filter((h: any) => {
    const matchesClient = clientFilter ? h.schedule.client.id === clientFilter : true;
    const matchesProduct = productFilter ? h.schedule.product.id === productFilter : true;
    const matchesDate = dateFilter
      ? new Date(h.updatedAt).toISOString().slice(0, 10) === dateFilter
      : true;
    return matchesClient && matchesProduct && matchesDate;
  });

  const uniqueClients = Array.from(
    new Map(
      data.scheduleHistories.map((h: any) => [h.schedule.client.id, h.schedule.client])
    ).values()
  );

  const uniqueProducts = Array.from(
    new Map(
      data.scheduleHistories.map((h: any) => [h.schedule.product.id, h.schedule.product])
    ).values()
  );

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Relatório de Agendamentos Realizados</h2>

      <div className="flex flex-wrap gap-4">
        <Select onValueChange={setClientFilter}>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="Filtrar por cliente" />
          </SelectTrigger>
          <SelectContent>
            {uniqueClients.map((client: any) => (
              <SelectItem key={client.id} value={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setProductFilter}>
          <SelectTrigger className="w-60">
            <SelectValue placeholder="Filtrar por produto" />
          </SelectTrigger>
          <SelectContent>
            {uniqueProducts.map((product: any) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-60"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((history: any) => (
          <Card key={history.id} className="bg-gray-50 shadow-sm border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-blue-600 font-semibold">
                {history.schedule.client.name} - {history.schedule.product.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1 text-muted-foreground">
              <p>
                <strong className="text-black">Data do agendamento:</strong>{" "}
                {new Date(history.schedule.scheduledDate).toLocaleDateString("pt-BR")}
              </p>
              <p>
                <strong className="text-black">Realizado em:</strong>{" "}
                {new Date(history.updatedAt).toLocaleDateString("pt-BR")}
              </p>
              <p>
                <strong className="text-black">Status:</strong> {history.status}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
