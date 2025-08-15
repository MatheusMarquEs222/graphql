import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LOGIN } from "@/mutations/auth.mutation";
import { authStorage } from "@/services/authStorage";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);

  const [login, { loading, error }] = useMutation(LOGIN, {
    variables: { 
        email: form.email, 
        password: form.password 
    },
    onCompleted: (data) => {
      const payload = data?.login;
      if (payload?.accessToken && payload?.refreshToken) {
        authStorage.accessToken = payload.accessToken;
        authStorage.refreshToken = payload.refreshToken;
        navigate(from, { replace: true });
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    login();
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-sm border bg-white/70 backdrop-blur">
        <CardContent className="p-6">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold">Entrar</h1>
            <p className="text-sm text-gray-500">Acesse o Sistema de Gestão Automática</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute inset-y-0 right-2 my-auto text-xs px-2 rounded-md hover:bg-gray-100"
                  aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPwd ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full" variant="softButton">
              {loading ? "Entrando..." : "Entrar"}
            </Button>

            {error && (
              <p className="text-sm text-red-500" role="alert">
                {error.message.includes("E_INVALID_CREDENTIALS") ? "Credenciais inválidas." : "Erro ao entrar."}
              </p>
            )}

            <p className="text-xs text-gray-500 text-center pt-2">
              Dica: peça ao administrador para criar seu usuário se ainda não tiver acesso.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}