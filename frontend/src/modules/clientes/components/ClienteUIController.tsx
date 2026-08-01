// src/modules/clientes/components/ClienteUIController.tsx

import { useClienteDrawer } from "../state/useClienteDrawer";

import { ClienteDrawer } from "./drawers/ClienteDrawer";


export function ClienteUIController() {

  const {
    open,
 
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