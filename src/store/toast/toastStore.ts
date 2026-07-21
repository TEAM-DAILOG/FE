import { create } from "zustand";

export type ToastVariant = "text" | "icon";

type ToastState = {
  message: string | null;
  variant: ToastVariant;
  showToast: (message: string, variant?: ToastVariant) => void;
  hideToast: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  variant: "text",
  showToast: (message, variant = "text") => set({ message, variant }),
  hideToast: () => set({ message: null }),
}));
