import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { GET_PRODUCTS } from "@/queries/productQueries";
import { useQuery } from "@apollo/client";
import { Pencil, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";


export function ProductList() {
    const { data, loading, error } = useQuery(GET_PRODUCTS);
    const navigate = useNavigate();
    
    if (error) {
        return  <p className="text-sm text-red-500">
                    Erro ao carregar produtos.
                </p>;
    }

    return (
        <div className="p-6">
            <div className="flex flex-row gap-2">
                <h2 className="text-2xl font-semibold mb-4">Produtos Cadastrados</h2>
                <Button
                    onClick={() => navigate("/products/new")}
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    >
                    <Plus className="w-4 h-4" />
                </Button>
            </div>

            {loading ? (
                <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
                </div>
            ) : (
                <ScrollArea className="h-[600px] rounded-md border p-4 bg-gray-50">
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

                                <div className="flex flex-col sm:items-end">
                                    <Button
                                        variant="link"
                                        onClick={() => navigate(`/products/new`, { state: { product } })}
                                        className="text-blue-500 hover:text-blue-700 p-0 h-auto"
                                    >
                                        <Pencil className="w-4 h-4 text-muted-foreground"/>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                </ScrollArea>
            )}
        </div>
    );
}
