// src/modules/clientes/components/drawers/ClienteDrawer.tsx

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { ClienteForm } from "../ClienteForm";
import { ClienteDetails } from "../ClienteDetails";

import { useClienteDrawer } from "../../state/useClienteDrawer";


export function ClienteDrawer() {

  const {
    open,
    close,
    mode,
    selected,
  } = useClienteDrawer();


const title =
  {
    create: "Nuevo Cliente",
    edit: "Editar Cliente",
    view: "Cuenta corriente",
    delete: "Eliminar Cliente",
  }[mode] ?? "Cliente";


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
          max-w-3xl
          w-full
          max-h-[90vh]
        "
      >

        <DrawerHeader>

          <DrawerTitle>
            {title}
          </DrawerTitle>

        </DrawerHeader>


        <div
          className="
            overflow-y-auto
            max-h-[75vh]
            px-4
            pb-4
          "
        >


          {(mode === "create" ||
            mode === "edit") && (

            <ClienteForm

              mode={mode}

              cliente={selected}

              onClose={close}

            />

          )}



          {mode === "view" && selected && (

            <ClienteDetails

              cliente={selected}

            />

          )}



        </div>


      </DrawerContent>


    </Drawer>

  );

}