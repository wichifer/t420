import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCreateProduct } from "../hooks/useCreateProduct";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import type { Product } from "../types/product";
import { productsService } from "../services/products.service";
import { BarcodeScanner } from "./BarcodeScanner";

interface Props {
  product?: Product | null;
  onSuccess?: () => void;
}

type FormValues = {
  codigo: string;
  descripcion: string;
  precio_final: number;
  stock_actual: number;
  stock_minimo: number;
};

export function ProductForm({ product, onSuccess }: Props) {
  console.log("🔥 PRODUCT FORM CORRECTO 🔥");

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const [scannerOpen, setScannerOpen] = useState(false);
  const [barcodeLoading, setBarcodeLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      codigo: "",
      descripcion: "",
      precio_final: 0,
      stock_actual: 0,
      stock_minimo: 0,
    },
  });

  useEffect(() => {
    if (product) {
      console.log("FORM PRODUCT:", product);

      reset({
        codigo: product.codigo,
        descripcion: product.descripcion,
        precio_final: Number(product.precio_final),
        stock_actual: Number(product.stock_actual),
        stock_minimo: Number(product.stock_minimo),
      });
    } else {
      reset({
        codigo: "",
        descripcion: "",
        precio_final: 0,
        stock_actual: 0,
        stock_minimo: 0,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      if (product) {
        await updateProduct.mutateAsync({
          id: Number(product.id_articulo),
          payload: data,
        });
      } else {
        await createProduct.mutateAsync(data);
      }

      setScannerOpen(false);
      onSuccess?.();
      reset();
    } catch (error) {
      console.error("ERROR GUARDANDO PRODUCTO:", error);
    }
  };

  const handleBarcodeDetected = useCallback(
    async (code: string) => {
      console.log(
        "📦 CODIGO RECIBIDO EN PRODUCT FORM:",
        code,
      );

      // Primero cargamos el código inmediatamente
      setValue("codigo", code, {
        shouldValidate: true,
        shouldDirty: true,
      });

      // Cerramos el scanner
      console.log("📷 CERRANDO SCANNER");

      setScannerOpen(false);

      // Consultamos Open Food Facts a través del backend
      try {
        setBarcodeLoading(true);

        console.log(
          "🔎 CONSULTANDO PRODUCTO POR EAN:",
          code,
        );

        const result =
          await productsService.getByBarcode(code);

        console.log(
          "🍎 RESPUESTA OPEN FOOD FACTS:",
          result,
        );

        if (
          result.found &&
          result.description
        ) {
          setValue(
            "descripcion",
            result.description,
            {
              shouldValidate: true,
              shouldDirty: true,
            },
          );

          console.log(
            "✅ DESCRIPCIÓN COMPLETADA:",
            result.description,
          );
        } else {
          console.log(
            "ℹ️ PRODUCTO NO ENCONTRADO EN OPEN FOOD FACTS",
          );
        }
      } catch (error) {
        console.error(
          "❌ ERROR CONSULTANDO PRODUCTO POR EAN:",
          error,
        );
      } finally {
        setBarcodeLoading(false);
      }
    },
    [setValue],
  );

  const handleScannerClose = () => {
    console.log("📷 CERRANDO SCANNER");

    setScannerOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* CÓDIGO */}
      <div>
        <Label htmlFor="codigo">
          Código
        </Label>

        <div className="mt-1 flex gap-2">
          <Input
            id="codigo"
            {...register("codigo")}
            required
          />

          {!product && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                console.log(
                  "📷 ABRIENDO SCANNER",
                );

                setScannerOpen(true);
              }}
              disabled={barcodeLoading}
            >
              📷 Escanear
            </Button>
          )}
        </div>
      </div>

      {/* SCANNER */}
      {scannerOpen && (
        <BarcodeScanner
          onDetected={handleBarcodeDetected}
          onClose={handleScannerClose}
        />
      )}

      {/* CONSULTANDO */}
      {barcodeLoading && (
        <p className="text-sm text-muted-foreground">
          Consultando información del producto...
        </p>
      )}

      {/* DESCRIPCIÓN */}
      <div>
        <Label htmlFor="descripcion">
          Descripción
        </Label>

        <Input
          id="descripcion"
          {...register("descripcion")}
          required
        />
      </div>

      {/* DATOS DEL PRODUCTO */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <Label htmlFor="precio_final">
            Precio
          </Label>

          <Input
            id="precio_final"
            type="number"
            step="0.01"
            {...register("precio_final", {
              valueAsNumber: true,
            })}
            required
          />
        </div>

        <div>
          <Label htmlFor="stock_actual">
            Stock actual
          </Label>

          <Input
            id="stock_actual"
            type="number"
            {...register("stock_actual", {
              valueAsNumber: true,
            })}
            required
          />
        </div>

        <div>
          <Label htmlFor="stock_minimo">
            Stock mínimo
          </Label>

          <Input
            id="stock_minimo"
            type="number"
            {...register("stock_minimo", {
              valueAsNumber: true,
            })}
            required
          />
        </div>
      </div>

      {/* BOTÓN GUARDAR */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={
            createProduct.isPending ||
            updateProduct.isPending ||
            barcodeLoading
          }
        >
          {product ? "Actualizar" : "Crear"} producto
        </Button>
      </div>
    </form>
  );
}