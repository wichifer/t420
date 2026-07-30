// src/modules/clientes/components/ClienteUIController.tsx

import { useClienteDrawer } from "../state/useClienteDrawer";

import { ClienteDrawer } from "./drawers/ClienteDrawer";
// import { ClienteModalDelete } from "./modals/ClienteModalDelete";

export function ClienteUIController() {

  const {
    open,
    mode,
    selected,
    close,
  } = useClienteDrawer();

  if (!open)
    return null;

  // Cuando implementemos la baja lógica
  /*
  if (mode === "delete" && selected) {
    return (
      <ClienteModalDelete
        open={open}
        onClose={close}
        cliente={selected}
      />
    );
  }
  */

  return <ClienteDrawer />;

}