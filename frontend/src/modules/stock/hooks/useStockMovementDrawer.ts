import { create } from "zustand";


interface StockMovementDrawerState {

  open: boolean;

  movementId?: number;


  openView(
    id: number
  ): void;


  close(): void;

}


export const useStockMovementDrawer =
  create<StockMovementDrawerState>((set) => ({

    open: false,

    movementId: undefined,


    openView: (id) =>
      set({
        open: true,
        movementId: id,
      }),


    close: () =>
      set({
        open: false,
        movementId: undefined,
      }),

  }));