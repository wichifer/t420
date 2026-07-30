import { useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import SearchInput from "@/components/common/SearchInput";
import DataTable from "@/components/common/DataTable";
import LoadingState from "@/components/common/LoadingState";
import EmptyState from "@/components/common/EmptyState";
import ConfirmDialog from "@/components/common/ConfirmDialog";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";


interface DemoRow {
  empresa: string;
  estado: string;
}


export default function Playground() {

  const [search, setSearch] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const tableData: DemoRow[] = [
    {
      empresa: "OpenAI SRL",
      estado: "Activo",
    },
    {
      empresa: "Empresa Demo",
      estado: "Pendiente",
    },
    {
      empresa: "Empresa Suspendida",
      estado: "Inactivo",
    },
  ];


  const columns = [
    {
      key: "empresa",
      header: "Empresa",
    },

    {
      key: "estado",
      header: "Estado",

      render: (row: DemoRow) => {

        if (row.estado === "Activo") {
          return (
            <StatusBadge variant="default">
              Activo
            </StatusBadge>
          );
        }


        if (row.estado === "Inactivo") {
          return (
            <StatusBadge variant="destructive">
              Inactivo
            </StatusBadge>
          );
        }


        return (
          <StatusBadge variant="outline">
            Pendiente
          </StatusBadge>
        );
      },
    },
  ];


  return (
    <>

      <PageHeader
        title="UI Playground"
        description="Pruebas de componentes comunes del SaaS"
      />


      <div className="space-y-8">


        <section>

          <h2 className="mb-3 text-lg font-semibold">
            StatusBadge
          </h2>


          <div className="flex flex-wrap gap-2">

            <StatusBadge variant="default">
              Activo
            </StatusBadge>


            <StatusBadge variant="destructive">
              Inactivo
            </StatusBadge>


            <StatusBadge variant="outline">
              Pendiente
            </StatusBadge>


            <StatusBadge variant="secondary">
              Borrador
            </StatusBadge>

          </div>

        </section>



        <section>

          <h2 className="mb-3 text-lg font-semibold">
            SearchInput
          </h2>


          <SearchInput
            value={search}
            onChange={(value) =>
              setSearch(value)
            }
            placeholder="Buscar empresa..."
          />

        </section>




        <section>

          <h2 className="mb-3 text-lg font-semibold">
            DataTable
          </h2>


          <DataTable
            data={tableData}
            columns={columns}
            getRowId={(row) =>
              row.empresa
            }
          />


        </section>




        <section>

          <h2 className="mb-3 text-lg font-semibold">
            LoadingState
          </h2>


          <LoadingState />


        </section>





        <section>

          <h2 className="mb-3 text-lg de font-semibold">
            EmptyState
          </h2>


          <EmptyState
            title="No hay empresas"
            description="Todavía no registraste ninguna empresa."
          >

            <Button>
              Nueva empresa
            </Button>


          </EmptyState>


        </section>





        <section>

          <h2 className="mb-3 text-lg font-semibold">
            ConfirmDialog
          </h2>


          <Button
            variant="destructive"
            onClick={() => setConfirmOpen(true)}
          >
            Eliminar empresa
          </Button>


          <ConfirmDialog
            open={confirmOpen}
            title="Eliminar empresa"
            description="Esta acción eliminará la empresa de forma permanente."
            onConfirm={() => {
              toast.success(
                "Empresa eliminada correctamente"
              );

              setConfirmOpen(false);
            }}
            onCancel={() => {
              setConfirmOpen(false);
            }}
          />

        </section>



      </div>

    </>
  );
}