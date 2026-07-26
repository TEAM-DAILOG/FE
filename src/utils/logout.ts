import { authService } from "@/src/api/authService";
import { queryClient } from "@/src/lib/queryClient";
import { tokenStorage } from "@/src/lib/tokenStorage";
import { useAuthStore } from "@/src/store/auth/authStore";

export async function clearLocalSession() {
  await tokenStorage.clearTokens();
  queryClient.clear();
  useAuthStore.getState().clearAuthenticated();
}

export async function logout() {
  const refreshToken = await tokenStorage.getRefreshToken();

  try {
    if (refreshToken) {
      await authService.logout({ refreshToken });
    }
  } finally {
    await clearLocalSession();
  }
}
