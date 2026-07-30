import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  LogOut,
  User,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function UserMenu() {
  const navigate = useNavigate();

  const usuario = JSON.parse(
    localStorage.getItem("usuario") || "{}"
  );

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>

        <Avatar className="cursor-pointer">
          <AvatarFallback>
            {usuario.email?.[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>

      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Perfil
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Salir
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}