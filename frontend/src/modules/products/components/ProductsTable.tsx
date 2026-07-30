import type { Column } from "@/components/common/DataTable";

import DataTable from "@/components/common/DataTable";
import { TableActions } from "@/components/common/TableActions";

import type { Product } from "../types/product";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductsTable({
  products,
  onEdit,
  onDelete,
}: Props) {

  const columns: Column<Product>[] = [
    {
      key: "id_articulo",
      header: "ID",
    },
    {
      key: "codigo",
      header: "Código",
    },
    {
      key: "descripcion",
      header: "Descripción",
    },
    {
      key: "precio_final",
      header: "Precio",
      render: (product) =>
        `$${Number(product.precio_final).toFixed(2)}`,
    },
    {
      key: "stock_actual",
      header: "Stock",
    },
    {
      key: "stock_minimo",
      header: "Stock Min.",
    },
    {
      key: "estado",
      header: "Estado",
      render: (product) =>
        product.estado ? "Activo" : "Inactivo",
    },
    {
      key: "acciones",
      header: "Acciones",
      render: (product) => (
        <TableActions
          onEdit={() => {
            console.log("EDIT PRODUCT CLICK", product);
            onEdit(product);
          }}
          onDelete={() => onDelete(product)}
        />
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={products}
    />
  );
}