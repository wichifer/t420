
// C:\dev\t420\frontend\src\modules\orders\components\OrderDetails.tsx

import type { Order } from "../types/order";

import { OrderStatusBadge } from "./OrderStatusBadge";

interface Props {
  order?: Order;
}

export function OrderDetails({ order }: Props) {
  if (!order) {
    return <div>No se encontró la orden.</div>;
  }

const clienteNombre =
  order.cliente?.razon_social?.trim() ||
  [
    order.clientes?.nombre ?? order.cliente?.nombre,
    order.clientes?.apellido ?? order.cliente?.apellido,
  ]
    .filter(Boolean)
    .join(" ")
    .trim() ||
  "-";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Número
          </p>

          <p className="font-medium">
            {order.numero_orden}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Fecha
          </p>

          <p className="font-medium">
            {new Date(order.fecha).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Cliente
          </p>

          <p className="font-medium">
            {clienteNombre}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Estado
          </p>

          <OrderStatusBadge status={order.estado} />
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-semibold">
          Detalle
        </h3>

        <div className="space-y-2">
          {order.items?.map((item) => (
            <div
              key={item.id_detalle_orden}
              className="flex justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">
                  {item.descripcion_articulo}
                </p>

                <p className="text-sm text-muted-foreground">
                  Cantidad: {item.cantidad}
                </p>
              </div>

              <div className="text-right">
                <p>
                  $
                  {(Number(item.subtotal) || 0).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            Total
          </p>

          <p className="text-2xl font-bold">
            ${(Number(order.total) || 0).toFixed(2)}
          </p>
        </div>
      </div>

      {order.observaciones && (
        <div>
          <p className="text-sm text-muted-foreground">
            Observaciones
          </p>

          <p>{order.observaciones}</p>
        </div>
      )}
    </div>
  );
}