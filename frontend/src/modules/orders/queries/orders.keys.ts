export const ordersKeys = {
  all: ["orders"] as const,

  lists: () =>
    [...ordersKeys.all, "list"] as const,

  detail: (id: number) =>
    [...ordersKeys.all, "detail", id] as const,
};