import { useEffect } from "react";

import { usePostPushToken } from "@/src/hooks/mutations/alarm/usePostPushToken";
import { registerForPushNotificationsAsync } from "@/src/lib/pushNotifications";
import { useAuthStore } from "@/src/store/auth/authStore";

export function usePushTokenRegistration() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const postPushTokenMutation = usePostPushToken();

  useEffect(() => {
    // 로그인이 안되어 있으면 종료
    if (!isAuthenticated) {
      return;
    }

    registerForPushNotificationsAsync()
      .then((pushToken) => {
        if (pushToken) {
          postPushTokenMutation.mutate(pushToken);
        }
      })
      .catch((error) => {
        console.error("푸시 토큰 등록 실패", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
}
