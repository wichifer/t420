import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { productsService } from "../services/products.service";
import { productsKeys } from "../queries/products.keys";

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: any;
    }) => productsService.update(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productsKeys.all,
      });

      toast.success("Producto actualizado correctamente");
    },

    onError: () => {
      toast.error("Error al actualizar el producto");
    },
  });
}