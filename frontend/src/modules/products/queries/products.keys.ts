export const productsKeys = {

  all: [
    "products",
  ] as const,


  lists: () =>
    [
      ...productsKeys.all,
      "list",
    ] as const,


  detail: (
    id:number,
  ) =>
    [
      ...productsKeys.all,
      "detail",
      id,
    ] as const,

};