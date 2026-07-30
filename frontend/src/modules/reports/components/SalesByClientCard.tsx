// src/modules/reports/components/SalesByClientCard.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TrendingUp } from "lucide-react";

import type {
  SalesByClient,
} from "../types/reports.types";

interface Props {
  data: SalesByClient[];
}

const money = (value: number) =>
  `$ ${Number(value).toLocaleString("es-AR")}`;

export default function SalesByClientCard({
  data,
}: Props) {

  const max =
    data.length > 0
      ? Math.max(...data.map((c) => Number(c.ventas)))
      : 1;

  return (

    <Card className="hover:shadow-md transition-shadow">

      <CardHeader>

        <div className="flex items-center gap-2">

          <TrendingUp className="h-5 w-5 text-green-600" />

          <CardTitle>

            Ventas por Cliente

          </CardTitle>

        </div>

        <CardDescription>

          Ranking de clientes según ventas.

        </CardDescription>

      </CardHeader>

      <CardContent>

        <div className="space-y-5">

          {data.map((cliente) => {

            const porcentaje =
              (Number(cliente.ventas) / max) * 100;

            return (

              <div key={cliente.id_cliente}>

                <div className="mb-1 flex items-center justify-between">

                  <span className="font-medium">

                    {cliente.cliente}

                  </span>

                  <span className="font-semibold text-green-600">

                    {money(cliente.ventas)}

                  </span>

                </div>

                <div className="h-2 rounded-full bg-muted">

                  <div
                    className="h-2 rounded-full bg-green-600 transition-all"
                    style={{
                      width: `${porcentaje}%`,
                    }}
                  />

                </div>

              </div>

            );

          })}

        </div>

      </CardContent>

    </Card>

  );

}