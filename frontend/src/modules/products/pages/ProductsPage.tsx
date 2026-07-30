import { useMemo, useState } from "react";

import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";
import EmptyState from "@/components/common/EmptyState";
import ConfirmDialog from "@/components/common/ConfirmDialog";

import { Button } from "@/components/ui/button";

import { ProductsTable } from "../components/ProductsTable";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { ProductDrawer } from "../components/ProductDrawer";
import { ProductForm } from "../components/ProductForm";
import { useProductDrawer } from "../state/useProductDrawer";

export default function ProductsPage() {
  const { data: products = [], isLoading, error } = useProducts();

  const [search, setSearch] = useState("");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const deleteProduct = useDeleteProduct();
  const { openCreate, openEdit } = useProductDrawer();
  console.log("OPEN EDIT FUNCTION", openEdit);
  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return products.filter(
      (p) =>
        p.descripcion.toLowerCase().includes(q) ||
        p.codigo.toLowerCase().includes(q)
    );
  }, [products, search]);

  if (error) {
    return (
      <EmptyState
        title="Error al cargar productos"
        description="Ocurrió un error al obtener los datos."
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Productos"
        actions={
            <Button onClick={openCreate}>
                Nuevo Producto
            </Button>
        }
      />
      <ProductForm />
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="border-b p-4">
          <SearchInput
            placeholder="Buscar producto por código o descripción..."
            value={search}
            onChange={setSearch}
          />
        </div>

<ProductsTable
  products={filtered}
  onEdit={(product) => {
    console.log("PAGE OPEN EDIT", product);
    openEdit(product);
  }}
  onDelete={(product) => setProductToDelete(product)}
/>

        {!isLoading && filtered.length === 0 && (
            <div className="p-6">
                <EmptyState
                title="No hay productos"
                description="No se encontraron resultados."
                />
            </div>
            )} 
      </div>

      <ConfirmDialog
        open={!!productToDelete}
        title="Eliminar producto"
        description={`¿Eliminar ${productToDelete?.descripcion}?`}
        onCancel={() => setProductToDelete(null)}
        onConfirm={async () => {
        if (!productToDelete) return;

        await deleteProduct.mutateAsync(
            Number(productToDelete.id_articulo)
        );

        setProductToDelete(null);
        }}
      />
   
      <ProductDrawer />
    </div>

    
  );
}