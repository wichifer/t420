// src/modules/empresas/components/EmpresasTable.tsx
import { Pencil, Trash2 } from "lucide-react";

import DataTable from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";

import type { Empresa } from "@/types/empresa";
import { EmpresaStatusSwitch } from "./EmpresaStatusSwitch";

interface Props {
  data: Empresa[];
  onEdit: (empresa: Empresa) => void;
  onDelete: (empresa: Empresa) => void;
}

export default function EmpresasTable({
  data,
  onEdit,
  onDelete,
}: Props) {
  const columns = [
    {
      key: "razon_social",
      header: "Razón Social",
    },
    {
      key: "cuit",
      header: "CUIT",
      render: (row: Empresa) => row.cuit || "-",
    },
    {
      key: "email",
      header: "Email",
      render: (row: Empresa) => row.email || "-",
    },
{
  key: "estado",
  header: "Estado",
  render: (row: Empresa) => (
    <div className="flex items-center gap-3">
      <StatusBadge
        status={row.estado ? "active" : "inactive"}  
      />

      <EmpresaStatusSwitch empresa={row} />
    </div>
  ),
},
    {
      key: "acciones",
      header: "",
      render: (row: Empresa) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(row)}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(row)}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
    />
  );
}