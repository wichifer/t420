// src/modules/clientes/services/clientes.service.ts
import { api } from "@/api/api";

import type {
  Cliente,
  ClienteEstadoCuenta,
} from "../types/cliente";

import type {
  ClienteFormValues,
} from "../schemas";

export const clientesService = {
  async getAll(): Promise<Cliente[]> {
    const { data } = await api.get("/clients");
    return data;
  },

  async getById(id: number): Promise<Cliente> {
    const { data } = await api.get(`/clients/${id}`);
    return data;
  },

  async create(
    payload: ClienteFormValues,
  ): Promise<Cliente> {
    const { data } = await api.post(
      "/clients",
      payload,
    );

    return data;
  },

  async update(
    id: number,
    payload: ClienteFormValues,
  ): Promise<Cliente> {
    const { data } = await api.patch(
      `/clients/${id}`,
      payload,
    );

    return data;
  },

  async remove(
    id: number,
  ): Promise<void> {
    await api.delete(`/clients/${id}`);
  },

  async getSaldo(id: number) {
    const { data } = await api.get(
      `/clients/${id}/saldo`,
    );

    return data;
  },

  async getMovimientos(id: number) {
    const { data } = await api.get(
      `/clients/${id}/movimientos`,
    );

    return data;
  },

  async getEstadoCuenta(
    id: number,
  ): Promise<ClienteEstadoCuenta> {
    const { data } = await api.get<ClienteEstadoCuenta>(
      `/clients/${id}/estado-cuenta`,
    );

    return data;
  },
};