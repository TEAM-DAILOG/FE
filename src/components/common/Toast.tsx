import { useEffect } from "react";
import { Text, View } from "react-native";

import CheckCircleIcon from "@/assets/icons/checkCircleIcon.svg";
import { useBottomTabBarHeight } from "@/src/hooks/useBottomTabBarHeight";
import { useToastStore } from "@/src/store/toast/toastStore";

const TOAST_DURATION_MS = 3000;

export function Toast() {
  const message = useToastStore((state) => state.message);
  const variant = useToastStore((state) => state.variant);
  const hideToast = useToastStore((state) => state.hideToast);
  const bottomTabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(hideToast, TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [message, hideToast]);

  if (!message) return null;

  return (
    <View className="absolute inset-0 items-center justify-end bg-gray-900/60">
      <View
        className="absolute inset-x-4 items-center"
        style={{ bottom: bottomTabBarHeight - 17 }}
      >
        <View className="flex-row items-center gap-1 rounded-[100px] border border-gray-100 bg-gray-0 px-3 py-2">
          {variant === "icon" ? (
            <CheckCircleIcon width={24} height={24} color="#020303" />
          ) : null}
          <Text className="text-gray-900 text-b-04-r">{message}</Text>
        </View>
      </View>
    </View>
  );
}
