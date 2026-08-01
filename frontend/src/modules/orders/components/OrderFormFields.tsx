import { useState } from "react";
import {
  Controller,
  useFieldArray,
  useFormContext,
} from "react-hook-form";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TextField } from "@/components/form/TextField";
import { SearchModal } from "@/components/common/SearchModal";
import { useClientes } from "@/modules/clientes/hooks/useClientes";
import { useProducts } from "@/modules/products/hooks/useProducts";

import type { CreateOrderDto } from "../types/order";

import type { Product } from "@/modules/products/types/product";

interface Props {
  readonly?: boolean;
}

export function OrderFormFields({ readonly }: Props) {
  const { control, watch, setValue } =
    useFormContext<CreateOrderDto>();

  const { data: clientes = [] } = useClientes();
  const { data: products = [] } = useProducts();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // Estados de los modales
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);

// Cliente seleccionado
const selectedClientId = watch("id_cliente");

const selectedClient = clientes.find(
  (c) => String(c.id_cliente) === String(selectedClientId)
);

const clientLabel = selectedClient
  ? selectedClient.razon_social?.trim() ||
    `${selectedClient.nombre ?? ""} ${selectedClient.apellido ?? ""}`.trim()
  : "Buscar cliente";


// Agregar producto
const handleAddProduct = (product: Product) => {
  const existingIndex = fields.findIndex(
    (item) =>
      item.id_articulo === String(product.id_articulo)
  );

  if (existingIndex >= 0) {
    const currentQty =
      watch(`items.${existingIndex}.cantidad`) || 0;

    setValue(
      `items.${existingIndex}.cantidad`,
      currentQty + 1
    );
  } else {
    append({
      id_articulo: String(product.id_articulo),
      descripcion_articulo: product.descripcion,
      cantidad: 1,
      precio_unitario: Number(product.precio_final),
    });
  }
};

 



  return (
    <>
      <div className="space-y-6">
        {/* Cliente */}
        <div>
          <Label className="mb-2 block">Cliente</Label>

          <Button
            type="button"
            variant="outline"
            className="w-full justify-start text-left font-normal"
            onClick={() => setClientModalOpen(true)}
            disabled={readonly}
          >
            <Search className="mr-2 h-4 w-4" />
            <span className="truncate">{clientLabel}</span>
          </Button>
        </div>

        {/* Productos */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Productos</h3>

            {!readonly && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setProductModalOpen(true)}
              >
                <Search className="mr-2 h-4 w-4" />
                Agregar producto
              </Button>
            )}
          </div>

          {/* Tabla de items */}
          <div className="space-y-4">
            {fields.map((item, index) => {
              const cantidad =
                watch(`items.${index}.cantidad`) || 0;

              const precio =
                watch(`items.${index}.precio_unitario`) || 0;

              const subtotal = cantidad * precio;

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end p-3 border rounded-lg"
                >
                  {/* Descripción */}
                  <div className="md:col-span-4">
                    <TextField
                      label="Producto"
                      value={item.descripcion_articulo}
                      disabled
                    />
                  </div>

                  {/* Cantidad */}
                  <div className="md:col-span-2">
                    <Controller
                      control={control}
                      name={`items.${index}.cantidad`}
                      render={({ field }) => (
                        <TextField
                          label="Cantidad"
                          type="number"
                          value={field.value ?? ""}
                          disabled={readonly}
                          onChange={(e) =>
                            field.onChange(
                              Math.max(1, Number(e.target.value))
                            )
                          }
                        />
                      )}
                    />
                  </div>

                  {/* Precio */}
                  <div className="md:col-span-2">
                    <Controller
                      control={control}
                      name={`items.${index}.precio_unitario`}
                      render={({ field }) => (
                        <TextField
                          label="Precio"
                          type="number"
                          value={field.value ?? ""}
                          disabled
                        />
                      )}
                    />
                  </div>

                  {/* Subtotal */}
                  <div className="md:col-span-2">
                    <TextField
                      label="Subtotal"
                      value={`$${subtotal.toFixed(2)}`}
                      disabled
                    />
                  </div>

                  {/* Quitar */}
                  <div className="md:col-span-2">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                      disabled={readonly}
                      className="w-full"
                    >
                      Quitar
                    </Button>
                  </div>
                </div>
              );
            })}

            {fields.length === 0 && (
              <div className="text-center py-8 text-muted-foreground border rounded-lg">
                No hay productos agregados.
              </div>
            )}
          </div>

          {/* Total */}
          {/* <div className="flex justify-end pt-4 border-t mt-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                Total de la orden
              </p>
              <p className="text-2xl font-bold">
                ${total.toFixed(2)}
              </p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Modal de clientes */}
<SearchModal
  open={clientModalOpen}
  onOpenChange={setClientModalOpen}
  title="Cliente"
  items={clientes.map((cliente) => {
    const nombreCompleto =
      `${cliente.nombre ?? ""} ${cliente.apellido ?? ""}`.trim();

    return {
      id: String(cliente.id_cliente),
      label:
        cliente.razon_social && nombreCompleto
          ? `${cliente.razon_social} — ${nombreCompleto}`
          : cliente.razon_social || nombreCompleto,
    };
  })}
  onSelect={(item) => {
    setValue("id_cliente", item.id);
  }}
/>

      {/* Modal de productos */}
      <SearchModal
        open={productModalOpen}
        onOpenChange={setProductModalOpen}
        title="Producto"
        items={products.map((product) => ({
          id: String(product.id_articulo),
          label: product.descripcion,
        }))}
        onSelect={(item) => {
          const product = products.find(
            (p) => String(p.id_articulo) === item.id
          );

          if (product) {
            handleAddProduct(product);
          }
        }}
      />
    </>
  );
}