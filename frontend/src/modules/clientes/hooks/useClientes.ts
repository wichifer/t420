// src/modules/clientes/hooks/useClientes.ts

import { useQuery } from "@tanstack/react-query";

import { clientesService } from "../services/clientes.service";
import { clientesKeys } from "../queries/clientes.keys";

export function useClientes() {
  return useQuery({
    queryKey: clientesKeys.lists(),
    queryFn: clientesService.getAll,
  });
}