// src/pages/sales/SaleForm.tsx
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
    Select, 
    SelectTrigger, 
    SelectValue, 
    SelectContent, 
    SelectItem 
} from "@/components/ui/select";
import { GET_CLIENTS } from "@/queries/clientQueries";
import { GET_PRODUCTS } from "@/queries/productQueries";
import { CREATE_SALE } from "@/mutations/SaleCreate.mutation";

export function SaleForm() {
  const navigate = useNavigate();
  const { data: clientsData } = useQuery(GET_CLIENTS);
  const { data: productsData } = useQuery(GET_PRODUCTS);

  const [items, setItems] = useState([
    { productId: "", quantity: 1, price: 0 }
  ]);

  const [form, setForm] = useState({
    clientId: "",
    saleDate: "",
    items
  });

  const [createSale, { loading, error }] = useMutation(CREATE_SALE, {
    variables: {
      input: {
        client: form.clientId,
        items: form.items.map(item => ({
          product: item.productId,
          quantity: item.quantity,
          price: parseFloat(item.price as any),
        })),
        ...(form.saleDate ? { saleDate: form.saleDate } : {}),
      },
    },
    onCompleted: () => {
      navigate("/sales/rules");
    }
  });

  const handleItemChange = (index: number, field: string, value: any) => {
    const updatedItems: any = [...items];

  if (field === "productId") {
    updatedItems[index][field] = value;

    const selectedProduct = productsData?.products.find((p: any) => p.id === value);
    if (selectedProduct) {
      updatedItems[index].price = selectedProduct.price;
    }
  } else {
    updatedItems[index][field] = value;
  }

  setItems(updatedItems);
  };

  const addItem = () => {
    setForm({ ...form, items: [...form.items, { productId: "", quantity: 1, price: 0 }] });
  };

  const removeItem = (index: number) => {
    const updatedItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: updatedItems });
  };

  const total = form.items.reduce((sum, item) => sum + (item.quantity * parseFloat(String(item.price))), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientId || form.items.length === 0) return;
    createSale();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Registrar Nova Venda</h2>
      <Card className="p-6 shadow-sm border bg-gray-50">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label>Cliente</Label>
              <Select onValueChange={(value) => setForm({ ...form, clientId: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientsData?.clients.map((client: any) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Data da Venda (opcional)</Label>
              <Input
                type="date"
                value={form.saleDate}
                onChange={(e) => setForm({ ...form, saleDate: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <Label>Produtos</Label>
              {form.items.map((item, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 items-end">
                  <Select
                    onValueChange={(value) => handleItemChange(index, "productId", value)}
                    value={item.productId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Produto" />
                    </SelectTrigger>
                    <SelectContent>
                      {productsData?.products.map((p: any) => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value))}
                    placeholder="Qtd"
                  />
                  <Input
                    type="number"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, "price", e.target.value)}
                    placeholder="Preço"
                  />
                  <p className="text-sm col-span-1">R$ {(item.quantity * parseFloat(String(item.price))).toFixed(2)}</p>
                  <Button type="button" variant="outline" onClick={() => removeItem(index)}>Remover</Button>
                </div>
              ))}
              <Button type="button" onClick={addItem} variant="softButton">Adicionar Produto</Button>
            </div>

            <div className="text-right font-semibold text-lg">
              Total: R$ {total.toFixed(2)}
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              variant="softButton"
            >
              {loading ? "Salvando..." : "Registrar Venda"}
            </Button>

            {error && <p className="text-sm text-red-500">Erro ao registrar venda.</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
