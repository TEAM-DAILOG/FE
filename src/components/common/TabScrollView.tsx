import { ScrollView, type ScrollViewProps } from "react-native";

import { useBottomTabBarHeight } from "@/src/hooks/useBottomTabBarHeight";
import { cn } from "@/src/lib/cn";

const CONTENT_BOTTOM_PADDING = 40;

type TabScrollViewProps = ScrollViewProps & {
  contentContainerClassName?: string;
};

export function TabScrollView({
  contentContainerClassName,
  contentContainerStyle,
  children,
  ...rest
}: TabScrollViewProps) {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName={cn("pt-5", contentContainerClassName)}
      contentContainerStyle={[
        { paddingBottom: tabBarHeight + CONTENT_BOTTOM_PADDING },
        contentContainerStyle,
      ]}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}
