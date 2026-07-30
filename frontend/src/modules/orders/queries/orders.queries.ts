import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { ordersService } from "../services/orders.service";
import { ordersKeys } from "./orders.keys";

// Si ya existe dashboardKeys, importarlo.
// import { dashboardKeys } from "@/features/dashboard/queries/dashboard.keys";


export function useOrders() {

  return useQuery({

    queryKey:
      ordersKeys.lists(),

    queryFn:
      ordersService.getAll,

  });

}
export function useOrder(id?: number) {

  return useQuery({

    queryKey:
      ordersKeys.detail(
        id ?? 0
      ),

    queryFn:
      () =>
        ordersService.getById(
          id!
        ),

    enabled:
      !!id,

  });

}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ordersService.create,

    onSuccess: (data) => {
      toast.success("Orden creada correctamente.");

      queryClient.invalidateQueries({
        queryKey: ordersKeys.all,
      });

      return data;
    },
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: any;
    }) =>
      ordersService.update(id, data),

    onSuccess: (_, variables) => {
      toast.success("Orden actualizada correctamente.");

      queryClient.invalidateQueries({
        queryKey: ordersKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: ordersKeys.detail(
          variables.id,
        ),
      });
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ordersService.remove,

    onSuccess: () => {
      toast.success("Orden eliminada.");

      queryClient.invalidateQueries({
        queryKey: ordersKeys.all,
      });
    },
  });
}

export function useApproveOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ordersService.approve,

    onSuccess: () => {
      toast.success("Orden aprobada.");

      queryClient.invalidateQueries({
        queryKey: ordersKeys.all,
      });

      // queryClient.invalidateQueries({
      //   queryKey: dashboardKeys.all,
      // });
    },
  });
}
export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      ordersService.update(id, {
        estado: "ANULADA",
      }),

    onSuccess: () => {
      toast.success("Orden anulada correctamente.");

      queryClient.invalidateQueries({
        queryKey: ordersKeys.all,
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ??
          "No se pudo anular la orden."
      );
    },
  });
}