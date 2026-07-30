import { useQuery } from "@tanstack/react-query";
import { empresasService } from "../services/empresas.service";
import { empresasKeys } from "../queries/empresas.keys";
import type { Empresa } from "@/types/empresa";

export function useEmpresa(id?: number) {
  return useQuery<Empresa>({
    queryKey: empresasKeys.detail(id ?? 0),
    queryFn: () => empresasService.getById(id!),
    enabled: !!id,
  });
}