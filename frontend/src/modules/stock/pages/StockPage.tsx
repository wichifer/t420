// src/modules/stock/pages/StockPage.tsx

import { useState } from "react";

import PageHeader from "@/components/common/PageHeader";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import StockMovementForm from "../components/StockMovementForm";
import StockMovementsTable from "../components/StockMovementsTable";
import CriticalStockCard from "../components/CriticalStockCard";
import StockFilters from "../components/StockFilters";
import { StockMovementDrawer } from "../components/StockMovementDrawer";

import {
  useLowStock,
  useStockMovements,
} from "../hooks/useStock";

import { useStockMovementDrawer } from "../hooks/useStockMovementDrawer";


export default function StockPage() {

  const [search, setSearch] =
    useState("");

  const [tipoFiltro, setTipoFiltro] =
    useState("TODOS");


  const {
    data: movements = [],
  } = useStockMovements();


  const {
    data: lowStock = [],
  } = useLowStock();


  const {
    openView,
  } = useStockMovementDrawer();



  const filteredMovements =
    movements.filter((movement) => {

      const text =
        `
        ${movement.articulos?.codigo ?? ""}
        ${movement.articulos?.descripcion ?? ""}
        ${movement.referencia ?? ""}
        `
        .toLowerCase();


      const matchesSearch =
        text.includes(
          search.trim().toLowerCase(),
        );


      const matchesTipo =
        tipoFiltro === "TODOS" ||
        movement.tipo_movimiento === tipoFiltro;


      return (
        matchesSearch &&
        matchesTipo
      );

    });



  const totalEntradas =
    movements.filter(
      (movement) =>
        movement.tipo_movimiento === "ENTRADA",
    ).length;



  const totalSalidas =
    movements.filter(
      (movement) =>
        movement.tipo_movimiento === "SALIDA",
    ).length;



  const totalMovimientos =
    movements.length;



  const productosCriticos =
    lowStock.length;



  return (

    <div className="space-y-6">


      <PageHeader
        title="Stock"
        description="Control de inventario y movimientos."
      />



      {/* KPIs */}
      <div className="
        grid
        gap-4
        md:grid-cols-2
        xl:grid-cols-4
      ">


        <Card>

          <CardHeader>
            <CardTitle className="text-sm">
              Entradas
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {totalEntradas}
            </p>
          </CardContent>

        </Card>



        <Card>

          <CardHeader>
            <CardTitle className="text-sm">
              Salidas
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {totalSalidas}
            </p>
          </CardContent>

        </Card>



        <Card>

          <CardHeader>
            <CardTitle className="text-sm">
              Movimientos
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {totalMovimientos}
            </p>
          </CardContent>

        </Card>



        <Card>

          <CardHeader>
            <CardTitle className="text-sm">
              Stock crítico
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold">
              {productosCriticos}
            </p>
          </CardContent>

        </Card>


      </div>




      {/* Registro + Alertas */}
      <div className="
        grid
        gap-6
        lg:grid-cols-3
      ">


        <div>

          <StockMovementForm />

        </div>



        <div className="lg:col-span-2">

          <CriticalStockCard
            products={lowStock}
          />

        </div>


      </div>




      {/* Filtros */}
      <StockFilters

        search={search}

        onSearchChange={setSearch}

        tipo={tipoFiltro}

        onTipoChange={setTipoFiltro}

      />





      {/* Historial */}
      <Card>


        <CardHeader>

          <CardTitle>
            Historial de movimientos
          </CardTitle>

        </CardHeader>



        <CardContent>


          <StockMovementsTable

            movements={filteredMovements}


            onView={(movement) =>
              openView(
                movement.id_movimiento_stock,
              )
            }

          />


        </CardContent>


      </Card>




      {/* Drawer detalle */}

      <StockMovementDrawer />


    </div>

  );
}