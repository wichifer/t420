// src/modules/stock/components/CriticalStockCard.tsx

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type {
  LowStockProduct,
} from "../types/stock.types";

interface Props {
  products: LowStockProduct[];
}

export default function CriticalStockCard({
  products,
}: Props) {

  return (

    <Card>

      <CardHeader>

        <CardTitle>
          Stock Bajo
        </CardTitle>

      </CardHeader>

      <CardContent>

        <div className="space-y-3">

          {products.length === 0 && (

            <p className="text-muted-foreground text-sm">

              No hay productos con stock crítico.

            </p>

          )}

          {products.map(
            (product) => (

              <div
                key={
                  product.id_articulo
                }
                className="flex items-center justify-between border-b pb-2"
              >

                <div>

                  <p className="font-medium">

                    {product.descripcion}

                  </p>

                  <p className="text-muted-foreground text-sm">

                    {product.codigo}

                  </p>

                </div>

                <div className="text-right">

                  <p className="font-semibold">

                    {product.stock_actual}
                    {" / "}
                    {product.stock_minimo}

                  </p>

                </div>

              </div>

            ),
          )}

        </div>

      </CardContent>

    </Card>

  );

}