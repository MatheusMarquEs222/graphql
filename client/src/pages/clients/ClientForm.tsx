import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation, useNavigate } from "react-router-dom";
import { CREATE_CLIENT, UPDATE_CLIENT } from "@/mutations/clientCreate.mutation";

export function ClientForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const editingClient = location.state?.client;

  const [form, setForm] = useState({
    name: editingClient?.name || "",
    email: editingClient?.email || "",
    phone: editingClient?.phone || "",
    cpf: editingClient?.cpf || "",
    rg: editingClient?.rg || "",
    address: {
      street: editingClient?.address?.street || "",
      number: editingClient?.address?.number || "",
      city: editingClient?.address?.city || "",
      state: editingClient?.address?.state || "",
      zip: editingClient?.address?.zip || "",
    },
  });

  const [saveClient, { loading, error, data }] = useMutation(
    editingClient ? UPDATE_CLIENT : CREATE_CLIENT,
    {
      variables: editingClient
        ? {
            id: editingClient.id,
            input: {
              name: form.name,
              email: form.email,
              phone: form.phone,
              address: { ...form.address },
            },
          }
        : {
            input: {
              name: form.name,
              email: form.email,
              phone: form.phone,
              cpf: form.cpf,
              rg: form.rg,
              address: { ...form.address },
            },
          },
      onCompleted: () => {
        setForm({
          name: "",
          email: "",
          phone: "",
          cpf: "",
          rg: "",
          address: {
            street: "",
            number: "",
            city: "",
            state: "",
            zip: "",
          },
        });
        navigate("/clients");
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name in form.address) {
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));

      // Busca ViaCEP automática
      if (name === "zip" && value.replace(/\D/g, "").length === 8) {
        fetch(`https://viacep.com.br/ws/${value}/json/`)
          .then((res) => res.json())
          .then((data) => {
            if (!data.erro) {
              setForm((prev) => ({
                ...prev,
                address: {
                  ...prev.address,
                  street: data.logradouro || "",
                  city: data.localidade || "",
                  state: data.uf || "",
                },
              }));
            }
          });
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.cpf || !form.rg) return;
    saveClient();
  };

  return (
    <div className="p-6 w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">
          {editingClient ? "Editar Cliente" : "Cadastrar Novo Cliente"}
        </h2>
      </div>

      <Card className="shadow-sm border bg-gray-50">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input id="cpf" name="cpf" value={form.cpf} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="rg">RG</Label>
                <Input id="rg" name="rg" value={form.rg} onChange={handleChange} required />
              </div>
            </div>

            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" name="phone" value={form.phone} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zip">CEP</Label>
                <Input id="zip" name="zip" value={form.address.zip} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="number">Número</Label>
                <Input id="number" name="number" value={form.address.number} onChange={handleChange} required />
              </div>
            </div>

            <div>
              <Label htmlFor="street">Rua</Label>
              <Input id="street" name="street" value={form.address.street} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" name="city" value={form.address.city} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="state">Estado</Label>
                <Input id="state" name="state" value={form.address.state} onChange={handleChange} required />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" disabled={loading} className="px-4" variant="softButton">
                {loading ? "Salvando..." : editingClient ? "Atualizar Cliente" : "Cadastrar Cliente"}
              </Button>
            </div>

            {error && <p className="text-sm text-red-500 mt-2">Erro ao cadastrar cliente.</p>}
            {data && <p className="text-sm text-green-600 mt-2">Cliente cadastrado com sucesso!</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
