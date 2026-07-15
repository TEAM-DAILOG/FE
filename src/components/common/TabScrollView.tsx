import { ScrollView, type ScrollViewProps } from "react-native";

import { useBottomTabBarHeight } from "@/src/hooks/useBottomTabBarHeight";

export function TabScrollView({
  contentContainerStyle,
  children,
  ...rest
}: ScrollViewProps) {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        { paddingBottom: tabBarHeight },
        contentContainerStyle,
      ]}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}
