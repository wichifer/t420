// src/modules/empresas/hooks/useUpdateEmpresa.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { empresasService } from "../services/empresas.service";
import { empresasKeys } from "../queries/empresas.keys";

import type { Empresa } from "@/types/empresa";

export function useUpdateEmpresa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: number; data: Partial<Empresa> }) =>
      empresasService.update(params),

    onSuccess: (_, variables) => {
      toast.success("Empresa actualizada correctamente");

      queryClient.invalidateQueries({
        queryKey: empresasKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: empresasKeys.detail(variables.id),
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "No se pudo actualizar la empresa."
      );
    },
  });
}