import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { GET_PRODUCTS } from "@/queries/productQueries";
import { useMutation, useQuery } from "@apollo/client";


export function ProductList() {
    const { data, loading, error } = useQuery(GET_PRODUCTS);
    
    if (error) {
        return  <p className="text-sm text-red-500">
                    Erro ao carregar produtos.
                </p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Produtos Cadastrados</h2>

            {loading ? (
                <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
                </div>
            ) : (
                <ScrollArea className="h-[600px] rounded-md border p-4">
                <div className="grid grid-cols-1 gap-4">
                    {data?.products.map((product: any) => (
                        <Card key={product.id}>
                            <CardContent className="p-4 space-y-2">
                                <h3 className="text-lg font-medium">{product.name}</h3>
                                <p className="text-sm text-muted-foreground">{product.description}</p>
                                <p className="text-sm">
                                    <strong>Preço:</strong> R$ {product.price.toFixed(2)}
                                </p>
                                {product.maintenanceIntervalDays && (
                                    <p className="text-sm">
                                        <strong>Manutenção a cada:</strong> {product.maintenanceIntervalDays} dias
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
                </ScrollArea>
            )}
        </div>
    );
}
