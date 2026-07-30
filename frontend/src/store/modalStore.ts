import { create } from 'zustand';

interface ModalState {
  open: boolean;
  title: string;
  description?: string;
  content: React.ReactNode;

  onOpen: (
    title: string,
    content: React.ReactNode,
    description?: string
  ) => void;

  onClose: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  open: false,
  title: '',
  description: '',
  content: null,

  onOpen: (title, content, description = '') =>
    set({
      open: true,
      title,
      content,
      description,
    }),

  onClose: () =>
    set({
      open: false,
      title: '',
      description: '',
      content: null,
    }),
}));