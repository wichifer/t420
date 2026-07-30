import { api } from "@/api/api";
import type { Dashboard } from "../types/dashboard";

export const dashboardService = {
  async getDashboard(): Promise<Dashboard> {
    const { data } = await api.get<Dashboard>("/admin-saas/dashboard");
    return data;
  },
};