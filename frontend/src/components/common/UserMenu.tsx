import {
  User,
  LogOut,
  Settings,
  KeyRound,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Button,
} from "@/components/ui/button";

import {
  useAuthStore,
} from "@/modules/auth/store/authStore";

import {
  useLogout,
} from "@/modules/auth/hooks/useLogout";


export default function UserMenu() {


  const usuario =
    useAuthStore(
      (state) => state.usuario
    );


  const {
    executeLogout,
  } = useLogout();



  return (

    <DropdownMenu>

      <DropdownMenuTrigger asChild>

        <Button
          variant="ghost"
          size="sm"
          className="
            gap-2
          "
        >

          <User
            size={18}
          />


          <span
            className="
              hidden
              md:inline
            "
          >

            {
              usuario?.email
              ??
              "Usuario"
            }

          </span>


        </Button>

      </DropdownMenuTrigger>



      <DropdownMenuContent
        align="end"
        className="w-56"
      >


        <DropdownMenuLabel>

          <div
            className="
              flex
              flex-col
            "
          >

            <span
              className="
                text-sm
                font-medium
              "
            >

              {
                usuario?.email
              }

            </span>


            <span
              className="
                text-xs
                text-muted-foreground
              "
            >

              {
                usuario?.rol
              }

            </span>


          </div>

        </DropdownMenuLabel>



        <DropdownMenuSeparator />



        <DropdownMenuItem>

          <User
            className="mr-2"
            size={16}
          />

          Mi perfil

        </DropdownMenuItem>



        <DropdownMenuItem>

          <KeyRound
            className="mr-2"
            size={16}
          />

          Cambiar contraseña

        </DropdownMenuItem>



        <DropdownMenuItem>

          <Settings
            className="mr-2"
            size={16}
          />

          Configuración

        </DropdownMenuItem>



        <DropdownMenuSeparator />



        <DropdownMenuItem
          onClick={
            executeLogout
          }
        >

          <LogOut
            className="mr-2"
            size={16}
          />

          Cerrar sesión

        </DropdownMenuItem>


      </DropdownMenuContent>


    </DropdownMenu>

  );
}