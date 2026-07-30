import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Building2 } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "usuario",
        JSON.stringify(
          response.data.usuario
        )
      );
      const usuario = response.data.usuario;

      localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
      );

      if (usuario.rol === "ADMIN_SAAS") {
        toast.success("Bienvenido al Panel SaaS");
        navigate("/saas/dashboard");
      } else {
        toast.success("Bienvenido");
        navigate("/dashboard");
      }


} catch (error: any) {

  console.error(
    "Error login:",
    error.response?.data
  );

  toast.error(
    error.response?.data?.message ||
    "Error al iniciar sesión"
  );

} finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Panel izquierdo Desktop */}

      <div
        className="
          hidden lg:flex
          flex-1
          bg-primary
          text-primary-foreground
          items-center
          justify-center
          p-10
        "
      >
        <div className="max-w-md">

          <div className="flex items-center gap-3 mb-6">
            <Building2 size={50} />

            <div>
              <h1 className="text-4xl font-bold">
                T420 SaaS
              </h1>

              <p className="opacity-80">
                Plataforma Multiempresa
              </p>
            </div>
          </div>

          <p className="text-lg opacity-90">
            Sistema integral para la gestión
            de empresas, clientes, ventas,
            productos y facturación.
          </p>

        </div>
      </div>

      {/* Panel Login */}

      <div
        className="
          flex-1
          flex
          items-center
          justify-center
          p-6
        "
      >
        <Card className="w-full max-w-md">

          <CardHeader>

            <div className="flex justify-center mb-4 lg:hidden">
              <Building2 size={50} />
            </div>

            <CardTitle className="text-3xl text-center">
              Iniciar Sesión
            </CardTitle>

            <CardDescription className="text-center">
              Accede a tu cuenta para continuar
            </CardDescription>

          </CardHeader>

          <CardContent className="space-y-5">

            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                type="email"
                placeholder="admin@empresa.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Contraseña</Label>

              <Input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            <Button
              className="w-full"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading
                ? "Ingresando..."
                : "Ingresar"}
            </Button>

          </CardContent>

        </Card>
      </div>
      
    </div>
  );

}