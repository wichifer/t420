export const empresasKeys = {
  all: ["empresas"] as const,

  lists: () => [...empresasKeys.all, "list"] as const,

  list: (filters?: unknown) =>
    [...empresasKeys.lists(), filters] as const,

  details: () => [...empresasKeys.all, "detail"] as const,

  detail: (id: number) =>
    [...empresasKeys.details(), id] as const,
};