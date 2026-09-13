import { useAuthStore } from "@/src/store/auth/authStore";
import { useBaseModal } from "@/src/store/modals/baseModal";

export function useRequireAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const openModal = useBaseModal((state) => state.openModal);

  const requireAuth = (onAuthenticated: () => void) => {
    if (!isAuthenticated) {
      openModal("loginRequiredModal");
      return;
    }

    onAuthenticated();
  };

  return { isAuthenticated, requireAuth };
}
