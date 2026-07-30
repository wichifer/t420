// C:\dev\ordenes-saas-frontend\src\modules\products\components\ProductForm.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCreateProduct } from "../hooks/useCreateProduct";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import type { Product } from "../types/product";

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
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const { register, handleSubmit, reset } = useForm<FormValues>({
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
    }
  }, [product, reset]);

  const onSubmit = async (data: FormValues) => {
    if (product) {
      await updateProduct.mutateAsync({
        id: Number(product.id_articulo),
        payload: data,
      });
    } else {
      await createProduct.mutateAsync(data);
    }

    onSuccess?.();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div>
        <Label htmlFor="codigo">Código</Label>
        <Input
          id="codigo"
          {...register("codigo")}
          required
        />
      </div>

      <div>
        <Label htmlFor="descripcion">Descripción</Label>
        <Input
          id="descripcion"
          {...register("descripcion")}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="precio_final">Precio</Label>
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
          <Label htmlFor="stock_actual">Stock actual</Label>
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
          <Label htmlFor="stock_minimo">Stock mínimo</Label>
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

      <div className="flex justify-end">
        <Button
          type="submit"
          onClick={() => console.log("CLICK")}
          disabled={
            createProduct.isPending || updateProduct.isPending
          }
        >
          {product ? "Actualizar" : "Crear"} producto
        </Button>
      </div>
    </form>
  );
}