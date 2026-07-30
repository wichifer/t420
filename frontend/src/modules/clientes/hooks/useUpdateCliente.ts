// src/modules/clientes/hooks/useUpdateCliente.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { clientesKeys } from "../queries/clientes.keys";
import { clientesService } from "../services/clientes.service";
import type {
  ClienteFormValues,
} from "../schemas";

interface UpdateClienteParams {
  id: number;
  data: ClienteFormValues;
}
export function useUpdateCliente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateClienteParams) =>
      clientesService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: clientesKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: clientesKeys.detail(variables.id),
      });

      toast.success("Cliente actualizado correctamente");
    },

    onError: () => {
      toast.error("No se pudo actualizar el cliente");
    },
  });
}