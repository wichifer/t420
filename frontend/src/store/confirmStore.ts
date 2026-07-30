import { create } from "zustand";

type ConfirmVariant = "default" | "destructive";

interface ConfirmState {
  open: boolean;

  title: string;
  description: string;

  confirmText: string;
  cancelText: string;

  variant: ConfirmVariant;

  loading: boolean;

  onConfirm?: () => Promise<void> | void;

  openConfirm: (config: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: ConfirmVariant;
    onConfirm: () => Promise<void> | void;
  }) => void;

  setLoading: (loading: boolean) => void;

  closeConfirm: () => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  open: false,

  title: "",
  description: "",

  confirmText: "Confirmar",
  cancelText: "Cancelar",

  variant: "default",

  loading: false,

  onConfirm: undefined,

  openConfirm: ({
    title,
    description,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    variant = "default",
    onConfirm,
  }) =>
    set({
      open: true,
      title,
      description,
      confirmText,
      cancelText,
      variant,
      onConfirm,
      loading: false,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),

  closeConfirm: () =>
    set({
      open: false,
      title: "",
      description: "",
      confirmText: "Confirmar",
      cancelText: "Cancelar",
      variant: "default",
      loading: false,
      onConfirm: undefined,
    }),
}));