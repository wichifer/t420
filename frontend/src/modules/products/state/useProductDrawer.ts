import { create } from "zustand";

import type { Product } from "../types/product";

type Mode = "create" | "edit";

interface ProductDrawerState {
  open: boolean;
  mode: Mode;
  product: Product | null;

  openCreate: () => void;
  openEdit: (product: Product) => void;
  close: () => void;
}

export const useProductDrawer = create<ProductDrawerState>((set) => ({
  open: false,
  mode: "create",
  product: null,

  openCreate: () =>
    set({
      open: true,
      mode: "create",
      product: null,
    }),

openEdit: (product) => {
  console.log("ZUSTAND OPEN EDIT", product);

  set({
    open: true,
    mode: "edit",
    product,
  });
},
  close: () =>
    set({
      open: false,
      product: null,
    }),
}));