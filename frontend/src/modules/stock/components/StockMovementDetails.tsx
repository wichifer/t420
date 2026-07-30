import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { StatusBadge } from "@/components/common/StatusBadge";

import type { StockMovement } from "../types/stock.types";


interface Props {
  movement: StockMovement;
}


export function StockMovementDetails({
  movement,
}: Props) {

  return (

    <div className="space-y-4">


      <Card>

        <CardHeader>

          <CardTitle>
            Movimiento
          </CardTitle>

        </CardHeader>


        <CardContent
          className="space-y-3"
        >

          <div>
            <span className="text-sm text-muted-foreground">
              Fecha
            </span>

            <p>
              {new Date(
                movement.fecha,
              ).toLocaleString("es-AR")}
            </p>
          </div>


          <div>

            <span className="text-sm text-muted-foreground">
              Tipo
            </span>

            <div className="mt-1">

              <StatusBadge
                variant={
                  movement.tipo_movimiento === "ENTRADA"
                    ? "success"
                    : "destructive"
                }
              >

                {movement.tipo_movimiento}

              </StatusBadge>

            </div>

          </div>


          <div>

            <span className="text-sm text-muted-foreground">
              Cantidad
            </span>

            <p className="text-2xl font-bold">
              {movement.cantidad}
            </p>

          </div>


          <div>

            <span className="text-sm text-muted-foreground">
              Referencia
            </span>

            <p>
              {movement.referencia || "-"}
            </p>

          </div>


        </CardContent>

      </Card>


<Card>

  <CardHeader>
    <CardTitle>
      Producto
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-3">

    <div>
      <p className="font-semibold">
        {movement.articulos?.descripcion}
      </p>

      <p className="text-sm text-muted-foreground">
        Código:
        {" "}
        {movement.articulos?.codigo}
      </p>
    </div>

    <div className="grid grid-cols-2 gap-4">

      <div>

        <p className="text-sm text-muted-foreground">
          Stock actual
        </p>

        <p className="text-2xl font-bold">
          {movement.articulos?.stock_actual}
        </p>

      </div>

      <div>

        <p className="text-sm text-muted-foreground">
          Stock mínimo
        </p>

        <p className="text-2xl font-bold">
          {movement.articulos?.stock_minimo}
        </p>

      </div>

    </div>

  </CardContent>

</Card>


    </div>

  );
}