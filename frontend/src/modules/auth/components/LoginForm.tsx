import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Eye,
  EyeOff,
} from "lucide-react";

import { toast } from "sonner";

import { useLogin } from "../hooks/useLogin";


export default function LoginForm() {

  const navigate = useNavigate();

  const { executeLogin } = useLogin();


  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [remember, setRemember] =
    useState(true);

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);



  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    try {

      setLoading(true);


      const usuario =
        await executeLogin(
          email,
          password,
          remember
        );


      if (
        usuario.rol === "ADMIN_SAAS"
      ) {

        toast.success(
          "Bienvenido al Panel SaaS"
        );


        navigate(
          "/saas/dashboard"
        );


      } else {

        toast.success(
          "Bienvenido"
        );


        navigate(
          "/dashboard"
        );

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

    <Card
      className="
        w-full
        max-w-md
      "
    >

      <CardHeader>

        <CardTitle
          className="
            text-3xl
            text-center
          "
        >
          Iniciar Sesión
        </CardTitle>


        <CardDescription
          className="
            text-center
          "
        >
          Accede a tu cuenta para continuar
        </CardDescription>


      </CardHeader>



      <CardContent>


        <form
          onSubmit={handleSubmit}
          className="
            space-y-5
          "
        >


          {/* EMAIL */}

          <div
            className="
              space-y-2
            "
          >

            <Label>
              Email
            </Label>


            <Input

              type="email"

              placeholder="admin@empresa.com"

              value={email}

              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }

              required

            />

          </div>



          {/* PASSWORD */}

          <div
            className="
              space-y-2
            "
          >

            <Label>
              Contraseña
            </Label>


            <div
              className="
                relative
              "
            >

              <Input

                type={
                  showPassword
                    ? "text"
                    : "password"
                }

                placeholder="********"

                value={password}

                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }

                className="
                  pr-10
                "

                required

              />


              <Button

                type="button"

                variant="ghost"

                size="icon"

                aria-label={
                  showPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }

                className="
                  absolute
                  right-0
                  top-0
                "

                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }

              >

                {
                  showPassword
                    ?
                    <EyeOff size={18} />
                    :
                    <Eye size={18} />
                }

              </Button>


            </div>


          </div>



          {/* OPCIONES */}

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <label
              className="
                flex
                items-center
                gap-2
                text-sm
                text-muted-foreground
                cursor-pointer
              "
            >

              <input

                type="checkbox"

                checked={remember}

                onChange={(e) =>
                  setRemember(
                    e.target.checked
                  )
                }

              />


              Recordarme


            </label>



            <button

              type="button"

              className="
                text-sm
                text-primary
                hover:underline
              "

              onClick={() =>
                toast.info(
                  "Recuperación de contraseña próximamente"
                )
              }

            >

              ¿Olvidaste tu contraseña?

            </button>


          </div>



          {/* LOGIN */}

          <Button

            type="submit"

            className="
              w-full
            "

            disabled={loading}

          >

            {
              loading
                ? "Ingresando..."
                : "Ingresar"
            }


          </Button>


        </form>


      </CardContent>


    </Card>

  );

}