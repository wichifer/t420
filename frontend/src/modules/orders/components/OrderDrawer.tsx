import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          close();
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="
          fixed
          inset-0
          top-0
          left-0
          translate-x-0
          translate-y-0
          w-full
          h-[100dvh]
          max-w-none
          rounded-none
          p-0
          gap-0
          flex
          flex-col
          overflow-hidden
        "
      >
        {/* HEADER FIJO */}
        <DialogHeader
          className="
            shrink-0
            border-b
            bg-background
            px-4
            py-3
          "
        >
          <DialogTitle>
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* CONTENIDO SCROLLEABLE */}
        <div
          className="
            flex-1
            min-h-0
            overflow-y-auto
            overscroll-contain
            bg-background
            px-4
            pb-6
          "
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
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
      </DialogContent>
    </Dialog>
  );
}
