import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { productsService } from "../services/products.service";
import { productsKeys } from "../queries/products.keys";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsService.remove,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productsKeys.all,
      });

      toast.success("Producto eliminado correctamente");
    },

    onError: () => {
      toast.error("Error al eliminar el producto");
    },
  });
}