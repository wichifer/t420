import { useEffect } from "react";

import {
  useForm,
  FormProvider,
  useWatch,
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
  } = methods;


  const items = useWatch({
    control: methods.control,
    name: "items",
  });


  const subtotal =
    (items || []).reduce(
      (acc, item) =>
        acc +
        Number(item.cantidad || 0) *
        Number(item.precio_unitario || 0),
      0
    );


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

      console.log(
        "ORDER SUBMIT =>",
        values
      );


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


        console.log(
          "NUEVA ORDEN =>",
          nuevaOrden
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


  const handleContinue =
    () => {

      console.log(
        "CONTINUAR A PAGO CLICK"
      );

      handleSubmit(
        onSubmit,
        (errors) => {

          console.log(
            "ERRORES ORDER",
            errors
          );

        }
      )();

    };


  return (

    <FormProvider
      {...methods}
    >

      <form
        className="min-h-full flex flex-col"
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


        {/* RESUMEN */}

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


        {/* FOOTER */}

        <div className="sticky bottom-0 z-20 -mx-4 mt-6 border-t bg-background p-4 flex gap-3">

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
              type="button"
              disabled={
                createOrder.isPending ||
                updateOrder.isPending ||
                (items?.length ?? 0) === 0
              }
              onClick={
                handleContinue
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
