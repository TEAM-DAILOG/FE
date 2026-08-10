import { alarmService } from "@/src/api/alarmService";
import { authService } from "@/src/api/authService";
import { queryClient } from "@/src/lib/queryClient";
import { tokenStorage } from "@/src/lib/tokenStorage";
import { useAuthStore } from "@/src/store/auth/authStore";

export async function clearLocalSession() {
  await Promise.allSettled([
    tokenStorage.clearTokens(),
    tokenStorage.clearPushTokenId(),
    Promise.resolve().then(() => queryClient.clear()),
    Promise.resolve().then(() => useAuthStore.getState().clearAuthenticated()),
  ]);
}

export async function logout() {
  try {
    const [refreshToken, pushTokenId] = await Promise.all([
      tokenStorage.getRefreshToken(),
      tokenStorage.getPushTokenId(),
    ]);

    await Promise.allSettled([
      pushTokenId ? alarmService.deletePushToken(pushTokenId) : null,
      refreshToken ? authService.logout({ refreshToken }) : null,
    ]);
  } finally {
    await clearLocalSession();
  }
}
