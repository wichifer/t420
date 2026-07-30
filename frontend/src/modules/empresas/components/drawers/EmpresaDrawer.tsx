// src/modules/empresas/components/drawers/EmpresaDrawer.tsx

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { EmpresaForm } from "../EmpresaForm";

import {
  useEmpresaDrawer,
} from "../../state/useEmpresaDrawer";

export function EmpresaDrawer() {
  const {
    open,
    mode,
    selected,
    close,
  } = useEmpresaDrawer();

  const isReadOnly = mode === "view";

  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          close();
        }
      }}
    >
      <DrawerContent
        className="
          max-h-[90vh]
          p-6
        "
      >
        <DrawerHeader>
          <DrawerTitle>
            {mode === "create" && "Nueva Empresa"}

            {mode === "edit" && "Editar Empresa"}

            {mode === "view" && "Detalle de Empresa"}
          </DrawerTitle>
        </DrawerHeader>

        <div
          className="
            overflow-y-auto
            px-1
            pb-8
          "
        >
          <EmpresaForm
            id={selected?.id_empresa}
            readonly={isReadOnly}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}