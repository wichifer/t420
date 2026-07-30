// src/modules/reports/pages/ReportsPage.tsx

import PageHeader from "@/components/common/PageHeader";

import { Skeleton } from "@/components/ui/skeleton";

import { useReports } from "../hooks/useReports";

import ReportsKpis from "../components/ReportsKpis";
import SalesByClientCard from "../components/SalesByClientCard";
import TopProductsCard from "../components/TopProductsCard";
import DebtorsCard from "../components/DebtorsCard";

export default function ReportsPage() {

  const {

    data,

    isLoading,

    isError,

  } = useReports();

  if (isLoading) {

    return (

      <div className="space-y-6">

        <Skeleton className="h-10 w-72"/>

        <Skeleton className="h-36"/>

        <Skeleton className="h-80"/>

      </div>

    );

  }

  if (isError || !data) {

    return (

      <div className="text-center py-10">

        No fue posible cargar los reportes.

      </div>

    );

  }

  return (

    <div className="space-y-6">

      <PageHeader
        title="Reportes"
        description="Análisis general de ventas, clientes y productos."
      />

      <ReportsKpis
        sales={data.sales}
        debtors={data.debtors.length}
      />

      <SalesByClientCard
        data={data.salesByClient}
      />

      <div className="grid gap-6 lg:grid-cols-2">

        <TopProductsCard
          data={data.topProducts}
        />

        <DebtorsCard
          data={data.debtors}
        />

      </div>

    </div>

  );

}