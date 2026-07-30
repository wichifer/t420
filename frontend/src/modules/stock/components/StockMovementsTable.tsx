// src/modules/stock/components/StockMovementsTable.tsx

import DataTable from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";

import type { StockMovement } from "../types/stock.types";


interface Props {
  movements: StockMovement[];

  onView?: (
    movement: StockMovement
  ) => void;
}


export default function StockMovementsTable({
  movements,
  onView,
}: Props) {

  return (
    <DataTable
      data={movements}

      onRowClick={
        onView
      }

      columns={[
        {
          key: "fecha",
          header: "Fecha",
          render: (movement) =>
            new Date(
              movement.fecha,
            ).toLocaleString("es-AR"),
        },


        {
          key: "tipo_movimiento",
          header: "Tipo",

          render: (movement) => (

            <StatusBadge
              variant={
                movement.tipo_movimiento === "ENTRADA"
                  ? "success"
                  : "destructive"
              }
            >

              {movement.tipo_movimiento}

            </StatusBadge>

          ),
        },


        {
          key: "codigo",
          header: "Código",

          render: (movement) =>
            movement.articulos?.codigo ?? "-",
        },


        {
          key: "descripcion",
          header: "Producto",

          render: (movement) =>
            movement.articulos?.descripcion ?? "-",
        },


        {
          key: "cantidad",
          header: "Cantidad",

          className:
            "text-right font-medium",

          render: (movement) =>
            movement.cantidad,
        },


        {
          key: "referencia",
          header: "Referencia",

          render: (movement) =>
            movement.referencia || "-",
        },

      ]}

    />
  );
}