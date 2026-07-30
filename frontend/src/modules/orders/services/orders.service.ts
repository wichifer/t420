import { api } from "@/api/api";

import type {
  Order,
  CreateOrderDto,
  UpdateOrderDto,
} from "../types/order";

export const ordersService = {
  async getAll() {
    const { data } = await api.get<Order[]>("/orders");
    return data;
  },

  async getById(id: number) {
    const { data } = await api.get<Order>(`/orders/${id}`);
    return data;
  },

  async create(payload: CreateOrderDto) {
    const { data } = await api.post<Order>(
      "/orders",
      payload,
    );
    return data;
  },

  async update(
    id: number,
    payload: UpdateOrderDto,
  ) {
    const { data } = await api.patch<Order>(
      `/orders/${id}`,
      payload,
    );
    return data;
  },

  async remove(id: number) {
    await api.delete(`/orders/${id}`);
  },

  async approve(id: number) {
    const { data } = await api.post<Order>(
      `/orders/${id}/approve`,
    );
    return data;
  },
};