// src/modules/reports/services/reports.service.ts

import { api } from "@/api/api";

export const reportsService = {

  async getSales() {
    const { data } = await api.get("/reports/sales");
    return data;
  },

  async getSalesByClient() {
    const { data } = await api.get("/reports/sales-by-client");
    return data;
  },

  async getTopProducts() {
    const { data } = await api.get("/reports/top-products");
    return data;
  },

  async getDebtors() {
    const { data } = await api.get("/reports/debtors");
    return data;
  },

async getAll() {

  const [
    sales,
    salesByClient,
    topProducts,
    debtors,
  ] = await Promise.all([

    reportsService.getSales(),
    reportsService.getSalesByClient(),
    reportsService.getTopProducts(),
    reportsService.getDebtors(),

  ]);

  return {
    sales,
    salesByClient,
    topProducts,
    debtors,
  };

}
};