// src/modules/clientes/hooks/useDeleteCliente.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { clientesKeys } from "../queries/clientes.keys";
import { clientesService } from "../services/clientes.service";

export function useDeleteCliente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientesService.remove,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: clientesKeys.all,
      });

      toast.success("Cliente eliminado correctamente");
    },

    onError: () => {
      toast.error("No se pudo eliminar el cliente");
    },
  });
}