export interface OrderItem {
  id_detalle_orden: number;

  id_articulo: number;

  descripcion_articulo: string;

  cantidad: number;

  precio_unitario: number;

  subtotal: number;
}

export interface Order {
  id_orden_compra: number;

  id_cliente: number;

  id_usuario: number;

  numero_orden: string;

  fecha: string;

  estado: string;

  total: number;

  observaciones?: string | null;

cliente?: {
    id_cliente: number;
    nombre?: string | null;
    razon_social?: string | null;
  } | null;

  items?: OrderItem[];
}
export interface CreateOrderDto {
  id_cliente: string;
  observaciones?: string;
  
  items: {
    cliente?: string;
    id_articulo: string;
    descripcion_articulo: string;
    cantidad: number;
    precio_unitario: number;
  }[];
    // Nuevo
  aprobar_automaticamente?: boolean;
}
export interface CreateOrderItemDto {
   id_articulo: number;
   descripcion_articulo: string;
   cantidad: number;
   precio_unitario: number;
}

export type OrderStatus =
  | "PENDIENTE"
  | "APROBADA"
  | "ANULADA";

export interface UpdateOrderDto {
  id_cliente?: string;
  observaciones?: string;
  items?: CreateOrderDto["items"];
  estado?: OrderStatus;
}