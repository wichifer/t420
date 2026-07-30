export interface Cliente {
  id_cliente: number;
  nombre?: string | null;
  apellido?: string | null;
  razon_social?: string | null;
  documento?: string | null;
  cuit?: string | null;
  telefono?: string | null;
  email?: string | null;
  direccion?: string | null;
  es_consumidor_final: boolean;
  estado: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClienteMovimiento {
  id_movimiento_cliente: number;
  id_cliente: number;
  tipo_movimiento:
    | "VENTA"
    | "PAGO"
    | "NOTA_CREDITO"
    | "AJUSTE"
    | "SALDO_INICIAL";
  monto: string | number;
  observacion?: string | null;
  created_at: string;
}

export interface ClienteResumenCuenta {
  debe: number;
  pagado: number;
  saldo: number;
}

export interface ClienteEstadoCuenta {
  cliente: Cliente;
  resumen: ClienteResumenCuenta;
  movimientos: ClienteMovimiento[];
}