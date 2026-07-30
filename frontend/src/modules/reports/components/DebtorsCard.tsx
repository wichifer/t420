// src/modules/reports/components/DebtorsCard.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  AlertTriangle,
  Wallet,
} from "lucide-react";

import type {
  Debtor,
} from "../types/reports.types";

interface Props {
  data: Debtor[];
}

const money = (value: number) =>
  `$ ${Number(value).toLocaleString("es-AR")}`;

export default function DebtorsCard({
  data,
}: Props) {

  return (

    <Card className="hover:shadow-md transition-shadow">

      <CardHeader>

        <div className="flex items-center gap-2">

          <AlertTriangle className="h-5 w-5 text-red-500"/>

          <CardTitle>

            Clientes con deuda

          </CardTitle>

        </div>

        <CardDescription>

          Saldos pendientes de cobro.

        </CardDescription>

      </CardHeader>

      <CardContent>

        <div className="space-y-4">

          {data.map((cliente) => (

            <div
              key={cliente.id_cliente}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/40 transition-colors"
            >

              <div className="flex items-center gap-3">

                <Wallet className="h-8 w-8 text-red-500"/>

                <div>

                  <p className="font-medium">

                    {cliente.cliente}

                  </p>

                  <p className="text-sm text-muted-foreground">

                    Saldo pendiente

                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="text-lg font-bold text-red-600">

                  {money(cliente.saldo)}

                </p>

                <Badge
                  variant="destructive"
                  className="mt-1"
                >
                  Pendiente
                </Badge>

              </div>

            </div>

          ))}

        </div>

      </CardContent>

    </Card>

  );

}