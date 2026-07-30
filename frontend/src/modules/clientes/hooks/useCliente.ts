// src/modules/clientes/hooks/useCliente.ts

import { useQuery } from "@tanstack/react-query";

import {
  clientesKeys,
} from "../queries/clientes.keys";

import {
  clientesService,
} from "../services/clientes.service";


export function useCliente(id?: number) {

  return useQuery({

    queryKey: id
      ? clientesKeys.detail(id)
      : clientesKeys.detail(0),

    queryFn: () =>
      clientesService.getById(id!),


    enabled: !!id,

  });

}