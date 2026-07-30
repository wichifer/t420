// src/modules/stock/services/stock.service.ts

import { api } from "@/api/api";

import type {
  StockMovement,
  LowStockProduct,
  ProductOption,
  CreateStockMovementDto,
} from "../types/stock.types";


export const stockService = {

  async getMovements(): Promise<StockMovement[]> {

    const { data } =
      await api.get("/stock-movements");

    return data;
  },


  async getMovement(
    id: number,
  ): Promise<StockMovement> {

    const { data } =
      await api.get(
        `/stock-movements/${id}`,
      );

    return data;
  },


  async getProducts(): Promise<ProductOption[]> {

    const { data } =
      await api.get<ProductOption[]>(
        "/products",
      );

    return data;
  },


  async getLowStock(): Promise<LowStockProduct[]> {

    const { data } =
      await api.get(
        "/products/low-stock",
      );

    return data;
  },


  async createMovement(
    dto: CreateStockMovementDto,
  ) {

    const { data } =
      await api.post(
        "/stock-movements/manual",
        dto,
      );

    return data;
  },

};