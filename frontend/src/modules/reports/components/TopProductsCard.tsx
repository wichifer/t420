// src/modules/reports/components/TopProductsCard.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Trophy,
  Medal,
  Award,
  Package,
} from "lucide-react";

import type {
  TopProduct,
} from "../types/reports.types";

interface Props {
  data: TopProduct[];
}

export default function TopProductsCard({
  data,
}: Props) {

  const icon = (index: number) => {

    switch (index) {

      case 0:
        return (
          <Trophy className="h-6 w-6 text-yellow-500" />
        );

      case 1:
        return (
          <Medal className="h-6 w-6 text-gray-400" />
        );

      case 2:
        return (
          <Award className="h-6 w-6 text-orange-500" />
        );

      default:
        return (
          <Package className="h-5 w-5 text-muted-foreground" />
        );

    }

  };

  return (

    <Card className="hover:shadow-md transition-shadow">

      <CardHeader>

        <div className="flex items-center gap-2">

          <Trophy className="h-5 w-5 text-yellow-500" />

          <CardTitle>

            Productos más vendidos

          </CardTitle>

        </div>

        <CardDescription>

          Ranking de artículos vendidos.

        </CardDescription>

      </CardHeader>

      <CardContent>

        <div className="space-y-4">

          {data.map((item, index) => (

            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/40 transition-colors"
            >

              <div className="flex items-center gap-3">

                {icon(index)}

                <div>

                  <p className="font-medium">

                    {item.descripcion_articulo}

                  </p>

                  <p className="text-sm text-muted-foreground">

                    {item.cantidad_vendida} unidades

                  </p>

                </div>

              </div>

              <div className="text-2xl font-bold text-primary">

                #{index + 1}

              </div>

            </div>

          ))}

        </div>

      </CardContent>

    </Card>

  );

}