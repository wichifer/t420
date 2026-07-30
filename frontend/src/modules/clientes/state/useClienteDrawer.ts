// src/modules/clientes/state/useClienteDrawer.ts
import { create } from "zustand";

import type { Cliente } from "@/modules/clientes/types/cliente";


export type DrawerMode =
  | "create"
  | "edit"
  | "view"
  | "delete";

interface ClienteDrawerState {
  open: boolean;
  mode: DrawerMode;
  selected: Cliente | null;

  openCreate: () => void;
  openEdit: (cliente: Cliente) => void;
  openView: (cliente: Cliente) => void;
  openDelete: (cliente: Cliente) => void;

  close: () => void;
}

export const useClienteDrawer =
  create<ClienteDrawerState>((set) => ({

    open: false,
    mode: "create",
    selected: null,

    openCreate: () =>
      set({
        open: true,
        mode: "create",
        selected: null,
      }),

    openEdit: (cliente) =>
      set({
        open: true,
        mode: "edit",
        selected: cliente,
      }),

    openView: (cliente) =>
      set({
        open: true,
        mode: "view",
        selected: cliente,
      }),

    openDelete: (cliente) =>
      set({
        open: true,
        mode: "delete",
        selected: cliente,
      }),

        close: () =>
        set({
            open: false,
            mode: "create",
            selected: null,
        }),

  }));