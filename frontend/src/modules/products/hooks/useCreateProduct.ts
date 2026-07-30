import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { productsService } from "../services/products.service";
import { productsKeys } from "../queries/products.keys";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productsKeys.all,
      });

      toast.success("Producto creado correctamente");
    },

    onError: () => {
      toast.error("Error al crear el producto");
    },
  });
}