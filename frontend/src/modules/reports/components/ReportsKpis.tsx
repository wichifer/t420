// src/modules/reports/components/ReportsKpis.tsx

import {
  ShoppingCart,
  DollarSign,
  Users,
  AlertTriangle,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import type { SalesReport } from "../types/reports.types";

interface Props {
  sales: SalesReport;
  debtors: number;
}

const money = (value: number) =>
  `$ ${Number(value).toLocaleString("es-AR")}`;

export default function ReportsKpis({
  sales,
  debtors,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Órdenes
              </p>

              <p className="mt-2 text-4xl font-bold">
                {sales.cantidad_ordenes}
              </p>

            </div>

            <ShoppingCart className="h-10 w-10 text-blue-600" />

          </div>

        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Ventas
              </p>

              <p className="mt-2 text-3xl font-extrabold text-green-600">
                {money(sales.ventas)}
              </p>

            </div>

            <DollarSign className="h-10 w-10 text-green-600" />

          </div>

        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Clientes
              </p>

              <p className="mt-2 text-4xl font-bold">
                {sales.clientes}
              </p>

            </div>

            <Users className="h-10 w-10 text-violet-600" />

          </div>

        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Deudores
              </p>

              <p className="mt-2 text-4xl font-bold text-red-500">
                {debtors}
              </p>

            </div>

            <AlertTriangle className="h-10 w-10 text-red-500" />

          </div>

        </CardContent>
      </Card>

    </div>
  );
}