export interface Product {

  id_articulo: number | string;

  id_empresa: number | string;

  codigo: string;

  descripcion: string;

  precio_final: number | string;

  stock_actual: number | string;

  stock_minimo: number | string;

  unidad_medida: string;

  estado: boolean;

}