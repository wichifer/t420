// C:\dev\ordenes-saas-frontend\src\modules\stock\hooks\useStock.ts
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { stockKeys } from "../queries/stock.keys";
import { stockService } from "../services/stock.service";

import type {
  CreateStockMovementDto,
} from "../types/stock.types";

export function useStockMovements() {

  return useQuery({

    queryKey:
      stockKeys.movements(),

    queryFn: () =>
      stockService.getMovements(),

    staleTime: 60_000,

  });

}

export function useStockMovement(
  id?: number,
) {

  return useQuery({

    queryKey:
      stockKeys.movement(id ?? 0),

    queryFn: () =>
      stockService.getMovement(id as number),

    enabled: Boolean(id),

    staleTime: 60_000,

  });

}

export function useLowStock() {

  return useQuery({

    queryKey: stockKeys.lowStock(),

    queryFn: () =>
      stockService.getLowStock(),

    staleTime: 60_000,

  });

}

export function useProducts() {

  return useQuery({

    queryKey: stockKeys.products(),

    queryFn: () =>
      stockService.getProducts(),

    staleTime: 60_000,

  });

}

export function useCreateMovement() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: (
      dto: CreateStockMovementDto,
    ) =>
      stockService.createMovement(dto),

    onSuccess: () => {

      toast.success(
        "Movimiento registrado correctamente",
      );

      queryClient.invalidateQueries({
        queryKey:
          stockKeys.movements(),
      });

      queryClient.invalidateQueries({
        queryKey:
          stockKeys.lowStock(),
      });

      queryClient.invalidateQueries({
        queryKey:
          stockKeys.products(),
      });

    },

    onError: (error: any) => {

      toast.error(

        error?.response?.data?.message ||

        "No fue posible registrar el movimiento",

      );

    },

  });

}
