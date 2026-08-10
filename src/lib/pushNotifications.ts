import { getMessaging, getToken } from "@react-native-firebase/messaging";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert, Linking, Platform } from "react-native";

import type { RegisterPushTokenParams } from "@/src/types/alarm/alarm.types";

// 포그라운드 상태에서 알림 설정
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// 알림 권한이 꺼져 있을 때 설정 화면으로 안내
function showPermissionSettingsAlert() {
  Alert.alert(
    "알림 권한이 꺼져 있어요",
    "설정에서 알림 권한을 켜야 알림을 받을 수 있어요.",
    [
      { text: "취소", style: "cancel" },
      { text: "설정으로 이동", onPress: () => Linking.openSettings() },
    ]
  );
}

// 알림 권한 요청 및 확인
async function ensureNotificationPermission(
  showSettingsAlertIfDenied: boolean
) {
  const currentPermission = await Notifications.getPermissionsAsync();

  if (currentPermission.status === "granted") {
    return true;
  }

  // 한 번 거부되면 canAskAgain이 false가 되어 재요청해도 시스템 다이얼로그가 뜨지 않음
  if (!currentPermission.canAskAgain) {
    if (showSettingsAlertIfDenied) {
      showPermissionSettingsAlert();
    }
    return false;
  }

  const requestedPermission = await Notifications.requestPermissionsAsync();
  return requestedPermission.status === "granted";
}

// 권한에 따라 FCM 토큰을 발급
export async function registerForPushNotificationsAsync(options?: {
  showSettingsAlertIfDenied?: boolean;
}): Promise<RegisterPushTokenParams | null> {
  if (!Device.isDevice) {
    return null;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#4D826C",
    });
  }

  const isPermissionGranted = await ensureNotificationPermission(
    options?.showSettingsAlertIfDenied ?? false
  );
  if (!isPermissionGranted) {
    return null;
  }

  // iOS/Android 모두 백엔드가 요구하는 FCM 토큰 형식으로 통일해서 받기 위해
  const fcmToken = await getToken(getMessaging());

  return {
    fcmToken,
    deviceType: Platform.OS === "ios" ? "IOS" : "ANDROID",
  };
}
