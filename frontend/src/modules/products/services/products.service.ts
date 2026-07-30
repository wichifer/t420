import { api } from "@/api/api";

import type { Product } from "../types/product";

export const productsService = {

  async getAll() {
    const { data } = await api.get<Product[]>(
      "/products",
    );

    return data;
  },

  async getById(id: number) {
    const { data } = await api.get<Product>(
      `/products/${id}`,
    );

    return data;
  },

  async create(payload: Partial<Product>) {
    const { data } = await api.post<Product>(
      "/products",
      payload,
    );

    return data;
  },

  async update(
    id: number,
    payload: Partial<Product>,
  ) {
    const { data } = await api.patch<Product>(
      `/products/${id}`,
      payload,
    );

    return data;
  },

  async remove(id: number) {
    const { data } = await api.delete(
      `/products/${id}`,
    );

    return data;
  },

};