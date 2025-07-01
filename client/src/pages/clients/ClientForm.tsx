import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CREATE_CLIENT, UPDATE_CLIENT } from "@/mutations/clientCreate.mutation";
import { Label } from "@/components/ui/label";
import { useLocation, useNavigate } from "react-router-dom";

export function ClientForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const editingClient = location.state?.client;

  const [form, setForm] = useState({
    name: editingClient?.name || "",
    email: editingClient?.email || "",
    phone: editingClient?.phone || "",
  });

  const [saveClient, { loading, error, data }] = useMutation(
    editingClient ? UPDATE_CLIENT : CREATE_CLIENT,
    {
      variables: {
        ...(editingClient
          ? { input: { ...form, id: editingClient.id } }
          : { input: form }),
      },
      onCompleted: () => {
        setForm({ name: "", email: "", phone: "" });
        navigate("/clients"); 
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;
    saveClient();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        {editingClient ? "Editar Cliente" : "Cadastrar Novo Cliente"}
      </h2>
      <Card className="p-6 shadow-sm border">
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
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? "Salvando..." : editingClient ? "Atualizar Cliente" : "Cadastrar Cliente"}
              </Button>
            </div>

            {error && (
              <p className="text-sm text-red-500 mt-2">
                Erro ao cadastrar cliente.
              </p>
            )}

            {data && (
              <p className="text-sm text-green-600 mt-2">
                Cliente cadastrado com sucesso!
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
