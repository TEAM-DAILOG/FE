import { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { cn } from "@/src/lib/cn";
import { CategoryColor } from "@/src/types/categories/category.types";


export type CategoryChipProps = {
  color?: CategoryColor;
  label: string;
  selected?: boolean;
  onPress?: () => void;
  className?: string;
};

const CATEGORY_CHIP_COLORS: Record<CategoryColor, { border: string; hex: string }> = {
  blue: { border: "border-category-01-1", hex: "#6A92AF" },
  brown: { border: "border-category-02-1", hex: "#C49C64" },
  green: { border: "border-category-03-1", hex: "#79A659" },
  purple: { border: "border-category-04-1", hex: "#A381BB" },
  pink: { border: "border-category-05-1", hex: "#BD7593" },
};

const WHITE = "#FFFFFF";
const GRAY_0 = "#FCFDFD";
const TRANSITION_DURATION = 300;

export function CategoryChip({
  color = "blue",
  label,
  selected = false,
  onPress,
  className,
}: CategoryChipProps) {
  const styles = CATEGORY_CHIP_COLORS[color];
  const progress = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(selected ? 1 : 0, {
      duration: TRANSITION_DURATION,
      easing: Easing.out(Easing.ease),
    });
  }, [progress, selected]);

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [WHITE, styles.hex]
    ),
  }));

  const dotStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [styles.hex, GRAY_0]
    ),
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], [styles.hex, GRAY_0]),
  }));

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        className={cn(
          "flex-row items-center gap-1 rounded-[100px] border px-2 py-1",
          styles.border,
          className
        )}
        style={containerStyle}
      >
        <Animated.View className="size-3 rounded-full" style={dotStyle} />
        <Animated.Text
          className={cn("text-b-04-r", selected && "text-b-04-sb")}
          style={textStyle}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}
