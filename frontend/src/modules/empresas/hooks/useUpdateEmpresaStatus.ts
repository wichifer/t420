import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { empresasService } from "../services/empresas.service";
import { empresasKeys } from "../queries/empresas.keys";
import { dashboardKeys } from "@/modules/dashboard/queries/dashboard.keys";

export function useUpdateEmpresaStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      estado,
    }: {
      id: number;
      estado: boolean;
    }) => empresasService.updateStatus(id, estado),

onSuccess: async (_, variables) => {
  await queryClient.invalidateQueries({
    queryKey: empresasKeys.all,
  });

  await queryClient.refetchQueries({
    queryKey: dashboardKeys.stats(),
    type: "active",
  });

  toast.success(
    variables.estado
      ? "Empresa activada correctamente."
      : "Empresa suspendida correctamente."
  );
},

    onError: (error) => {
      console.error(error);

      toast.error(
        "No fue posible actualizar el estado de la empresa."
      );
    },
  });
}