import type { Column } from "@/components/common/DataTable";
import { TableActions } from "@/components/common/TableActions";

import type { Order } from "../types/order";
import { useOrderDrawer } from "../hooks/useOrderDrawer";

import { OrderStatusBadge } from "./OrderStatusBadge";

import {
  useApproveOrder,
  useDeleteOrder,
  useCancelOrder,
} from "../queries/orders.queries";

export function useOrderColumns(): Column<Order>[] {
  const drawer = useOrderDrawer();

  const approveMutation = useApproveOrder();
  const deleteMutation = useDeleteOrder();
  const cancelMutation = useCancelOrder();

  return [
    {
      key: "numero_orden",
      header: "Número",

      render: (order) => (
        <div className="font-medium">
          {order.numero_orden}
        </div>
      ),
    },

    {
      key: "fecha",
      header: "Fecha",

      render: (order) => (
        <div className="text-sm">
          {new Date(order.fecha).toLocaleDateString()}
        </div>
      ),
    },

    {
      key: "cliente",
      header: "Cliente",

      render: (order) => {
        const cliente = order.cliente ?? order.clientes;

        if (!cliente) {
          return <div>-</div>;
        }

        const nombreCompleto = [
          cliente.nombre,
          cliente.apellido,
        ]
          .filter(Boolean)
          .join(" ")
          .trim();

        return (
          <div>
            {cliente.razon_social?.trim() ||
              nombreCompleto ||
              "-"}
          </div>
        );
      },
    },

    {
      key: "estado",
      header: "Estado",

      render: (order) => (
        <OrderStatusBadge status={order.estado} />
      ),
    },

    {
      key: "total",
      header: "Total",
      className: "text-right",

      render: (order) => (
        <div className="text-right font-medium">
          ${Number(order.total).toLocaleString("es-AR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      ),
    },

    {
      key: "acciones",
      header: "Acciones",
      className: "w-[220px] text-right",

      render: (order) => (
        <TableActions
          onView={() =>
            drawer.openView(order.id_orden_compra)
          }

          onEdit={
            order.estado === "PENDIENTE"
              ? () =>
                  drawer.openEdit(
                    order.id_orden_compra
                  )
              : undefined
          }

          onDelete={
            order.estado === "PENDIENTE"
              ? () =>
                  deleteMutation.mutate(
                    order.id_orden_compra
                  )
              : undefined
          }

          onApprove={
            order.estado === "PENDIENTE"
              ? () =>
                  approveMutation.mutate(
                    order.id_orden_compra
                  )
              : undefined
          }

          onCancel={
            order.estado === "PENDIENTE"
              ? () =>
                  cancelMutation.mutate(
                    order.id_orden_compra
                  )
              : undefined
          }
        />
      ),
    },
  ];
}
