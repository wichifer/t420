// src/modules/empresas/services/empresas.service.ts
import { api } from "@/api/api";
import type { Empresa } from "@/types/empresa";
import type { EmpresaFormValues } from "../schemas/empresa.schema";

export const empresasService = {
  getAll: async (): Promise<Empresa[]> => {
    const res = await api.get("/admin-saas/empresas");
    return res.data;
  },

  getById: async (id: number): Promise<Empresa> => {
    const res = await api.get(`/admin-saas/empresas/${id}`);
    return res.data;
  },

  update: async (params: {
    id: number;
    data: Partial<Empresa>;
  }): Promise<Empresa> => {
    const res = await api.put(
      `/admin-saas/empresas/${params.id}`,
      params.data
    );
    return res.data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/admin-saas/empresas/${id}`);
  },
create: async (data: EmpresaFormValues): Promise<Empresa> => {
  try {
    console.log("POST /admin-saas/empresas", data);

    const res = await api.post("/admin-saas/empresas", data);

    return res.data;
  } catch (err: any) {
    console.error("STATUS:", err.response?.status);
    console.error("DATA:", err.response?.data);
    throw err;
  }
},
async updateStatus(
  id: number,
  estado: boolean,
) {
  const { data } = await api.patch(
    `/admin-saas/empresas/${id}/estado`,
    {
      estado,
    },
  );

  return data;
}
};