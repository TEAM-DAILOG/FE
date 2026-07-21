import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  clearAuthenticated: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  clearAuthenticated: () => set({ isAuthenticated: false }),
}));
