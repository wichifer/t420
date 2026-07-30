// src/modules/clientes/pages/ClientesPage.tsx

import { useMemo, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";
import EmptyState from "@/components/common/EmptyState";
import ConfirmDialog from "@/components/common/ConfirmDialog";

import { Button } from "@/components/ui/button";
import { ClientesTable } from "../components/ClientesTable";

import { ClienteUIController } from "../components/ClienteUIController";

import { useClientes } from "../hooks/useClientes";
import { useDeleteCliente } from "../hooks/useDeleteCliente";
import { useClienteDrawer } from "../state/useClienteDrawer";

import type { Cliente } from "../types/cliente";


export default function ClientesPage() {

  console.log("ENTRO A CLIENTES PAGE");

  const {
    data: clientes = [],
    isLoading,
    error,
  } = useClientes();


  const deleteCliente =
    useDeleteCliente();


  const {
    openCreate,
    openEdit,
    openView,
  } = useClienteDrawer();


  const [
    search,
    setSearch,
  ] = useState("");


  const [
    clienteAEliminar,
    setClienteAEliminar,
  ] =
    useState<Cliente | null>(null);
console.log("CLIENTES PAGE RENDER");

console.log({
  clientes,
  isLoading,
  error,
});

  const filtered =
    useMemo(() => {

      const q =
        search.toLowerCase();

      return clientes.filter((c) =>

        (
          c.razon_social ||
          `${c.nombre ?? ""} ${c.apellido ?? ""}`
        )
          .toLowerCase()
          .includes(q)

        ||

        (c.cuit ?? "")
          .toLowerCase()
          .includes(q)

        ||

        (c.documento ?? "")
          .toLowerCase()
          .includes(q)

        ||

        (c.email ?? "")
          .toLowerCase()
          .includes(q)

      );

    }, [
      clientes,
      search,
    ]);


  if (error) {

    return (

      <EmptyState
        title="Error al cargar clientes"
        description="Ocurrió un error al obtener los datos."
      />

    );

  }


  return (

    <div className="space-y-6">

      <PageHeader

        title="Clientes"

        actions={

          <Button
            onClick={openCreate}
          >
            Nuevo Cliente
          </Button>

        }

      />


      <div className="rounded-xl border bg-card shadow-sm">

        <div className="border-b p-4">

          <SearchInput

            placeholder="Buscar cliente..."

            value={search}

            onChange={setSearch}

          />

        </div>


        <ClientesTable

          data={filtered}

          onView={openView}

          onEdit={openEdit}

          onDelete={setClienteAEliminar}

        />


        {!isLoading && filtered.length === 0 && (

          <div className="p-6">

            <EmptyState

              title="No hay clientes"

              description="No se encontraron resultados."

            />

          </div>

        )}

      </div>


      <ClienteUIController />


      <ConfirmDialog

        open={!!clienteAEliminar}

        title="Eliminar cliente"

        description={`¿Eliminar ${
          clienteAEliminar?.razon_social ||
          `${clienteAEliminar?.nombre ?? ""} ${clienteAEliminar?.apellido ?? ""}`.trim()
        }?`}

        onCancel={() =>
          setClienteAEliminar(null)
        }

        onConfirm={async () => {

          if (!clienteAEliminar)
            return;

          await deleteCliente.mutateAsync(
            clienteAEliminar.id_cliente,
          );

          setClienteAEliminar(null);

        }}

      />

    </div>

  );

}