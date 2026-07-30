// src/modules/stock/queries/stock.keys.ts

export const stockKeys = {

  all: ["stock"] as const,


  movements: () =>
    [...stockKeys.all, "movements"] as const,


  movement: (id: number) =>
    [...stockKeys.all, "movement", id] as const,


  lowStock: () =>
    [...stockKeys.all, "low-stock"] as const,


  products: () =>
    [...stockKeys.all, "products"] as const,

};