// src/modules/empresas/pages/EmpresasPage.tsx

import { useMemo, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";
import EmptyState from "@/components/common/EmptyState";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";

import EmpresasTable from "../components/EmpresasTable";
import { EmpresaDrawer } from "@/modules/empresas/components/drawers/EmpresaDrawer";

import { useEmpresas } from "../hooks/useEmpresas";
import { useDeleteEmpresa } from "../hooks/useDeleteEmpresa";
import { useEmpresaDrawer } from "../state/useEmpresaDrawer";

import type { Empresa } from "@/types/empresa";
import { toast } from "sonner";

export default function EmpresasPage() {
  const { data: empresas = [], isLoading, error } = useEmpresas();

  const deleteEmpresa = useDeleteEmpresa();

  const { openCreate, openEdit } = useEmpresaDrawer();

  const [search, setSearch] = useState("");

  const [empresaAEliminar, setEmpresaAEliminar] =
    useState<Empresa | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return empresas.filter((e) => {
      return (
        e.razon_social.toLowerCase().includes(q) ||
        e.cuit.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q)
      );
    });
  }, [empresas, search]);

  if (error) {
    return (
      <EmptyState
        title="Error al cargar empresas"
        description="Ocurrió un error al obtener los datos."
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Empresas"
        actions={
          <Button onClick={openCreate}>
            Nueva Empresa
          </Button>
        }
      />

      <div className="rounded-xl border bg-card shadow-sm">

        <div className="border-b p-4">
          <SearchInput
            placeholder="Buscar empresa..."
            value={search}
            onChange={setSearch}
          />
        </div>

<EmpresasTable
  data={filtered}
  onEdit={(empresa) =>
    openEdit(empresa)
  }
  onDelete={setEmpresaAEliminar}
/>

        {!isLoading && filtered.length === 0 && (
          <div className="p-6">
            <EmptyState
              title="No hay empresas"
              description="No se encontraron resultados."
            />
          </div>
        )}
      </div>

      {/* Drawer enterprise (nuevo sistema) */}
      <EmpresaDrawer />

      <ConfirmDialog
        open={!!empresaAEliminar}
        title="Eliminar empresa"
        description={`¿Eliminar ${empresaAEliminar?.razon_social}?`}
        onCancel={() => setEmpresaAEliminar(null)}
        onConfirm={async () => {
          if (!empresaAEliminar) return;

          await deleteEmpresa.mutateAsync(
            empresaAEliminar.id_empresa
          );

          setEmpresaAEliminar(null);
        }}
      />
    </div>
  );
}