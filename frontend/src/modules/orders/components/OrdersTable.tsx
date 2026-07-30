import DataTable from "@/components/common/DataTable";

import type { Order } from "../types/order";

import { useOrderColumns } from "./OrderColumns";

interface Props {
  data: Order[];
  loading?: boolean;
}

export function OrdersTable({
  data,
  loading = false,
}: Props) {

  const columns = useOrderColumns();

  return (
    <div className="rounded-lg border bg-card">
      <DataTable
        data={data}
        columns={columns}
        loading={loading}
        getRowId={(row) =>
          row.id_orden_compra
        }
        emptyState={
          <div className="p-8 text-center text-muted-foreground">
            No hay órdenes registradas.
          </div>
        }
      />
    </div>
  );

}