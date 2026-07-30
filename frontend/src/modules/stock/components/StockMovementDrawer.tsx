import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useStockMovementDrawer } from "../hooks/useStockMovementDrawer";
import { useStockMovement } from "../hooks/useStock";

import { StockMovementDetails } from "./StockMovementDetails";


export function StockMovementDrawer() {

  const {
    open,
    close,
    movementId,
  } = useStockMovementDrawer();


  const {
    data: movement,
    isLoading,
  } = useStockMovement(
    movementId,
  );


  return (

    <Drawer
      open={open}
      onOpenChange={(value) => {

        if (!value) {
          close();
        }

      }}
      shouldScaleBackground={false}
    >

      <DrawerContent
        className="
          h-[100vh]
          max-h-[100vh]
          w-full
          md:max-w-3xl
        "
      >

        <div className="flex h-full flex-col">


          <DrawerHeader
            className="shrink-0"
          >

            <DrawerTitle>
              Detalle de movimiento
            </DrawerTitle>

          </DrawerHeader>


          <div
            className="
              flex-1
              overflow-y-auto
              px-4
              pb-24
            "
          >

            {isLoading ? (

              <div className="p-4">
                Cargando movimiento...
              </div>

            ) : movement ? (

              <StockMovementDetails
                movement={movement}
              />

            ) : (

              <div className="p-4">
                No se encontró el movimiento.
              </div>

            )}

          </div>


        </div>


      </DrawerContent>


    </Drawer>

  );
}