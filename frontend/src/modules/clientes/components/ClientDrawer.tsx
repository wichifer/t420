import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useClienteDrawer } from "../state/useClienteDrawer";
import { ClienteForm } from "./ClienteForm";

export function ClienteDrawer() {

  const {
    open,
    close,
    mode,
    selected,
  } = useClienteDrawer();


  return (
    <Drawer
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          close();
        }
      }}
    >

      <DrawerContent>

        <DrawerHeader>

          <DrawerTitle>
            <div className="p-6">

            {(mode === "create" ||
                mode === "edit" ||
                mode === "view") && (

                <ClienteForm
                mode={mode}
                cliente={selected}
                onClose={close}
                />

            )}

            </div>
          </DrawerTitle>

        </DrawerHeader>


        <div className="p-6">

          {mode === "create" && (
            <p>
              Formulario nuevo cliente pendiente
            </p>
          )}


          {mode === "edit" && (
            <p>
              Editando:
              {" "}
              {selected?.nombre}
            </p>
          )}


          {mode === "view" && (
            <p>
              Visualizando:
              {" "}
              {selected?.nombre}
            </p>
          )}

        </div>


      </DrawerContent>

    </Drawer>
  );
}