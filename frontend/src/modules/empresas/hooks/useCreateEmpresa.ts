// src/modules/empresas/hooks/useCreateEmpresa.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { empresasService } from "../services/empresas.service";
import { empresasKeys } from "../queries/empresas.keys";
export function useCreateEmpresa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => empresasService.create(data),

    onSuccess: () => {
      toast.success("Empresa creada correctamente");

    queryClient.invalidateQueries({
        queryKey: empresasKeys.all,
    });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
        "No se pudo crear la empresa."
      );
    },
  });
}