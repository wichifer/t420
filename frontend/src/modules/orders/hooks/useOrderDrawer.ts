import { create } from "zustand";

type DrawerMode =
  | "create"
  | "edit"
  | "view";

interface OrderDrawerState {
  open: boolean;

  mode: DrawerMode;

  orderId?: number;

  openCreate(): void;

  openEdit(id: number): void;

  openView(id: number): void;

  close(): void;
}

export const useOrderDrawer =
  create<OrderDrawerState>((set) => ({
    open: false,

    mode: "create",

    orderId: undefined,

    openCreate: () =>
      set({
        open: true,
        mode: "create",
        orderId: undefined,
      }),

    openEdit: (id) =>
      set({
        open: true,
        mode: "edit",
        orderId: id,
      }),

    openView: (id) =>
      set({
        open: true,
        mode: "view",
        orderId: id,
      }),

    close: () =>
      set({
        open: false,
        orderId: undefined,
      }),
  }));