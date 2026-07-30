// src/modules/reports/types/reports.types.ts

export interface SalesReport {
  cantidad_ordenes: number;
  ventas: number;
  clientes: number;
}

export interface SalesByClient {
  id_cliente: number;
  cliente: string;
  ventas: number;
}

export interface TopProduct {
  descripcion_articulo: string;
  cantidad_vendida: number;
}

export interface Debtor {
  id_cliente: number;
  cliente: string;
  saldo: number;
}

export interface ReportsData {
  sales: SalesReport;
  salesByClient: SalesByClient[];
  topProducts: TopProduct[];
  debtors: Debtor[];
}