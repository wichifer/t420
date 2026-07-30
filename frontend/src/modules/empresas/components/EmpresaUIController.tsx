// src/modules/empresas/components/EmpresaUIController.tsx

import { useEmpresaDrawer } from "../state/useEmpresaDrawer";

import { EmpresaDrawer } from "./drawers/EmpresaDrawer";
import { EmpresaModalDelete } from "./modals/EmpresaModalDelete";

export function EmpresaUIController() {
  const { open, mode, selected, close } = useEmpresaDrawer();

  if (!open) return null;

  if (mode === "delete" && selected) {
    return (
      <EmpresaModalDelete
        open={open}
        onClose={close}
        empresa={selected}
      />
    );
  }

  return <EmpresaDrawer />;
}