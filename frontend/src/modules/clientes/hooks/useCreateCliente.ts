// src/modules/clientes/hooks/useCreateCliente.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { clientesKeys } from "../queries/clientes.keys";
import { clientesService } from "../services/clientes.service";

export function useCreateCliente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientesService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: clientesKeys.all,
      });

      toast.success("Cliente creado correctamente");
    },

    onError: () => {
      toast.error("No se pudo crear el cliente");
    },
  });
}