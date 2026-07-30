import { useQuery } from "@tanstack/react-query";

import {
  productsService,
} from "../services/products.service";

import {
  productsKeys,
} from "../queries/products.keys";


export function useProducts() {

  return useQuery({

    queryKey:
      productsKeys.lists(),

    queryFn:
      productsService.getAll,

  });

}