import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GET_CLIENTS } from "@/queries/clientQueries";
import { useQuery } from "@apollo/client";

export function ClientsList() {
    const {data, loading, error} = useQuery(GET_CLIENTS);

    if (loading) {
        return <p className="text-sm text-muted">Carregando...</p>;
    }

    if (error) {
        return  <p className="text-sm text-red-500">
                    Erro ao carregar clientes.
                </p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Clientes Cadastrados</h2>
            <ScrollArea className="h-[600px] rounded-md border p-4">
                <div className="grid grid-cols-1 gap-4">
                    {data.clients.map((client: any) => (
                    <Card key={client.id} className="p-4 shadow-sm border">
                        <CardContent className="p-0">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-base font-medium">{client.name}</h3>
                                    <p className="text-sm text-muted-foreground">{client.email}</p>
                                    <p className="text-sm text-muted-foreground">{client.phone}</p>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(client.createdAt).toLocaleDateString("pt-BR")}
                                </p>
                            </div>
                        </CardContent>
                    </Card>  
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};