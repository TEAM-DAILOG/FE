import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { cn } from "@/src/lib/cn";

export type DiaryTabType = "question" | "free";

export type DiaryTabBarProps = {
  selectedTab: DiaryTabType;
  onSelectTab: (tab: DiaryTabType) => void;
  className?: string;
};

const DIARY_TABS: { key: DiaryTabType; label: string }[] = [
  { key: "question", label: "질문일기" },
  { key: "free", label: "자유일기" },
];

export function DiaryTabBar({
  selectedTab,
  onSelectTab,
  className,
}: DiaryTabBarProps) {
  return (
    <View
      className={cn(
        "w-full flex-row items-center rounded-full bg-bg",
        className
      )}
    >
      {DIARY_TABS.map(({ key, label }) => (
        <DiaryTab
          key={key}
          label={label}
          isSelected={selectedTab === key}
          onPress={() => onSelectTab(key)}
        />
      ))}
    </View>
  );
}

function DiaryTab({
  label,
  isSelected,
  onPress,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  const backgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(isSelected ? "#4D826CFF" : "#4D826C00", {
      duration: 150,
    }),
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: withTiming(isSelected ? "#F5F9F6" : "#A2C8B8", { duration: 150 }),
  }));

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center justify-center px-2.5 py-1.5"
    >
      <Animated.View
        className="w-full items-center justify-center rounded-full py-2"
        style={backgroundStyle}
      >
        <Animated.Text
          className={isSelected ? "text-b-03-sb" : "text-b-03-m"}
          style={textStyle}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}
