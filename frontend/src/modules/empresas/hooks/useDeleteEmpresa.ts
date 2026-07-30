// src/modules/empresas/hooks/useDeleteEmpresa.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { empresasService } from "../services/empresas.service";
import { empresasKeys } from "../queries/empresas.keys";

export function useDeleteEmpresa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: empresasService.remove,

    onSuccess: () => {
      toast.success("Empresa eliminada correctamente");

      queryClient.invalidateQueries({
        queryKey: empresasKeys.all,
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "No se pudo eliminar la empresa."
      );
    },
  });
}