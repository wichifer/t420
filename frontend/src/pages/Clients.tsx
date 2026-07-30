import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";

import { ClientsTable } from "@/modules/clientes/components/ClientsTable";
import { ClientDrawer } from "@/modules/clientes/components/ClientDrawer";

export default function ClientsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clientes"
        description="Gestioná los clientes de tu empresa"
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo cliente
          </Button>
        }
      />

      <ClientsTable />

      <ClientDrawer open={open} onOpenChange={setOpen} />
    </div>
  );
}