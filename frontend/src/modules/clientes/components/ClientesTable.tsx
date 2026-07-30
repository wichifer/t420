import type { Column } from "@/components/common/DataTable";

import DataTable from "@/components/common/DataTable";
import { TableActions } from "@/components/common/TableActions";

import type { Cliente } from "../types/cliente";

interface Props {
  data: Cliente[];
  onView: (cliente: Cliente) => void;
  onEdit: (cliente: Cliente) => void;
  onDelete: (cliente: Cliente) => void;
}
export function ClientesTable({
  data,
  onView,
  onEdit,
  onDelete,
}: Props) {

  const columns: Column<Cliente>[] = [
    {
      key: "id_cliente",
      header: "ID",
    },
    {
      key: "cliente",
      header: "Cliente",
      render: (cliente) =>
        cliente.razon_social?.trim() ||
        `${cliente.nombre ?? ""} ${cliente.apellido ?? ""}`.trim(),
    },
    {
      key: "telefono",
      header: "Teléfono",
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "acciones",
      header: "Acciones",
      render: (cliente) => (
        <TableActions
          onView={() => onView(cliente)}
          onEdit={() => onEdit(cliente)}
          onDelete={() => onDelete(cliente)}
        />
      ),
    },
  ];

  return (
<DataTable
  columns={columns}
  data={data}
/>
  );
}