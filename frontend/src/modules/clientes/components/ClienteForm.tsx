// src/modules/clientes/components/ClienteForm.tsx

import { useEffect } from "react";

import {
  useForm,
  FormProvider,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  Form,
} from "@/components/form";

import {
  clienteSchema,
  type ClienteFormValues,
} from "../schemas";

import type {
  Cliente,
} from "../types/cliente";

import type {
  DrawerMode,
} from "../state/useClienteDrawer";

import {
  useCreateCliente,
} from "../hooks/useCreateCliente";

import {
  useUpdateCliente,
} from "../hooks/useUpdateCliente";

import {
  ClienteFormFields,
} from "./ClienteFormFields";


interface Props {

  mode: DrawerMode;

  cliente?: Cliente | null;

  onClose?: () => void;

}


export function ClienteForm({

  mode,

  cliente,

  onClose,

}: Props) {


  const isCreate =
    mode === "create";


  const isEdit =
    mode === "edit";


  const isView =
    mode === "view";


  const readonly =
    isView;



  const createCliente =
    useCreateCliente();


  const updateCliente =
    useUpdateCliente();



  const defaultValues: ClienteFormValues = {

    nombre: "",

    apellido: "",

    razon_social: "",

    documento: "",

    cuit: "",

    telefono: "",

    email: "",

    direccion: "",

    es_consumidor_final: false,

  };



  const methods =
    useForm<ClienteFormValues>({

      resolver:
        zodResolver(clienteSchema),

      defaultValues,

    });



  const {
    reset,
    handleSubmit,
  } = methods;



  useEffect(() => {

    if (cliente && (isEdit || isView)) {

      reset({

        nombre:
          cliente.nombre ?? "",

        apellido:
          cliente.apellido ?? "",

        razon_social:
          cliente.razon_social ?? "",

        documento:
          cliente.documento ?? "",

        cuit:
          cliente.cuit ?? "",

        telefono:
          cliente.telefono ?? "",

        email:
          cliente.email ?? "",

        direccion:
          cliente.direccion ?? "",

        es_consumidor_final:
          cliente.es_consumidor_final,

      });

    }

  }, [
    cliente,
    isEdit,
    isView,
    reset,
  ]);




  useEffect(() => {

    if (isCreate) {

      reset(defaultValues);

    }

  }, [
    isCreate,
    reset,
  ]);





  const onSubmit =
    async (
      values: ClienteFormValues,
    ) => {


      if (readonly)
        return;



      if (isEdit && cliente) {


        await updateCliente.mutateAsync({

          id:
            cliente.id_cliente,

          data:
            values,

        });


      } else {


        await createCliente.mutateAsync(
          values,
        );


      }


      onClose?.();

    };





  return (

    <FormProvider {...methods}>


      <Form

        onSubmit={
          handleSubmit(
            onSubmit,
            (errors) => {

              console.log(
                "ERRORES CLIENTE",
                errors,
              );

            },
          )
        }

      >


        <ClienteFormFields

          readonly={readonly}

        />




        <div
          className="
            flex
            justify-end
            pt-6
          "
        >


          {readonly ? (

            <button

              type="button"

              onClick={() => {

                console.log(
                  "CERRANDO DESDE FORM"
                );

                onClose?.();

              }}

              className="
                rounded-md
                border
                px-4
                py-2
              "

            >

              Cerrar

            </button>


          ) : (


            <button

              type="submit"

              disabled={
                createCliente.isPending ||
                updateCliente.isPending
              }

              className="
                rounded-md
                bg-primary
                px-4
                py-2
                text-primary-foreground
              "

            >

              {
                isEdit
                  ? "Actualizar Cliente"
                  : "Crear Cliente"
              }


            </button>


          )}


        </div>


      </Form>


    </FormProvider>

  );

}