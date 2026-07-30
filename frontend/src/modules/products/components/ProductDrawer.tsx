// C:\dev\ordenes-saas-frontend\src\modules\products\components\ProductDrawer.tsx

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { ProductForm } from "./ProductForm";
import { useProductDrawer } from "../state/useProductDrawer";

export function ProductDrawer() {
  console.log("PRODUCT DRAWER RENDER");
  const {
    open,
    close,
    mode,
    product,
  } = useProductDrawer();

  console.log("DRAWER STATE:", {
    open,
    mode,
    product,
  });

  return (
    <Drawer open={open} onOpenChange={close}>
      <DrawerContent className="max-w-2xl mx-auto max-h-[90vh]">

        <DrawerHeader>
          <DrawerTitle>
            {mode === "create"
              ? "Nuevo Producto"
              : "Editar Producto"}
          </DrawerTitle>
        </DrawerHeader>

        <div className="overflow-y-auto px-4 pb-8">
          <ProductForm
            product={product}
            onSuccess={close}
          />
        </div>

      </DrawerContent>
    </Drawer>
  );
}