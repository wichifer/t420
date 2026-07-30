// src/modules/stock/types/stock.types.ts

export interface StockMovement {
  id_movimiento_stock: number;
  id_articulo: number;

  fecha: string;

  tipo_movimiento: "ENTRADA" | "SALIDA";

  cantidad: number;

  referencia: string;

articulos?: {

  codigo: string;

  descripcion: string;

  stock_actual?: number | string;

  stock_minimo?: number | string;

};
}

export interface LowStockProduct {
  id_articulo: number;

  codigo: string;

  descripcion: string;

  stock_actual: number;

  stock_minimo: number;
}

export interface ProductOption {
  id_articulo: number;

  codigo: string;

  descripcion: string;
}

export interface CreateStockMovementDto {
  id_articulo: number | string;

  tipo_movimiento: "ENTRADA" | "SALIDA";

  cantidad: number;

  referencia: string;
}