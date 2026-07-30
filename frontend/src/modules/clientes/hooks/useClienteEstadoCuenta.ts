import { useQuery } from "@tanstack/react-query";

import { clientesService } from "../services/clientes.service";
import { clientesKeys } from "../queries/clientes.keys";
import type { ClienteEstadoCuenta } from "../types/cliente";

export function useClienteEstadoCuenta(id?: number) {
  return useQuery<ClienteEstadoCuenta>({
    queryKey: clientesKeys.estadoCuenta(id ?? 0),

    queryFn: () =>
      clientesService.getEstadoCuenta(id!),

    enabled: !!id,
  });
}