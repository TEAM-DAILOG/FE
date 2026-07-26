import { authService } from "@/src/api/authService";
import { queryClient } from "@/src/lib/queryClient";
import { tokenStorage } from "@/src/lib/tokenStorage";
import { useAuthStore } from "@/src/store/auth/authStore";

export async function clearLocalSession() {
  await Promise.allSettled([
    tokenStorage.clearTokens(),
    Promise.resolve().then(() => queryClient.clear()),
    Promise.resolve().then(() => useAuthStore.getState().clearAuthenticated()),
  ]);
}

export async function logout() {
  try {
    const refreshToken = await tokenStorage.getRefreshToken();

    if (refreshToken) {
      await authService.logout({ refreshToken });
    }
  } finally {
    await clearLocalSession();
  }
}
