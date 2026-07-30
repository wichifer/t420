import { useQuery } from "@tanstack/react-query";
import { empresasService } from "../services/empresas.service";

export function useEmpresas() {
  return useQuery({
    queryKey: ["empresas"],
    queryFn: () => empresasService.getAll(),
  });
}