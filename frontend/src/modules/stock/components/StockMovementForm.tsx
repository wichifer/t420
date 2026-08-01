// src/modules/stock/components/StockMovementForm.tsx

import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import { SearchModal } from "@/components/common/SearchModal";

import {
  useCreateMovement,
  useProducts,
} from "../hooks/useStock";

export default function StockMovementForm() {
  const { data: products = [] } = useProducts();

  const createMovement = useCreateMovement();

  const [productModalOpen, setProductModalOpen] =
    useState(false);

  const [idArticulo, setIdArticulo] =
    useState("");

  const [selectedProductLabel, setSelectedProductLabel] =
    useState("");

  const [tipo, setTipo] = useState<
    "ENTRADA" | "SALIDA"
  >("ENTRADA");

  const [cantidad, setCantidad] =
    useState("");

  const [referencia, setReferencia] =
    useState("");

const productItems = useMemo(
  () =>
    products.map((product) => ({
      id: String(product.id_articulo),
      label: `${product.codigo} - ${product.descripcion}`,
    })),
  [products],
);

  async function handleSubmit() {
    if (!idArticulo) return;

    if (Number(cantidad) <= 0) return;

    await createMovement.mutateAsync({
      id_articulo: idArticulo,
      tipo_movimiento: tipo,
      cantidad: Number(cantidad),
      referencia,
    });

    setIdArticulo("");
    setSelectedProductLabel("");
    setCantidad("");
    setReferencia("");
    setTipo("ENTRADA");
  }

  return (
    <>
      <Card className="overflow-visible">
        <CardHeader>
          <CardTitle>
            Registrar Movimiento
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Producto</Label>

            <Button
              type="button"
              variant="outline"
              className="w-full justify-start font-normal"
              onClick={() =>
                setProductModalOpen(true)
              }
            >
              {selectedProductLabel ||
                "Seleccionar producto"}
            </Button>
          </div>
<div>
  <Label>Tipo</Label>

  <select
    value={tipo}
    onChange={(e) =>
      setTipo(
        e.target.value as "ENTRADA" | "SALIDA"
      )
    }
    className="
      w-full
      h-10
      rounded-md
      border
      bg-background
      px-3
    "
  >
    <option value="ENTRADA">
      🟢 Entrada
    </option>

    <option value="SALIDA">
      🔴 Salida
    </option>
  </select>
</div>

          <div>
            <Label>Cantidad</Label>

            <Input
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) =>
                setCantidad(
                  e.target.value,
                )
              }
              placeholder="Ingrese la cantidad"
            />
          </div>

          <div>
            <Label>Referencia</Label>

            <Input
              value={referencia}
              onChange={(e) =>
                setReferencia(
                  e.target.value,
                )
              }
              placeholder="Ej. Compra proveedor, Ajuste de inventario..."
            />
          </div>

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={createMovement.isPending}
          >
            {createMovement.isPending
              ? "Guardando..."
              : "Guardar Movimiento"}
          </Button>
        </CardContent>
      </Card>

      <SearchModal
        open={productModalOpen}
        onOpenChange={setProductModalOpen}
        title="Producto"
        items={productItems}
        onSelect={(item) => {
          setIdArticulo(item.id);
          setSelectedProductLabel(item.label);
        }}
      />
    </>
  );
}