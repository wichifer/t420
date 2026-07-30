// src/modules/clientes/queries/clientes.keys.ts

export const clientesKeys = {

  all: ["clientes"] as const,

  lists: () =>
    [...clientesKeys.all, "list"] as const,

  detail: (id: number) =>
    [...clientesKeys.all, "detail", id] as const,

  saldo: (id: number) =>
    [...clientesKeys.all, "saldo", id] as const,

  movimientos: (id: number) =>
    [...clientesKeys.all, "movimientos", id] as const,

  estadoCuenta: (id: number) =>
    [...clientesKeys.all, "estadoCuenta", id] as const,

};