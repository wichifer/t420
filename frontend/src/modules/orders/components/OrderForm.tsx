// C:\dev\ordenes-saas-frontend\src\modules\orders\components\OrderForm.tsx

import { useEffect, useMemo } from "react";

import {
  useForm,
  FormProvider,
} from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import type {
  Order,
  CreateOrderDto,
} from "../types/order";

import {
  useCreateOrder,
  useUpdateOrder,
} from "../queries/orders.queries";

import {
  OrderFormFields,
} from "./OrderFormFields";

// import { useClientes } from "@/modules/clientes/hooks/useClientes";


interface Props {
  mode:
    | "create"
    | "edit"
    | "view";

  order?: Order | null;

  onClose?: () => void;
}


export function OrderForm({
  mode,
  order,
  onClose,
}: Props) {


  const navigate = useNavigate();


  const isCreate =
    mode === "create";

  const isEdit =
    mode === "edit";

  const readonly =
    mode === "view";


  const createOrder =
    useCreateOrder();

  const updateOrder =
    useUpdateOrder();



  const defaultValues: CreateOrderDto = {
    id_cliente: "",
    observaciones: "",
    items: [],
  };


  const methods =
    useForm<CreateOrderDto>({
      defaultValues,
    });


  const {
    reset,
    handleSubmit,
    watch,
  } = methods;



  const items =
    watch("items");


      //const { data: clientes = [] } =  useClientes();



  // const selectedClient =
  //   clientes.find(
  //     (c) =>
  //       String(c.id_cliente) ===
  //       String(watch("id_cliente"))
  //   );


  // const esConsumidorFinal =
  //   selectedClient?.es_consumidor_final === true;



  const subtotal =
    useMemo(() => {

      return (items || []).reduce(
        (acc, item) => {

          return (
            acc +
            Number(item.cantidad || 0) *
            Number(item.precio_unitario || 0)
          );

        },
        0
      );

    }, [items]);



  const total =
    subtotal;



  useEffect(() => {

    if (
      order &&
      (isEdit || readonly)
    ) {

      reset({

        id_cliente:
          String(order.id_cliente),

        observaciones:
          order.observaciones ?? "",

        items:
          order.items?.map(
            item => ({

              id_articulo:
                String(item.id_articulo),

              descripcion_articulo:
                item.descripcion_articulo,

              cantidad:
                item.cantidad,

              precio_unitario:
                item.precio_unitario,

            })
          ) ?? [],

      });

    }

  }, [
    order,
    isEdit,
    readonly,
    reset,
  ]);



  useEffect(() => {

    if (isCreate) {

      reset(
        defaultValues
      );

    }

  }, [
    isCreate,
    reset,
  ]);




  const onSubmit =
    async (
      values: CreateOrderDto
    ) => {


    if (readonly)
      return;



    if (
      !values.id_cliente ||
      Number(values.id_cliente) <= 0
    ) {

      alert(
        "Debe seleccionar un cliente"
      );

      return;

    }



    if (
      !values.items ||
      values.items.length === 0
    ) {

      alert(
        "Debe agregar al menos un producto"
      );

      return;

    }



    const itemInvalido =
      values.items.find(
        (item) =>
          Number(item.id_articulo) <= 0 ||
          Number(item.cantidad) <= 0
      );


    if (itemInvalido) {

      alert(
        "Todos los productos deben tener una cantidad válida"
      );

      return;

    }



    const payload: CreateOrderDto = {

      id_cliente:
        String(values.id_cliente),

      observaciones:
        values.observaciones,


      // Todas las ventas pasan por aprobación.
      // Consumidor final será pagada automáticamente
      // en backend.
      aprobar_automaticamente:
        true,


      items:
        values.items.map(
          (item) => ({

            id_articulo:
              String(item.id_articulo),

            descripcion_articulo:
              item.descripcion_articulo,

            cantidad:
              Number(item.cantidad),

            precio_unitario:
              Number(item.precio_unitario),

          })
        ),

    };



    console.log(
      "PAYLOAD FINAL",
      payload
    );



    if (
      isEdit &&
      order
    ) {


      await updateOrder.mutateAsync({

        id:
          order.id_orden_compra,

        data:
          payload,

      });


      onClose?.();


    } else {



      const nuevaOrden =
        await createOrder.mutateAsync(
          payload
        );



      if (
        nuevaOrden?.id_orden_compra
      ) {

        navigate(
          `/payments?order=${nuevaOrden.id_orden_compra}`
        );

      }


      onClose?.();

    }

  };




  return (

    <FormProvider
      {...methods}
    >

      <form
        onSubmit={
          handleSubmit(
            onSubmit,
            (errors) => {
              console.log(
                "ERRORES ORDER",
                errors
              );
            }
          )
        }
      >


        <OrderFormFields
          readonly={
            readonly
          }
        />



        <div className="mt-6 rounded-lg border p-4 space-y-2">


          <div className="flex justify-between">

            <span>
              Subtotal
            </span>

            <span>
              ${subtotal.toFixed(2)}
            </span>

          </div>



          <div className="flex justify-between text-lg font-bold">

            <span>
              Total
            </span>

            <span>
              ${total.toFixed(2)}
            </span>

          </div>


        </div>




        <div className="sticky bottom-0 left-0 right-0 bg-background border-t p-4 flex gap-3 mt-6">


          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >

            Cancelar

          </Button>




          {!readonly && (

            <Button

              type="submit"

              disabled={
                createOrder.isPending ||
                updateOrder.isPending ||
                items.length === 0
              }

              className="flex-1"

            >

              {
                isEdit
                  ? "Actualizar orden"
                  : "Continuar a pago"
              }

            </Button>

          )}


        </div>


      </form>


    </FormProvider>

  );

}