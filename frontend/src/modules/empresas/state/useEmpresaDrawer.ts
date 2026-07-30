// src/modules/empresas/state/useEmpresaDrawer.ts
import { create } from "zustand";
import type { Empresa } from "@/types/empresa";

type Mode = "create" | "edit" | "view" | "delete";

interface EmpresaDrawerState {
  open: boolean;
  mode: Mode;
  selected: Empresa | null;

  openCreate: () => void;
  openEdit: (empresa: Empresa) => void;
  openView: (empresa: Empresa) => void;
  openDelete: (empresa: Empresa) => void;
  close: () => void;
}

export const useEmpresaDrawer = create<EmpresaDrawerState>((set) => ({
  open: false,
  mode: "create",
  selected: null,

  openCreate: () =>
    set({
      open: true,
      mode: "create",
      selected: null,
    }),

  openEdit: (empresa) =>
    set({
      open: true,
      mode: "edit",
      selected: empresa,
    }),

  openView: (empresa) =>
    set({
      open: true,
      mode: "view",
      selected: empresa,
    }),

  close: () =>
    set({
      open: false,
      selected: null,
    }),
    openDelete: (empresa) =>
  set({
    open: true,
    mode: "delete",
    selected: empresa,
  }),
}));