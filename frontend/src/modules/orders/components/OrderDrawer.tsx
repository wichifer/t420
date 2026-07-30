import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useOrderDrawer } from "../hooks/useOrderDrawer";
import { useOrder } from "../queries/orders.queries";

import { OrderForm } from "./OrderForm";
import { OrderDetails } from "./OrderDetails";

export function OrderDrawer() {
  const { open, close, mode, orderId } =
    useOrderDrawer();

  const {
    data: order,
    isLoading,
  } = useOrder(orderId ?? 0);

  const title =
    {
      create: "Nueva Orden",
      edit: "Editar Orden",
      view: "Ver Orden",
    }[mode] ?? "Orden";

  return (
<Drawer
  open={open}
  onOpenChange={(value) => {
    if (!value) close();
  }}
  shouldScaleBackground={false}
>
  <DrawerContent
    className="h-[100vh] max-h-[100vh] w-full md:max-w-4xl"
  >
        <div className="flex h-full flex-col">
          <DrawerHeader className="shrink-0">
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>

          {/* Contenido que hace scroll */}
        <div className="flex-1 overflow-y-auto px-4 pb-24">
            {mode === "view" ? (
              isLoading ? (
                <div className="p-4">
                  Cargando orden...
                </div>
              ) : (
                <OrderDetails order={order} />
              )
            ) : (
              <OrderForm
                mode={mode}
                order={order ?? null}
                onClose={close}
              />
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}