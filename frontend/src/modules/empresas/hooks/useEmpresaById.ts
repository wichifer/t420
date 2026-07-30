import { useQuery } from "@tanstack/react-query";

import { empresasService } from "../services/empresas.service";

export function useEmpresaById(id?: number) {
  return useQuery({
    queryKey: ["empresa", id],
    queryFn: () => empresasService.getById(id!),
    enabled: !!id,
  });
}