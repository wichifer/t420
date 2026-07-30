import { useProducts } from "./useProducts";

export function useProductTest() {

  const query = useProducts();

  console.log(
    "PRODUCTS QUERY",
    query.data,
  );

  return query;

}