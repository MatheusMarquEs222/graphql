import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GET_CLIENTS } from "@/queries/clientQueries";
import { useQuery } from "@apollo/client";
import { Pencil, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ClientsList() {
    const {data, loading, error} = useQuery(GET_CLIENTS, {
        fetchPolicy: 'network-only',
    });
    
    const navigate = useNavigate();

    if (loading) {
        return <p className="text-sm text-muted">Carregando...</p>;
    }

    if (error) {
        return  <p className="text-sm text-red-500">
                    Erro ao carregar clientes.
                </p>;
    }

    return (
        <div className="p-6 w-full max-w-7xl mx-auto">
            <div className="flex items-center mb-4 gap-2">
                <h2 className="text-2xl font-semibold">Clientes Cadastrados</h2>
                <Button
                    onClick={() => navigate("/clients/new")}
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                >
                    <Plus className="w-4 h-4" />
                </Button>
            </div>
            <ScrollArea className="max-h-[500px] p-2 overflow-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.clients.map((client: any) => (
                    <Card key={client.id} className="shadow-sm border bg-gray-50">
                        <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                <div>
                                    <h3 className="text-base font-medium">{client.name}</h3>
                                    <p className="text-sm text-muted-foreground">{client.email}</p>
                                    <p className="text-sm text-muted-foreground">{client.phone}</p>
                                </div>

                                <div className="flex flex-col gap-2 sm:items-end">
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(client.createdAt).toLocaleDateString("pt-BR")}
                                    </p>
                                    <Button
                                        variant="link"
                                        onClick={() => navigate(`/clients/new`, { state: { client } })}
                                        className="text-blue-500 hover:text-blue-700 p-0 h-auto"
                                    >
                                        <Pencil className="w-4 h-4 text-muted-foreground"/>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>  
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};