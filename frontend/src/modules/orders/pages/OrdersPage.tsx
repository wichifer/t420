// C:\dev\ordenes-saas-frontend\src\modules\orders\pages\OrdersPage.tsx

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PageHeader from "@/components/common/PageHeader";

import { OrdersTable } from "../components/OrdersTable";
import { OrderDrawer } from "../components/OrderDrawer";

import { useOrders } from "../queries/orders.queries";
import { useOrderDrawer } from "../hooks/useOrderDrawer";

export default function OrdersPage() {

  const { data = [], isLoading } = useOrders();

  const drawer = useOrderDrawer();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("TODOS");

  const filteredOrders = data.filter((order) => {

    const matchesSearch =
      order.numero_orden
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      (order.cliente?.razon_social ||
        order.cliente?.nombre ||
        "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "TODOS" ||
      order.estado === statusFilter;

    return matchesSearch && matchesStatus;

  });

  return (

<div className="space-y-6">

  <PageHeader
    title="Órdenes"
    description="Gestión de órdenes de compra."
    actions={
      <Button onClick={drawer.openCreate}>
        <Plus className="mr-2 h-4 w-4" />
        Nueva Orden
      </Button>
    }
  />

  <div className="rounded-xl border bg-card">

    <div className="p-4 border-b">

      <div className="flex flex-col md:flex-row gap-3">

        <Input
          placeholder="Buscar por número o cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-80"
        />

        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODOS">Todos</SelectItem>
            <SelectItem value="PENDIENTE">Pendiente</SelectItem>
            <SelectItem value="APROBADA">Aprobada</SelectItem>
            <SelectItem value="ANULADA">Anulada</SelectItem>
          </SelectContent>
        </Select>

      </div>

    </div>

    <div className="overflow-x-auto">
      <OrdersTable
        data={filteredOrders}
        loading={isLoading}
      />
    </div>

  </div>

  <OrderDrawer />

</div>

  );

}