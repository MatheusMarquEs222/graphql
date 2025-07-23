import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "@/mutations/ProductCreate.mutation";
import { useLocation, useNavigate } from "react-router-dom";

export function ProductForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const editingProducts = location.state?.product;

  const [form, setForm] = useState({
    name: editingProducts?.name || "",
    description: editingProducts?.description || "",
    price: editingProducts?.price?.toString() || "",
    maintenanceIntervalDays: editingProducts?.maintenanceIntervalDays?.toString() || "",
  });

  const [saveProduct, { loading, error, data }] = useMutation(
    editingProducts ? UPDATE_PRODUCT : CREATE_PRODUCT,
    {
      variables: editingProducts
        ? {
            id: editingProducts.id,
            input: {
              name: form.name,
              description: form.description,
              price: parseFloat(form.price),
              maintenanceIntervalDays: form.maintenanceIntervalDays
                ? parseInt(form.maintenanceIntervalDays)
                : undefined,
            },
          }
        : {
            input: {
              name: form.name,
              description: form.description,
              price: parseFloat(form.price),
              maintenanceIntervalDays: form.maintenanceIntervalDays
                ? parseInt(form.maintenanceIntervalDays)
                : undefined,
            },
          },
      onCompleted: () => {
        setForm({
          name: "",
          description: "",
          price: "",
          maintenanceIntervalDays: "",
        });
        navigate("/products");
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description || !form.price) return;
    saveProduct();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        {editingProducts ? "Editar Produto" : "Cadastrar Produto"}
      </h2>
      <Card className="p-6 shadow-sm border bg-gray-50">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="maintenanceIntervalDays">
                Intervalo de Manutenção (dias)
              </Label>
              <Input
                id="maintenanceIntervalDays"
                name="maintenanceIntervalDays"
                type="number"
                value={form.maintenanceIntervalDays}
                onChange={handleChange}
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                variant="softButton"
                className="px-4"
              >
                {loading
                  ? "Salvando..."
                  : editingProducts
                  ? "Atualizar Produto"
                  : "Cadastrar Produto"}
              </Button>
            </div>

            {error && (
              <p className="text-sm text-red-500 mt-2">
                Erro ao salvar produto.
              </p>
            )}
            {data && (
              <p className="text-sm text-green-600 mt-2">
                Produto salvo com sucesso!
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
